module Docks
  module Containers

    # Public: all of the symbols that can appear on their own at the top level
    # of parse results. Some symbols are excluded from this list (like variants
    # and states) because these are always grouped under another top-level
    # symbol in a post-processing step.

    TOP_LEVEL_SYMBOLS = [
      Docks::Types::Symbol::COMPONENT,
      Docks::Types::Symbol::CLASS,
      Docks::Types::Symbol::FACTORY,
      Docks::Types::Symbol::FUNCTION,
      Docks::Types::Symbol::MIXIN,
      Docks::Types::Symbol::VARIABLE
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
