require "docks_theme_api"

module Docks
  module Themes
    def self.for(theme)
      if [String, ::Symbol].include?(theme.class)
        theme = theme.to_sym
        begin
          theme = const_get(theme).instance
        rescue NameError
        end
      else
        theme = theme.instance if theme.kind_of?(Class)
      end

      theme
    end
  end
end
