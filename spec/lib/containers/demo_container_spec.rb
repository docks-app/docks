require "spec_helper"

state_one = OpenStruct.new(name: "foo", demo_type: Docks::Types::Demo::NONE)
state_two = OpenStruct.new(name: "bar", base_class: "b", demo_type: Docks::Types::Demo::SELECT)
variant_one = OpenStruct.new(name: "baz", demo_type: Docks::Types::Demo::SELECT)
variant_two = OpenStruct.new(name: "qux", demo_type: Docks::Types::Demo::JOINT)


describe Docks::Containers::Demo do
  subject { Docks::Containers::Demo }

  before :each do
    Docks::Tags.register_bundled_tags
  end

  let(:basic_component) do
    Docks::Containers::Component.new(name: "flarb", state: [state_one])
  end

  let(:complex_component) do
    Docks::Containers::Component.new(name: "blarg", state: [state_one, state_two], variant: [variant_one, variant_two])
  end

  let(:basic_demo) { subject.new(basic_component) }
  let(:complex_demo) { subject.new(complex_component) }

  describe "#name" do
    it "has the same name as its main component" do
      expect(complex_demo.name).to eq complex_component.name
    end
  end

  describe "#component" do
    it "returns its main component" do
      expect(complex_demo.component).to be complex_component
    end
  end

  describe "#select_variations" do
    it "has no select variations when none are included in the component" do
      expect(basic_demo.select_variations).to eq Array.new
    end

    it "has select variations when they are included with the component" do
      variations = complex_demo.select_variations
      expect(variations.length).to be 2
      expect(variations).to include state_two
      expect(variations).to include variant_one
    end

    it "has no select variations when none are included and the user asks them to be grouped by base component" do
      expect(basic_demo.select_variations(group_by_component: true)).to eq Hash.new
    end

    it "groups select variations by their base component when requested" do
      variations = complex_demo.select_variations(group_by_component: true)

      expect(variations.length).to be 1

      component_variations = variations[complex_demo.name]
      expect(component_variations.length).to be 2
      expect(component_variations).to include state_two
      expect(component_variations).to include variant_one
    end

    it "includes select variations from subcomponents" do
      basic_component[:state] = [state_two]
      complex_component[:subcomponents] = [basic_component]
      variations = complex_demo.select_variations(group_by_component: true)

      expect(variations.length).to be 2

      subcomponent_variations = variations[basic_component.name]
      expect(subcomponent_variations.length).to be 1
      expect(subcomponent_variations).to include state_two
    end

    it "includes select variations from included components" do
      basic_component[:state] = [state_two]
      complex_component[:included_symbols] = [basic_component]
      variations = complex_demo.select_variations(group_by_component: true)

      expect(variations.length).to be 2

      subcomponent_variations = variations[basic_component.name]
      expect(subcomponent_variations.length).to be 1
      expect(subcomponent_variations).to include state_two
    end

    it "includes select variations that are directly included" do
      complex_component[:included_symbols] = [state_one, state_two]
      variations = complex_demo.select_variations(group_by_component: true)

      expect(variations.length).to be 2

      subcomponent_variations = variations[state_two.base_class]
      expect(subcomponent_variations.length).to be 1
      expect(subcomponent_variations).to include state_two
    end
  end

  describe "#joint_variations" do
    it "has no joint variations when none are included in the component" do
      expect(basic_demo.joint_variations).to eq Array.new
    end

    it "has joint variations when they are included in the component" do
      variations = complex_demo.joint_variations
      expect(variations.length).to be 1
      expect(variations).to include variant_two
    end
  end
end
