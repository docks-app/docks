module Docks
  module ApplicationHelper
    def ui_button(text, options = {})
      klass = "button"
      klass << " button--is-active" if options[:active?]
      klass << " button--is-great" if options[:great?]
      klass << " button--large" if options[:size] == :large
      klass << " button--small" if options[:size] == :small
      klass << " button--disabled" if options[:disabled?]

      content_tag(:button, text, class: klass)
    end

    def ui_segmented_button(options = {})
      html = "<div class='segmented-button'>\n"
      html << options[:buttons].map { |button| "<button class='button'>#{button}</button>" }.join("\n")
      html << "\n</div>"
      html.html_safe
    end
  end
end
