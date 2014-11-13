module Docks
  class Helpers
    def self.base_class(item)
      return nil unless item.is_a? String
      return nil if item.start_with?('--')

      item.split('--').first
    end

    def self.titleize(str)
      str.split(/(?:\-\-|\-|__|_)/).map(&:capitalize).join(' ')
    end
  end
end
