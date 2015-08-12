require "spec_helper"

describe Docks::Tags::Subcomponent do
  subject { described_class.instance }

  it "can't be be parsed from files" do
    expect(subject.parseable?).to be false
  end

  describe "#setup_post_processors" do
    let(:component_container) { Docks::Containers::Component }

    let(:pattern) { Docks::Containers::Pattern.new(name: "button") }
    let(:component) { component_container.new(name: "button") }
    let(:subcomponent_one) { component_container.new(name: "button__text") }
    let(:subcomponent_two) { component_container.new(name: "button__text__icon") }
    let(:orphan_subcomponent_one) { component_container.new(name: "tablist__tab") }
    let(:orphan_subcomponent_two) { component_container.new(name: "tablist__panel-list__panel") }

    it "leaves components as-is" do
      pattern.add(:style, component)
      Docks::Process.process(pattern)
      expect(pattern.components.length).to be 1
      expect(pattern.components.first).to be component
    end

    it "joins subcomponents to the base component" do
      pattern.add(:style, [component, subcomponent_one, subcomponent_two])
      Docks::Process.process(pattern)
      expect(pattern.components.length).to be 1

      component = pattern.components.first
      expect(component).to be component
      expect(component.subcomponents.length).to be 1

      subcomponent = component.subcomponents.first
      expect(subcomponent).to be subcomponent_one
      expect(subcomponent.subcomponents.length).to be 1
      expect(subcomponent.subcomponents.first).to be subcomponent_two
    end

    it "joins subcomponents before the base component to the base component" do
      pattern.add(:style, [subcomponent_two, component, subcomponent_one])
      Docks::Process.process(pattern)
      expect(pattern.components.length).to be 1

      component = pattern.components.first
      expect(component).to be component
      expect(component.subcomponents.length).to be 1

      subcomponent = component.subcomponents.first
      expect(subcomponent).to be subcomponent_one
      expect(subcomponent.subcomponents.length).to be 1
      expect(subcomponent.subcomponents.first).to be subcomponent_two
    end

    it "creates a new base component for orphaned subcomponents" do
      pattern.add(:style, [orphan_subcomponent_one, orphan_subcomponent_two])
      Docks::Process.process(pattern)
      expect(pattern.components.length).to be 1

      component = pattern.components.first
      expect(component.name).to eq Docks.config.naming_convention.base_component(orphan_subcomponent_one.name)

      subcomponents = component.subcomponents
      expect(subcomponents.length).to be 2
      expect(subcomponents).to include orphan_subcomponent_one

      orphan_two_parent = subcomponents.find do |subcomponent|
        subcomponent.name == Docks.config.naming_convention.parent_component(orphan_subcomponent_two.name)
      end

      expect(subcomponents).to include orphan_two_parent
      expect(orphan_two_parent.subcomponents.length).to be 1
      expect(orphan_two_parent.subcomponents).to include orphan_subcomponent_two
    end
  end
end
