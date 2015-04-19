module Docks
  module Containers

    # Public: all of the symbols that can appear on their own at the top level
    # of parse results. Some symbols are excluded from this list (like variants
    # and states) because these are always grouped under another top-level
    # symbol in a post-processing step.

    TOP_LEVEL_SYMBOLS = [
      Docks::Types::Symbol::COMPONENT,
      Docks::Types::Symbol::CLASS,
      Docks::Types::Symbol::FUNCTION,
      Docks::Types::Symbol::MIXIN,
      Docks::Types::Symbol::VARIABLE
    ]

    @@container_associations = Hash.new


    # Public: gets the container that should be used to contain the passed
    # symbol. The association is based on the equality of the symbol's
    # `symbol_type` key and the container's `type` class variable. If no
    # matching containers are found, the Base container is used.
    #
    # symbol - a Hash representing a parsed symbol.
    #
    # Returns the container class to use to encapsulate this symbol.

    def self.container_for(symbol)
      if @@container_associations.empty?
        constants.each do |const|
          klass = const_get(const)
          @@container_associations[klass.type.to_sym] = klass if klass.respond_to?(:type)
        end
      end

      type = symbol[:symbol_type]
      type = type.to_sym unless type.nil?
      @@container_associations[type] || Base
    end
  end
end
