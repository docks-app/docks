Dir[File.expand_path("../helpers/*.rb", __FILE__)].each do |helper|
  require helper
end

module Docks
  module Helpers
    def self.add_helpers_to(renderer)
      return unless renderer.respond_to?(:helpers)

      renderer.helpers(*bundled_helpers)
      renderer.helpers(*Docks.config.theme.helpers) if Docks.config.has_theme?
      renderer.helpers(*Docks.config.helpers)
      renderer
    end

    def self.bundled_helpers
      @bundled_helpers ||= constants.map { |const| const_get(const) }
    end
  end
end
