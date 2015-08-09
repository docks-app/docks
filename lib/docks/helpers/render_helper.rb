require "erb"
require "active_support/core_ext/string/output_safety"

module Docks
  module Helpers
    module Render
      include ::ERB::Util

      def render_everything
        render_everything_for(@pattern)
        @pattern.symbols.each { |symbol| render_everything_for(symbol) }
      end

      private

      def render_everything_for(symbol, options = {})
        case symbol
        when Containers::Base
          options[:language] = symbol.source.nil? ? nil : symbol.source.language_code
          render_markup(symbol)

          symbol.each do |k, v|
            next if v.nil?

            if k == :description
              symbol[k] = render_description(v, options)
            else
              symbol[k] = render_everything_for(v, options)
            end
          end

          if symbol.respond_to?(:members)
            symbol.members.each { |member| render_everything_for(member, options) }
          end

        when Array
          symbol.map! { |each_symbol| render_everything_for(each_symbol, options) }

        when OpenStruct
          symbol.each do |k, v|
            next if v.nil?

            if k == :description
              symbol.description = render_description(v, options)
            else
              symbol.send("#{k.to_s}=".to_sym, render_everything_for(v, options))
            end
          end
        end

        symbol
      end

      def render_markup(symbol)
        markup, helper = symbol.markup, symbol.helper
        return if markup.nil? && helper.nil?
        symbol.markup = render(inline: (helper || markup), layout: false)
      end

      def render_description(description, options = {})
        @example_count ||= 0
        description.gsub! /(href\s*=\s*['"])@link\s([^'"]*)(.)/ do |match|
          "#{$1}#{docks_path($2, options)}#{$3}"
        end

        render(layout: false, inline: description.gsub(/<fenced_code_block[^>]*>(.*?)<\/fenced_code_block>/m) { |match|
          @example_count += 1
          code = $1.dup
          has_demo = match.include?("data-has-demo")
          language = match.match(/data\-language=["']([^'"]*)/).captures.first

          code_details = []
          code_details << { code: code, language: language, label: "Helper" }

          if has_demo
            code_details << { code: render(inline: code, layout: false), language: "html", label: "Markup" }
          end

          docks_code_block code: code_details,
                           hideable?: has_demo,
                           id: "code-block--example-#{@example_count}",
                           demo?: has_demo
        })
      end
    end
  end
end
