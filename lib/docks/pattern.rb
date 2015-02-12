module Docks
  module Containers
    class Base
      def initialize(item)
        @item = item
      end

      def to_json
        @item
      end

      def to_s
        @item.to_s
      end

      def inspect
        to_s
      end

      def method_missing(meth)
        @item.send(Docks::Tag.default_tag_name(meth)) rescue nil
      end
    end

    class Pattern < Base
      def self.for(pattern)
        Docks::Builder.build
        cache_file = File.join(Docks.configuration.cache_dir, pattern)

        if File.exists?(cache_file)
          Pattern.new(YAML::load_file(cache_file))
        else
          raise Docks::NoPatternError, "No pattern by the name of '#{pattern}' exists. Make sure you have a script, markup, or style file with that filename that is included in your 'docks_config' source directories."
        end
      end

      def self.group_details(parse_results)
        name = parse_results[:name]
        (
          parse_results[Docks::Types::Languages::MARKUP] +
          parse_results[Docks::Types::Languages::STYLE] +
          parse_results[Docks::Types::Languages::SCRIPT]
        ).each do |parse_result|
          if parse_result.symbol_type == Docks::Types::Symbol::PAGE
            return {
              name: name,
              title: parse_result.page || name.capitalize,
              group: parse_result.group || default_group(parse_results).capitalize
            }
          end
        end

        return {
          name: name,
          title: name.capitalize,
          group: default_group(parse_results).capitalize
        }
      end

      def self.default_group(parse_results)
        Docks::Types::Symbol::COMPONENT
      end

      def self.is_valid?(parse_results)
        !(parse_results[Docks::Types::Languages::MARKUP].empty?) ||
          !(parse_results[Docks::Types::Languages::SCRIPT].empty?) ||
          !(parse_results[Docks::Types::Languages::STYLE].empty?)
      end

      attr_reader :components, :demos, :title, :modified, :name

      def initialize(parse_results)
        @parse_results = parse_results
        page = parse_results_of_type(Docks::Types::Symbol::PAGE).first
        super(page)

        @name = parse_results[:name].to_s
        @title = page.nil? ? @name : page.page
        @modified = Date.parse(parse_results[:modified])

        build_components
        build_demos
      end

      def to_json
        JSON::dump(@parse_results)
      end

      def demo_for(demo)
        @demos.select { |d| d.name == demo }.first
      end

      def to_s
        @parse_results.to_s
      end

      def inspect
        to_s
      end

      def parse_results_of_type(type, options = {})
        parse_types = [:script, :markup, :style]
        type = type.to_s
        included = options[:include].nil? ? parse_types : [options[:include]].flatten
        excluded = options[:exclude].nil? ? [] : [options[:exclude]].flatten

        parse_types.inject([]) do |matches, parse_type|
          if included.include?(parse_type) && !excluded.include?(parse_type)
            matches.concat(@parse_results[parse_type].select { |parse_result| puts parse_result; parse_result.symbol_type.to_s == type })
          else
            matches
          end
        end
      end

      def has_markup?
        @parse_results[:markup].length > 0 || @parse_results[:style].length > 0
      end

      def has_behavior?
        @parse_results[:script].length > 0
      end

      private

      def build_demos
        @demos = []
        @components.each do |component|
          @demos.push(Demo.new(component)) if component.has_demo?
        end
      end

      def build_components
        @components = parse_results_of_type(Docks::Types::Symbol::COMPONENT).map do |component|
          Component.new(component)
        end
      end
    end

    class Demo
      attr_reader :component, :name

      def initialize(component, joint_components = [])
        @component = component
        @name = component.name
      end

      def select_states_and_variants(group_by_component = true)
        states_and_variants_of_demo_type(Docks::Types::Demo::SELECT, group_by_component)
      end

      def joint_states_and_variants
        states_and_variants_of_demo_type(Docks::Types::Demo::JOINT, false)
      end

      private

      def states_and_variants_of_demo_type(type, group_by_component)
        matches = group_by_component ? {} : []

        (@component.variant + @component.state).each do |v|
          if v.demo_type == type
            if group_by_component
              matches[@component.name] ||= []
              matches[@component.name].push(v)
            else
              matches.push(v)
            end
          end
        end

        matches
      end
    end

    class Function < Base
      def initialize(function)
        super(function)
      end
    end

    class Component < Base
      def initialize(component)
        super(component)
      end

      def has_demo?
        return false if no_demo

        the_markup, the_helper = markup, helper
        (!the_markup.nil? && the_markup.length > 0) || (!the_helper.nil? && the_helper.length > 0)
      end
    end
  end
end
