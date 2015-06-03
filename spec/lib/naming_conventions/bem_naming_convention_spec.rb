require "spec_helper"

describe Docks::Naming::Conventions::BEM do
  subject { described_class.instance }

  describe "#base_component" do
    it "removes variation details" do
      expect(subject.base_component("foo--bar")).to eq "foo"
    end

    it "removes subcomponent details" do
      expect(subject.base_component("foo__bar")).to eq "foo"
    end

    it "removes variation and state details" do
      expect(subject.base_component("foo--bar__baz--qux")).to eq "foo"
    end
  end

  describe "#base_component?" do
    it "identifies a base component name correctly" do
      expect(subject.base_component?("foo")).to be true
      expect(subject.base_component?("foo--bar")).to be false
      expect(subject.base_component?("foo__bar")).to be false
    end
  end

  describe "#component" do
    it "removes variation details" do
      expect(subject.component("foo--bar")).to eq "foo"
    end

    it "preserves subcomponents" do
      expect(subject.component("foo__bar")).to eq "foo__bar"
    end

    it "preserves the lowest subcomponent and strips all levels of variation" do
      expect(subject.component("foo--bar__baz--qux__foo--bar")).to eq "foo__baz__foo"
    end
  end

  describe "#parent_component" do
    it "goes one level up" do
      expect(subject.parent_component("foo")).to eq "foo"
      expect(subject.parent_component("foo__bar")).to eq "foo"
      expect(subject.parent_component("foo__bar__baz")).to eq "foo__bar"
    end

    it "strips away variations" do
      expect(subject.parent_component("foo--bar")).to eq "foo"
      expect(subject.parent_component("foo__bar--baz")).to eq "foo"
      expect(subject.parent_component("foo--fuzz__bar--baz__quz")).to eq "foo__bar"
    end
  end

  describe "state?" do
    it "identifies disconnected states" do
      expect(subject.state?("is-active")).to be true
    end

    it "identifies states connected to component names" do
      expect(subject.state?("foo--is-active")).to be true
    end

    it "doesn't identify states when the component has is- in the name" do
      expect(subject.state?("foois-bar")).to be false
    end
  end

  describe "variant?" do
    it "identifies variants" do
      expect(subject.variant?("foo--bar")).to be true
    end

    it "doesn't identify a component" do
      expect(subject.variant?("foo")).to be false
      expect(subject.variant?("foo__bar")).to be false
    end

    it "doesn't identify variants when it is actually a connected state" do
      expect(subject.variant?("foo--is-bar")).to be false
    end
  end

  describe "#disconnected_state?" do
    it "checks whether a state is not connected to the base class name" do
      expect(subject.disconnected_state?("is-active")).to be true
      expect(subject.disconnected_state?("component")).to be false
      expect(subject.disconnected_state?("component--is-active")).to be false
    end
  end

  describe "#clean_variation_name" do
    it "doesn't prepend the base class name for disconnected states" do
      expect(subject.clean_variation_name("is-active", "foo")).to eq "is-active"
    end

    it "prepends the base class name and -- for non-disconnected-states" do
      expect(subject.clean_variation_name("bar", "foo")).to eq "foo--bar"
    end

    it "prepends the base class name for variations starting with --" do
      expect(subject.clean_variation_name("--bar", "foo")).to eq "foo--bar"
      expect(subject.clean_variation_name("--is-active", "foo")).to eq "foo--is-active"
    end

    it "does nothing for fully-formed variations" do
      expect(subject.clean_variation_name("foo--bar", "foo")).to eq "foo--bar"
      expect(subject.clean_variation_name("foo--is-active", "foo")).to eq "foo--is-active"
    end
  end
end
