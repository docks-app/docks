module Docks
  module ApplicationHelper
    def button(text)
      content_tag(:button, text, class: "button")
    end
  end
end
