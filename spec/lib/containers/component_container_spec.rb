require "spec_helper"

describe Docks::Containers::Component do
  subject { Docks::Containers::Component }

  before :each do
    Docks::Tag.register_bundled_tags
  end

  describe "#has_demo?" do
    it "has a demo when it has non-empty markup" do
      expect(subject.new(markup: "<p>Hi!</p>").has_demo?).to be true
    end

    it "has a demo when it has non-empty helper" do
      expect(subject.new(helper: "<p><%= foo %></p>").has_demo?).to be true
    end

    it "doesn't have a demo when there is no markup or helper" do
      expect(subject.new(foo: "bar").has_demo?).to be false
    end

    it "doesn't have a demo when the markup is empty" do
      expect(subject.new(markup: "").has_demo?).to be false
    end

    it "doesn't have a demo when the helper is empty" do
      expect(subject.new(helper: "").has_demo?).to be false
    end
  end

  describe "#variations" do
    let(:states) { [{ foo: "bar" }, { baz: "qux" }] }
    let(:variants) { [{ bar: "foo" }, { qux: "baz" }] }

    it "has no variations when there are no states or variants" do
      component = subject.new({})
      expect(component.variations).to be_empty
    end

    it "has variations when there are only states" do
      component = subject.new(state: states)
      variations = component.variations

      expect(variations).not_to be_empty
      states.each do |state|
        expect(variations).to include(state)
      end
    end

    it "has variations when there are only variants" do
      component = subject.new(variant: variants)
      variations = component.variations

      expect(variations).not_to be_empty
      variants.each do |variant|
        expect(variations).to include(variant)
      end
    end

    it "has variations when there are states and variants" do
      component = subject.new(state: states, variant: variants)
      variations = component.variations

      expect(variations).not_to be_empty
      (states + variants).each do |variation|
        expect(variations).to include(variation)
      end
    end
  end
end
