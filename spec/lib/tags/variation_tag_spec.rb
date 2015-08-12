require "spec_helper"

describe Docks::Tags::Variation do
  subject { described_class.instance }

  it "can't be be parsed from files" do
    expect(subject.parseable?).to be false
  end

  describe "post process" do
    before(:each) { Docks::Tags.register_bundled_tags }

    describe "joining variations to their components" do
      let(:pattern) { Docks::Containers::Pattern.new(name: "foo") }
      let(:subcomponent) { Docks::Containers::Component.new(name: "foo__bar") }
      let(:component) { Docks::Containers::Component.new(name: "foo", subcomponents: [subcomponent]) }
      let(:state) { Docks::Containers::State.new(name: "foo--is-bar") }
      let(:subcomponent_variant) { Docks::Containers::Variant.new(name: "foo__bar--baz") }

      it "joins orphan variations to their component" do
        pattern.add(:style, [state, component])
        Docks::Process.process(pattern)

        expect(pattern.style_symbols.length).to be 1
        expect(pattern.components.length).to be 1
        expect(pattern.components.first).to be component
        expect(pattern.components.first.states.length).to be 1
        expect(pattern.components.first.states.first).to be state
      end

      it "joins orphan variations to subcomponents" do
        pattern.add(:style, [component, subcomponent_variant])
        Docks::Process.process(pattern)

        expect(pattern.style_symbols.length).to be 1
        expect(pattern.components.length).to be 1

        the_component = pattern.components.first
        the_subcomponent = component.subcomponents.first

        expect(the_component.variants).to be_empty
        expect(the_subcomponent.variants.length).to be 1
        expect(the_subcomponent.variants.first).to be subcomponent_variant
      end

      it "creates components for the variation if they don't exist" do
        pattern.add(:style, [subcomponent_variant])
        Docks::Process.process(pattern)

        expect(pattern.style_symbols.length).to be 1
        expect(pattern.components.length).to be 1

        component = pattern.find(Docks::NamingConventions::BEM.instance.component(subcomponent_variant.name))
        expect(component.variants.length).to be 1
        expect(component.variants.first).to be subcomponent_variant
      end
    end

    describe "clean up names" do
      let(:pattern) { Docks::Containers::Pattern.new(name: "foo") }
      let(:variation) { Docks::Containers::State.new(name: "foo--is-bar", activate_with: ["--baz", "foo--fuzz"], precludes: "--qux") }
      let(:bad_name_variation) { Docks::Containers::Variant.new(name: "--baz") }

      let(:subcomponent) { Docks::Containers::Component.new(name: "foo__bar", variants: [bad_name_variation]) }
      let(:component) { Docks::Containers::Component.new(name: "foo", states: [variation], subcomponents: [subcomponent]) }

      before(:each) do
        pattern.add(:style, component)
        Docks::Process.process(pattern)
      end

      it "prepends the names of variations with the base class if necessary" do
        expect(variation.name).to eq "foo--is-bar"
        expect(bad_name_variation.name).to eq "foo__bar--baz"
      end

      it "prepends the names of active withs and precludes" do
        expect(variation.activate_with.first).to eq "foo--baz"
        expect(variation.activate_with.last).to eq "foo--fuzz"
        expect(variation.precludes.first).to eq "foo--qux"
      end
    end

    describe "mirroring preclusions" do
      let(:state_one) { Docks::Containers::State.new(name: "tab--is-active") }
      let(:state_two) { Docks::Containers::State.new(name: "tab--is-inactive", precludes: [state_one.name]) }
      let(:variant_one) { Docks::Containers::Variant.new(name: "tab--large", precludes: [state_two.name]) }
      let(:subcomponent_variant) { Docks::Containers::Variant.new(name: "tab__text--subdued") }
      let(:subcomponent_state) { Docks::Containers::State.new(name: "tab__text--is-blinking", precludes: [subcomponent_variant.name]) }
      let(:subcomponent) { Docks::Containers::Component.new(name: "tab__text") }
      let(:component) { Docks::Containers::Component.new(name: "tab", subcomponents: [subcomponent]) }

      let(:pattern) do
        pattern = Docks::Containers::Pattern.new(name: "tab")
        pattern.add(:style, component)
        pattern
      end

      it "mirrors a single preclusion to the precluded state/ variant" do
        component.states << state_one
        component.states << state_two
        component.variants << variant_one
        post_process

        expect(state_one.precludes.length).to be 1
        expect(state_one.precludes).to include state_two.name

        expect(state_two.precludes.length).to be 2
        expect(state_two.precludes).to include variant_one.name
      end

      it "does not mirror a preclusion if the class is already included" do
        state_one.precludes << state_two.name
        component.states << state_one
        component.states << state_two
        post_process

        expect(state_one.precludes.length).to be 1
        expect(state_one.precludes).to include state_two.name
      end

      it "mirrors preclusions to multiple states/ variants" do
        variant_one.precludes << state_one.name
        component.states << state_one
        component.states << state_two
        component.variants << variant_one
        post_process

        expect(state_one.precludes.length).to be 2
        expect(state_one.precludes).to include variant_one.name

        expect(state_two.precludes.length).to be 2
        expect(state_one.precludes).to include variant_one.name

        expect(variant_one.precludes.length).to be 2
      end

      it "mirror preclusions in subcomponents" do
        subcomponent.states << subcomponent_state
        subcomponent.variants << subcomponent_variant
        post_process

        expect(subcomponent_variant.precludes.length).to be 1
        expect(subcomponent_variant.precludes).to include subcomponent_state.name
      end

      private

      def post_process
        Docks::Process.process(pattern)
      end
    end
  end
end
