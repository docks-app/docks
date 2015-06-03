require "spec_helper"

describe Docks::Naming::Conventions::SUIT do
  subject { described_class.instance }

  describe "#base_component" do
    it "removes variation details" do
      expect(subject.base_component("Foo--baz")).to eq "Foo"
    end

    it "removes subcomponent details" do
      expect(subject.base_component("Foo-baz")).to eq "Foo"
    end

    it "removes variation and state details" do
      expect(subject.base_component("Foo--bar")).to eq "Foo"
    end
  end

  describe "#base_component?" do
    it "identifies a base component name correctly" do
      expect(subject.base_component?("Foo")).to be true
      expect(subject.base_component?("Foo--bar")).to be false
      expect(subject.base_component?("Foo-bar")).to be false
    end
  end

  describe "#component" do
    it "removes variation details" do
      expect(subject.component("Foo--bar")).to eq "Foo"
    end

    it "preserves subcomponents" do
      expect(subject.component("Foo-bar")).to eq "Foo-bar"
    end
  end

  describe "#parent_component" do
    it "goes one level up" do
      expect(subject.parent_component("Foo")).to eq "Foo"
      expect(subject.parent_component("Foo-bar")).to eq "Foo"
      expect(subject.parent_component("Foo-bar-baz")).to eq "Foo-bar"
    end

    it "strips away variations" do
      expect(subject.parent_component("Foo--bar")).to eq "Foo"
      expect(subject.parent_component("Foo-bar--baz")).to eq "Foo"
    end
  end

  describe "state?" do
    it "identifies disconnected states" do
      expect(subject.state?("is-active")).to be true
    end

    it "identifies states connected to component names" do
      expect(subject.state?("Foo--is-active")).to be true
    end

    it "doesn't identify states when the component has is- in the name" do
      expect(subject.state?("Foois-bar")).to be false
    end
  end

  describe "variant?" do
    it "identifies variants" do
      expect(subject.variant?("Foo--bar")).to be true
    end

    it "doesn't identify a component" do
      expect(subject.variant?("Foo")).to be false
      expect(subject.variant?("Foo-bar")).to be false
    end

    it "doesn't identify variants when it is actually a connected state" do
      expect(subject.variant?("Foo--is-bar")).to be false
    end
  end

  describe "#disconnected_state?" do
    it "checks whether a state is not connected to the base class name" do
      expect(subject.disconnected_state?("is-active")).to be true
      expect(subject.disconnected_state?("Component")).to be false
      expect(subject.disconnected_state?("Component--is-active")).to be false
    end
  end

  describe "#clean_variation_name" do
    it "doesn't prepend the base class name for disconnected states" do
      expect(subject.clean_variation_name("is-active", "Foo")).to eq "is-active"
    end

    it "prepends the base class name and -- for non-disconnected-states" do
      expect(subject.clean_variation_name("bar", "Foo")).to eq "Foo--bar"
    end

    it "prepends the base class name for variations starting with --" do
      expect(subject.clean_variation_name("--bar", "Foo")).to eq "Foo--bar"
      expect(subject.clean_variation_name("--is-active", "Foo")).to eq "Foo--is-active"
    end

    it "does nothing for fully-formed variations" do
      expect(subject.clean_variation_name("Foo--bar", "Foo")).to eq "Foo--bar"
      expect(subject.clean_variation_name("Foo--is-active", "Foo")).to eq "Foo--is-active"
    end
  end
end
