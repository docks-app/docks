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
        description.gsub! /(href\s*=\s*['"])@link\s([^'"]*)(.)/ do |match|
          "#{$1}#{docks_path($2, options)}#{$3}"
        end

        render(layout: false, inline: render_description_with_theme(description, options))
      end

      # To be (optionally) overriden in themes
      def render_description_with_theme(description, options = {})
        description
      end
    end
  end
end
