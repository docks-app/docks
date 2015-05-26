module Docks
  module PostProcessors
    class MarkdownDescriptions < Base
      private

      class HTMLwithSyntaxHighlighting < Redcarpet::Render::HTML
        def block_code(code, language)
          return nil unless language
          "<fenced_code_block #{"data-has-demo='true'" unless (language =~ /demo/).nil?} data-language='#{language.sub(/_?demo/, "")}'>#{code}</fenced_code_block>"
        end

        def link(href, title, content)
          href = "@link #{content.gsub(/<[^>]*>/, "").strip}" if href.strip == "@link"
          content = "<span>#{content}</span>" unless content.strip.start_with?("<")
          "<a href=\"#{href}\"#{" title=\"#{title}\"" unless title.nil?}>#{content}</a>"
        end
      end

      @@markdown = Redcarpet::Markdown.new(HTMLwithSyntaxHighlighting, fenced_code_blocks: true)

      public

      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          parse_result.each do |key, value|
            parse_result[key] = if key == :description && value.kind_of?(String)
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
          item[:description] = @@markdown.render(item[:description].strip) if item[:description].kind_of?(String)
        elsif item.kind_of?(Array)
          item.map! { |arr_item| self.recursive_markdown_description(arr_item) }
        end

        item
      end
    end
  end
end
