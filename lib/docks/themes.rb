module Docks
  module Themes
    def self.for(theme)
      if [String, ::Symbol].include?(theme.class)
        begin
          require "docks_theme_#{theme.to_s.downcase}"
          theme = theme.to_sym
          theme = const_get(theme).instance
        rescue LoadError, NameError
          theme = false
        end
      else
        theme = theme.instance if theme.kind_of?(Class)
      end

      theme
    end
  end
end
