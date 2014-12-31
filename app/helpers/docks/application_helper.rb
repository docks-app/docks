module Docks
  module ApplicationHelper
    def button(text)
      content_tag(:button, text, class: "button")
    end

    def ui_segmented_button(options = {})
      html = "<div class='segmented-button'>\n"
      html << options[:buttons].map { |button| "<button class='button'>#{button}</button>" }.join("\n")
      html << "\n</div>"
      html.html_safe
    end
  end
end
