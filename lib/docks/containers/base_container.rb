require "forwardable"
require_relative "../tags.rb"

module Docks
  module Containers

    # Public: the base container for symbols. This class should be inherited
    # from for all other symbol containers. Its most important feature is that
    # it normalizes synonymous tags so that any tag can be called on a
    # container and the result will be returned as expected.

    class Base
      extend Forwardable

      def_delegators :@details, :to_s, :inspect, :to_json, :each

      def initialize(details = {})
        details = Tags.join_synonymous_tags(details)
        @details = details
      end

      def to_h; @details end
      alias_method :to_hash, :to_h

      def ==(other_container)
        self.class == other_container.class && @details == other_container.instance_variable_get(:@details)
      end

      def update(tag)
        self[tag] = yield(self[tag])
      end

      def [](tag)
        fetch(tag, nil)
      end

      def []=(tag, new_value)
        tag = Tags.base_tag_name(tag)
        @details[tag] = new_value unless tag.nil?
      end

      def delete(tag)
        @details.delete(Tags.base_tag_name(tag))
      end

      def fetch(tag, *args)
        @details.fetch(Tags.base_tag_name(tag), *args)
      end

      def tags
        @details.keys.map { |tag| Tags.tag_for(tag) }
      end

      def method_missing(meth, *args, &block)
        stripped = meth.to_s.sub("=", "").to_sym
        has_tag = Tags.has_tag?(stripped)

        if stripped != meth && has_tag
          self[stripped] = args.first
        elsif has_tag
          fetch(meth, nil)
        else
          super(meth, *args, &block)
        end
      end

      def respond_to?(meth)
        Tags.has_tag?(meth.to_s.sub("=", "")) || super
      end

      def summary
        Summary.new(self)
      end

      protected

      class Summary
        attr_reader :name

        def initialize(item)
          @name = item.name
        end

        def ==(other_summary)
          self.class == other_summary.class && name == other_summary.name
        end
      end
    end
  end
end
