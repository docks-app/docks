Dir[File.expand_path("../naming_conventions/*.rb", __FILE__)].each do |convention|
  require convention
end

module Docks
  module Naming
    def self.convention
      @convention ||= Conventions::BEM.instance
    end

    def self.convention=(naming_convention)
      naming_convention = naming_convention.instance if naming_convention.respond_to?(:instance)
      @convention = naming_convention if naming_convention.kind_of?(Conventions::Base)
    end

    private

    def self.clean
      @convention = nil
    end
  end
end
