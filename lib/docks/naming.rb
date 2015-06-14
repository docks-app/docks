Dir[File.expand_path("../naming_conventions/*.rb", __FILE__)].each do |convention|
  require convention
end

module Docks
  module Naming
    def self.convention
      @convention ||= Conventions::BEM.instance
    end
  end
end
