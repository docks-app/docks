module Docks
  module PostProcessors
    class MarkdownDescriptions < Base
      private

      class HTMLwithSyntaxHighlighting < Redcarpet::Render::HTML
        def block_code(code, language)
          # formatter = Rouge::Formatters::HTML.new css_class: "highlight"
          # lexer_html = Rouge::Lexers::HTML.new
          # highlighted_code = formatter.format(lexer_html.lex(code))

          # render = Docks::Render.new
          # render.extension = '.haml'
          # highlighted_code = render.render_partial :code_block, markup: highlighted_code, html: code, demo: language.match(/_demo/)

          # highlighted_code

          super
        end
      end

      @@markdown = Redcarpet::Markdown.new(HTMLwithSyntaxHighlighting, fenced_code_blocks: true)

      public

      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          parse_result.each do |key, value|
            parse_result[key] = if key == :description
              @@markdown.render(value.strip)
            else
              recursive_markdown_description(value)
            end
          end
        end

        parsed_file
      end

      private

      def self.recursive_markdown_description(item)
        if item.kind_of?(Hash)
          @@markdown.render(item[:description].strip) if item[:description].kind_of?(String)
        elsif item.kind_of?(Array)
          item.map! { |arr_item| self.recursive_markdown_description(arr_item) }
        end

        item
      end
    end
  end
end
