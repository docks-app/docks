require_relative "base_component.rb"

module Docks
  module Components
    class Tablist < Base
      def tab(*args); @view.docks_component("tablist:tab", *args) end
    end
  end
end
