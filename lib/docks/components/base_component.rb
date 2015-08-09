require "forwardable"

module Docks
  module Components
    def self.standardize_classes(classes, base_component = :base)
      return {} if classes.nil?

      if classes.kind_of?(Hash)
        classes.each do |key, klass|
          classes[key] = klass.kind_of?(String) ? klass.split(" ") : klass
        end
      else
        classes = classes.kind_of?(String) ? classes.split(" ") : classes
        class_hash = {}
        class_hash[base_component] = classes

        classes = class_hash
      end

      classes
    end

    class Base
      extend Forwardable
      attr_reader :block

      def_delegators :@view, :concat, :capture, :render

      def initialize(view, opts = {}, &block)
        @view = view
        @attributes = opts
        @classes = Components.standardize_classes(opts.delete(:classes))
        @block = block
      end

      def config
        yield Config.new(self)
      end

      alias_method :configure, :config

      def method_missing(meth, *args)
         @attributes.key?(meth) ? @attributes[meth] : super
      end

      def respond_to?(meth)
        @attributes.has_key?(meth) || super
      end

      def classes_for(subcomponent = :base)
        @classes.fetch(subcomponent, []).join(" ")
      end

      alias_method :classes, :classes_for

      def ==(other)
        self.class == other.class && attributes == other.instance_variable_get(:@attributes)
      end

      def to_s; @attributes.to_s end
      def inspect; to_s end
    end

    class Config
      def initialize(component)
        @component = component
      end

      def defaults(opts = {})
        @component.instance_variable_get(:@attributes).merge!(opts) do |key, passed, default|
          passed.nil? ? default : passed
        end
      end

      def classes(default_classes = {})
        default_classes = Components.standardize_classes(default_classes)
        @component.instance_variable_get(:@classes).merge!(default_classes) do |key, passed, default|
          passed.concat(default).uniq
        end
      end

      def conditional_classes(opts)
        if (attribute = opts.delete(:if))
          classes(opts) if @component.respond_to?(attribute) && !!@component.send(attribute)
        elsif (attribute = opts.delete(:unless))
          classes(opts) if !@component.respond_to?(attribute) || !@component.send(attribute)
        elsif (attribute = opts.delete(:with))
          return unless block_given?
          classes(yield @component.send(attribute))
        elsif (attribute = opts.delete(:from))
          return unless @component.respond_to?(attribute)
          classes(opts.fetch(@component.send(attribute), nil))
        end
      end
    end
  end
end
