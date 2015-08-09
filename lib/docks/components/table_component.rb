require_relative "base_component.rb"

module Docks
  module Components
    class Table < Base
      def initialize(*args)
        @cell_element = "td"
        super
      end

      def header(&block)
        old_cell_element, @cell_element = @cell_element, "th"
        concat "<thead class='table__header'>#{capture(&block)}</thead>"
        @cell_element = old_cell_element
      end

      def body(&block)
        concat "<tbody class='table__body'>#{capture(&block)}</tbody>"
      end

      def row(&block)
        concat "<tr class='table__row'>#{capture(&block)}</tr>"
      end

      def cell(content, options = {})
        klass = "table__cell"
        klass << " table__cell--centered" if options.fetch(:centered?, false)
        "<#{@cell_element} class='#{klass}'>#{content}</#{@cell_element}>"
      end
    end
  end
end
