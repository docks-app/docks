require "spec_helper"

state_one = OpenStruct.new(name: "foo", demo_type: Docks::Types::Demo::NONE)
state_two = OpenStruct.new(name: "bar", demo_type: Docks::Types::Demo::SELECT)
variant_one = OpenStruct.new(name: "baz", demo_type: Docks::Types::Demo::SELECT)
variant_two = OpenStruct.new(name: "qux", demo_type: Docks::Types::Demo::JOINT)

basic_component = Docks::Containers::Component.new(name: "flarb", state: [state_one])
complex_component = Docks::Containers::Component.new(name: "blarg", state: [state_one, state_two], variant: [variant_one, variant_two])

describe Docks::Containers::Demo do
  subject { Docks::Containers::Demo }

  before :each do
    Docks::Tag.register_bundled_tags
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
