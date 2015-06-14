require "spec_helper"

describe Docks::Containers::Component do
  let(:sub_subcomponent) do
    Docks::Containers::Component.new(name: "foo__bar__baz")
  end

  let(:subcomponent) do
    Docks::Containers::Component.new(name: "foo__bar", subcomponents: [sub_subcomponent])
  end

  let(:component) do
    Docks::Containers::Component.new(name: "foo", subcomponents: [subcomponent])
  end

  let(:states) do
    [
      Docks::Containers::State.new(name: "foo--is-bar"),
      Docks::Containers::State.new(name: "foo--is-baz")
    ]
  end

  let(:variants) do
    [
      Docks::Containers::Variant.new(name: "foo--bar"),
      Docks::Containers::Variant.new(name: "foo--baz")
    ]
  end

  describe "#has_demo?" do
    it "has a demo when it has non-empty markup" do
      expect(described_class.new(markup: "<p>Hi!</p>").has_demo?).to be true
    end

    it "has a demo when it has non-empty helper" do
      expect(described_class.new(helper: "<p><%= foo %></p>").has_demo?).to be true
    end

    it "doesn't have a demo when there is no markup or helper" do
      expect(described_class.new(foo: "bar").has_demo?).to be false
    end

    it "doesn't have a demo when the markup is empty" do
      expect(described_class.new(markup: "").has_demo?).to be false
    end

    it "doesn't have a demo when the helper is empty" do
      expect(described_class.new(helper: "").has_demo?).to be false
    end
  end

  describe "#subcomponents" do
    context "when no options are passed" do
      it "has subcomponents when they are included on the component" do
        expect(component.subcomponent.length).to be 1
        expect(component.subcomponents).to include subcomponent
      end

      it "has an empty array of subcomponents when not included" do
        component = described_class.new
        expect(component.subcomponent).to be_an Array
        expect(component.subcomponent).to be_empty
      end
    end

    context "when the :recursive option is true" do
      it "returns subcomponents recursively" do
        subcomponents = component.subcomponents(recursive: true)
        expect(subcomponents.length).to be 2
        expect(subcomponents).to include subcomponent
        expect(subcomponents).to include sub_subcomponent
      end

      it "doesn't duplicate the subcomponents" do
        component.subcomponents(recursive: true)
        expect(component.subcomponents.length).to be 1
      end
    end
  end

  describe "#variations" do
    it "has no variations when there are no states or variants" do
      component = described_class.new({})
      expect(component.variations).to be_empty
    end

    it "has variations when there are only states" do
      component = described_class.new(state: states)
      variations = component.variations

      expect(variations).not_to be_empty
      states.each do |state|
        expect(variations).to include(state)
      end
    end

    it "has variations when there are only variants" do
      component = described_class.new(variant: variants)
      variations = component.variations

      expect(variations).not_to be_empty
      variants.each do |variant|
        expect(variations).to include(variant)
      end
    end

    it "has variations when there are states and variants" do
      component = described_class.new(state: states, variant: variants)
      variations = component.variations

      expect(variations).not_to be_empty
      (states + variants).each do |variation|
        expect(variations).to include(variation)
      end
    end
  end

  describe "#find" do
    it "returns a component when the descriptor exactly matches" do
      expect(component.find(component.name)).to be component
      expect(component.find("#{component.name}#bar")).to be false
    end

    it "returns a nested component when it exactly matches" do
      expect(component.find(sub_subcomponent.name)).to be sub_subcomponent
      expect(component.find("#{sub_subcomponent.name}#bar")).to be false
    end

    it "returns a variation when the variation name exactly matches" do
      subcomponent.states.concat(states)
      states.each { |state| state.for = subcomponent.name }
      expect(component.find(states.first.name)).to be states.first
    end

    it "returns a variation that is declared as an instance member" do
      subcomponent.states.concat(states)
      states.each { |state| state.for = subcomponent.name }
      expect(component.find("#{subcomponent.name}##{states.first.name}")).to be states.first
    end

    it "doesn't return a variation unless the symbol name matches" do
      subcomponent.states.concat(states)
      expect(component.find("qux##{states.first.name}")).to be false
    end
  end

  describe "#summary" do
    let(:summary) { component.summary }

    it "preserves the symbol_id, name, variations, and subcomponents" do
      expect(summary).to be_a described_class
      expect(summary.name).to eq component.name
      expect(summary.symbol_id).to eq component.symbol_id
      expect(summary.variations).to eq component.variations.map(&:summary)
      expect(summary.subcomponents).to eq component.subcomponents.map(&:summary)
    end
  end
end
