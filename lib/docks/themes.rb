Dir[File.expand_path("../themes/*.rb", __FILE__)].each do |theme|
  require theme
end

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

      theme.kind_of?(Base) ? theme : nil
    end
  end
end
