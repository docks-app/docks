require "spec_helper"

describe Docks::PostProcessors::JoinSubcomponentsToBaseComponent do
  subject { Docks::PostProcessors::JoinSubcomponentsToBaseComponent }

  let(:component) do
    { name: "button", symbol_type: Docks::Types::Symbol::COMPONENT }
  end

  let(:subcomponent_one) do
    { name: "button__text", symbol_type: Docks::Types::Symbol::COMPONENT }
  end

  let(:subcomponent_two) do
    { name: "button__text__icon", symbol_type: Docks::Types::Symbol::COMPONENT }
  end

  let(:orphan_subcomponent_one) do
    { name: "tablist__tab", symbol_type: Docks::Types::Symbol::COMPONENT }
  end

  let(:orphan_subcomponent_two) do
    { name: "tablist__panel-list__panel", symbol_type: Docks::Types::Symbol::COMPONENT }
  end

  describe "#post_process" do
    it "leaves components as-is" do
      expect(subject.post_process([component])).to eq [component]
    end

    it "joins subcomponents to the base component" do
      result = subject.post_process([component, subcomponent_one, subcomponent_two])
      expect(result.length).to be 1
      expect(result).to eq [component]
    end

    it "joins subcomponents before the base component to the base component" do
      result = subject.post_process([subcomponent_one, component, subcomponent_two])
      expect(result.length).to be 1
      expect(result).to eq [component]
    end

    it "stores subcomponents on the base component" do
      result = subject.post_process([subcomponent_one, component, subcomponent_two]).first
      expect(result).to be component
      subcomponent_one.delete(:delete)
      subcomponent_two.delete(:delete)
      expect(result[:subcomponents]).to include(subcomponent_one)
      expect(result[:subcomponents]).to include(subcomponent_two)
    end

    it "creates a new base component for orphaned subcomponents" do
      result = subject.post_process([orphan_subcomponent_one, orphan_subcomponent_two])
      expect(result.length).to be 1

      orphan_subcomponent_one.delete(:delete)
      orphan_subcomponent_two.delete(:delete)

      expected_base_component = {
        name: "tablist",
        symbol_type: Docks::Types::Symbol::COMPONENT,
        subcomponents: [orphan_subcomponent_one, orphan_subcomponent_two]
      }
      expect(result.first).to eq expected_base_component
    end
  end
end
