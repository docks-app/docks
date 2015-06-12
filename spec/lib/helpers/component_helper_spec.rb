require "spec_helper"

describe Docks::Helpers::Component do
  let(:includer) do
    Class.new { include Docks::Helpers::Component }.new
  end

  describe "#docks_icons" do
    it "returns the contents of the icon file" do
      expect(File).to receive(:read).with(Docks.config.destination + "images/icons.svg").and_return("foo")
      expect(includer.docks_icons).to eq "foo"
    end
  end

  describe "#docks_icon" do
    it "creates an SVG icon with the passed name" do
      expect(includer.docks_icon("foo")).to have_tag :svg, with: { class: "icon" }
      expect(includer.docks_icon("foo")).to include "<use xlink:href='#icon--foo'></use>"
    end

    it "creates an SVG icon with the passed size" do
      expect(includer.docks_icon("foo", size: 20)).to have_tag :svg, with: { class: ["icon--20"] }
    end

    it "creates and SVG icon with the passed color" do
      expect(includer.docks_icon("foo", color: :blue)).to have_tag :svg, with: { class: ["icon--blue"] }
      expect(includer.docks_icon("foo", color: :blue_darker)).to have_tag :svg, with: { class: ["icon--blue-darker"] }
    end
  end

  describe Docks::Helpers::Component::Component do
    subject { described_class }

    describe "#classes" do
      let(:classes) { %w(foo bar baz) }
      let(:other_classes) { %w(qux fuzz) }
      let(:expected_class) { classes.join(" ") }
      let(:expected_other_class) { other_classes.join(" ") }

      it "allows specifying classes as a hash of strings, hash of arrays, string, or array" do
        expect(subject.new(classes: classes).classes).to eq expected_class
        expect(subject.new(classes: expected_class).classes).to eq expected_class
        expect(subject.new(classes: { base: expected_class }).classes).to eq expected_class
        expect(subject.new(classes: { base: classes }).classes).to eq expected_class
      end

      it "returns classes for the root class by default" do
        expect(subject.new(classes: { base: classes, subcomponent: other_classes }).classes).to eq expected_class
      end

      it "returns classes for the specified component" do
        expect(subject.new(classes: { base: classes, subcomponent: other_classes }).classes(:subcomponent)).to eq expected_other_class
      end

      it "is aliased to #classes_for" do
        component = subject.new(classes: { base: classes, subcomponent: other_classes })
        expect(component.classes).to eq component.classes_for
        expect(component.classes(:subcomponent)).to eq component.classes_for(:subcomponent)
      end
    end

    describe "#block" do
      it "stores the passed block" do
        block = -> { true }
        component = subject.new(&block)
        expect(component.block).to be block
      end
    end

    describe "#method_missing" do
      it "returns the value of a configured option" do
        component = subject.new(name: "foo")
        expect(component.name).to eq "foo"
      end

      it "calls the regular method missing for keys that don't exist" do
        expect { component.name }.to raise_error
      end
    end

    describe "components" do
      it "creates a component method that renders the associated partial with a component instance" do
        %w(avatar tablist code_block).each do |example_component|
          hash = { foo: "bar" }
          block = -> { true }
          partial = Docks.component_template_path + example_component
          expect(includer).to receive(:render).with partial, locals: { component: subject.new(hash, &block) }
          includer.send("docks_#{example_component}".to_sym, hash, &block)
        end
      end
    end

    describe Docks::Helpers::Component::Component::Config do
      let(:component_class) { Docks::Helpers::Component::Component }

      describe "#defaults" do
        it "sets the attributes to the passed defaults" do
          component = component_class.new(name: "foo")
          component.configure do |config|
            config.defaults name: "bar", something_else: "baz"
          end

          expect(component.name).to eq "foo"
          expect(component.something_else).to eq "baz"
        end
      end

      describe "#classes" do
        it "merges the passed and default classes" do
          component = component_class.new(classes: { base: "foo", subcomponent_one: "bar" })
          component.configure do |config|
            config.classes base: "fizz", subcomponent_one: %w(bar baz), subcomponent_two: "qux"
          end

          expect(component.classes_for(:base)).to eq "foo fizz"
          expect(component.classes_for(:subcomponent_one)).to eq "bar baz"
          expect(component.classes_for(:subcomponent_two)).to eq "qux"
        end
      end

      describe "#conditional_classes" do
        subject { component_class.new(foo: true, bar: false, size: :large) }
        let(:klass_one) { "one" }
        let(:klass_two) { "two" }
        let(:klass_three) { "three" }

        context "when the if option is passed" do
          it "adds the class only when the attribute exists and is true" do
            subject.configure do |config|
              config.conditional_classes if: :foo, base: klass_one
              config.conditional_classes if: :bar, base: klass_two
              config.conditional_classes if: :baz, base: klass_three
            end

            expect(subject.classes).to eq klass_one
          end
        end

        context "when the unless option is passed" do
          it "adds the class when the attribute does not exist or is false" do
            subject.configure do |config|
              config.conditional_classes unless: :foo, base: klass_one
              config.conditional_classes unless: :bar, base: klass_two
              config.conditional_classes unless: :baz, base: klass_three
            end

            expect(subject.classes).to eq "#{klass_two} #{klass_three}"
          end
        end

        context "when the with option is passed" do
          it "does nothing when no block is passed" do
            subject.configure do |config|
              config.conditional_classes with: :size
            end

            expect(subject.classes).to eq ""
          end

          it "yields the value of the passed attribute and uses the returned classes" do
            yielded = nil
            subject.configure do |config|
              config.conditional_classes(with: :size) do |size|
                yielded = size
                { base: klass_two }
              end
            end

            expect(yielded).to eq subject.size
            expect(subject.classes).to eq klass_two
          end
        end

        context "when the from option is passed" do
          it "does nothing when the passed attribute does not exist" do
            subject.configure do |config|
              config.conditional_classes from: :type, regular: { base: klass_one }
            end

            expect(subject.classes).to eq ""
          end

          it "uses the value of the passed attribute to determine which classes to use" do
            subject.configure do |config|
              config.conditional_classes from: :size, regular: { base: klass_one }, large: { base: klass_two }
            end

            expect(subject.classes).to eq klass_two
          end
        end
      end
    end
  end
end
