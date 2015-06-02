require "redcarpet"

module Docks
  module Markdown
    class Renderer < Redcarpet::Render::HTML
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
  end
end
