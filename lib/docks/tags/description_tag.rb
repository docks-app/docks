require "redcarpet"
require_relative "../markdown.rb"

module Docks
  module Tags
    class Description < Base
      def initialize
        @name = :description
        @markdown = Redcarpet::Markdown.new(Markdown::Renderer, fenced_code_blocks: true)
      end

      def process(symbol)
        symbol.update(@name) { |description| join_with_smart_line_breaks(description) }
      end

      def setup_post_processors
        after_each_pattern(:late) do |pattern|
          associate_external_description_files(pattern)
          recursive_markdown_description(pattern)
          pattern.symbols.each { |symbol| recursive_markdown_description(symbol) }
        end
      end

      protected

      def recursive_markdown_description(symbol)
        return unless symbol.respond_to?(:description)
        description = symbol.description

        if description.nil? || description.strip.empty?
          symbol.description = nil
        else
          symbol.description = @markdown.render(description)
        end

        return unless symbol.respond_to?(:each)
        symbol.each do |tag, value|
          if value.kind_of?(Array)
            value.each { |item| recursive_markdown_description(item) }
          else
            recursive_markdown_description(value)
          end
        end
      end

      def associate_external_description_files(pattern)
        description_file = pattern.files.find { |file| Languages.file_type(file) == Types::Languages::DESCRIPTION }
        return if description_file.nil?

        description = File.read(description_file)
        remaining_description = slice_up_description_for_symbols(description, pattern.symbols)
        pattern.description ||= remaining_description
      end

      def smart_description_association(symbol, description)
        case symbol
        when Containers::Component
          remaining_description = slice_up_description_for_symbols(description, symbol.fetch(:states, []) + symbol.fetch(:variants, []))
          symbol.description ||= remaining_description

        when Containers::Klass, Containers::Factory
          remaining_description = slice_up_description_for_symbols(description, symbol.fetch(:properties, []) + symbol.fetch(:methods, []))
          symbol.description ||= remaining_description

        when Containers::Function
          remaining_description = slice_up_description_for_symbols(description, symbol.fetch(:params, []))
          symbol.description ||= remaining_description

        else
          symbol.description = description
        end
      end

      def slice_up_description_for_symbols(description, symbols)
        earliest_other_description_start = description.length

        symbols.each do |symbol|
          next unless symbol.description.nil?

          regex = Regexp.new("^(#+)\\s*#{Regexp.escape(symbol.name)}\\s*$", Regexp::MULTILINE)
          if match = regex.match(description)
            next_matched_heading = Regexp.new("^#\{1,#{match[1].length}} [^#]", Regexp::MULTILINE).match(description, match.offset(1)[1])
            next_matched_heading_position = next_matched_heading.nil? ? description.length : next_matched_heading.offset(0)[0] - 1

            description_range = match.offset(0)[1]..next_matched_heading_position
            smart_description_association(symbol, description[description_range].strip)
            earliest_other_description_start = [earliest_other_description_start, description_range.first - match[0].length - 1].min
          end
        end

        description[0..earliest_other_description_start].strip
      end
    end
  end
end
