Dir[File.expand_path("../naming_conventions/*.rb", __FILE__)].each do |convention|
  require convention
end

module Docks
  module NamingConventions
    def self.for(convention)
      if [String, ::Symbol].include?(convention.class)
        convention = convention.to_sym
        begin
          convention = const_get(convention).instance
        rescue NameError
        end
      else
        convention = convention.instance if convention.kind_of?(Class)
      end

      convention.kind_of?(Base) ? convention : nil
    end
  end
end
