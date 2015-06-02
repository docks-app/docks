module Docks
  module Tags

    # Public: The tag attributes for `@markup`.
    #
    # The `markup` tag is the easiest way to include markup for your
    # components. The default template will use this (with some extra logic
    # thrown in) to generate the demo component.

    class Markup < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@markup` name for use in documentation and allows it to span multiple
      # lines.

      def initialize
        @name = :markup
      end

      def process(symbol)
        symbol.update(@name) { |markup| markup.join("\n") }
      end

      def setup_post_processors
        after_each_pattern(:late) do |pattern|
          components = pattern.components
          associate_content_from_external_files(components)
          clean_up_helper_and_markup(components)
          prepare_variation_markup(components)
          pattern
        end
      end

      protected

      def associate_content_from_external_files(components)
        markup_files = Docks::Group.source_files_of_type(Types::Languages::MARKUP)
        stub_files = Docks::Group.source_files_of_type(Types::Languages::STUB)

        components.each do |component|
          name = component.name
          id = Docks::Group.group_identifier(name)

          if component.markup.nil? && !markup_files.empty?
            markup_file = markup_files.find do |file|
              name == File.basename(file, ".*").sub(/^_+/, "") || id == Docks::Group.group_identifier(file)
            end

            component.markup = File.read(markup_file) unless markup_file.nil?
          end

          if component.markup.nil? && !component.helper.nil? && !stub_files.empty?
            markup_language = Languages.most_common_markup_language || Languages::ERB.instance
            next unless markup_language.respond_to?(:helper_markup_for)

            stub_file = stub_files.find do |file|
              name == File.basename(file, ".*").sub(/^_+/, "") || id == Docks::Group.group_identifier(file)
            end

            stub = stub_file.nil? ? nil : Languages.language_for(stub_file).load_stub(stub_file)
            component.helper = markup_language.helper_markup_for(component.helper, stub) unless stub.nil?
          end
        end
      end

      def clean_up_helper_and_markup(components)
        components.each do |component|
          markup, helper = component.markup, component.helper
          if markup && helper && markup.include?(helper)
            component.helper = component.markup
            component.markup = nil
          end
        end
      end

      def prepare_variation_markup(components)
        components.each do |component|
          next unless component.has_demo?
          markup, helper = component.markup, component.helper

          component.variations do |variation|
            next unless variation.has_demo?
            next if variation.helper || variation.markup

            if helper
              update_helper_for_variation(helper, variation)
            elsif markup
              update_markup_for_variation(markup, variation)
            end
          end
        end
      end

      def update_markup_for_variation(markup, variation)
        variation.markup = markup.gsub(/class\s*=\s*['"][^'"]*#{Docks::Naming.convention.component(variation.name)}[\s'"]/) do |match|
          "#{match[0...-1]} #{variation.name}#{match[-1]}"
        end
      end

      def update_helper_for_variation(helper, variation)
        variation.set_by.each do |set_by|
          update_found = false
          new_helper = helper.gsub(/#{Regexp.escape(set_by[:setter].sub(/^:/, ""))}(:\s*|\s*=>\s*)([:a-zA-Z_]*)/) do |match|
            update_found = true
            value = set_by[:constant] || "true"
            join = $1.dup
            "#{set_by[:setter].sub(/^:/, "")}#{join}#{value}"
          end

          if update_found
            variation.helper = new_helper
            break
          end
        end
      end
    end
  end
end
