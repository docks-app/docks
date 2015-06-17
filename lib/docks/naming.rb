Dir[File.expand_path("../naming_conventions/*.rb", __FILE__)].each do |convention|
  require convention
end

module Docks
  module Naming
    def self.convention
      @convention ||= Conventions::BEM.instance
    end

    def self.convention=(naming_convention)
      if [String, ::Symbol].include?(naming_convention.class)
        naming_convention = naming_convention.to_sym
        begin
          @convention = Conventions.const_get(naming_convention).instance
        rescue NameError
        end
      else
        naming_convention = naming_convention.instance if naming_convention.respond_to?(:instance)
        @convention = naming_convention if naming_convention.kind_of?(Docks::Naming::Conventions::Base)
      end

      @convention
    end

    private

    def self.clean
      @convention = nil
    end
  end
end
