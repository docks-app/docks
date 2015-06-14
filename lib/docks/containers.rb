module Docks
  module Containers
    TOP_LEVEL_SYMBOLS = [
      Types::Symbol::COMPONENT,
      Types::Symbol::CLASS,
      Types::Symbol::FACTORY,
      Types::Symbol::FUNCTION,
      Types::Symbol::MIXIN,
      Types::Symbol::VARIABLE
    ]

    @@container_associations = Hash.new

    def self.container_for(type = nil)
      if @@container_associations.empty?
        constants.each do |const|
          klass = const_get(const)
          @@container_associations[klass.type.to_sym] = klass if klass.respond_to?(:type)
        end
      end

      type.nil? ? Symbol : @@container_associations.fetch(type.to_sym, Symbol)
    end
  end
end
