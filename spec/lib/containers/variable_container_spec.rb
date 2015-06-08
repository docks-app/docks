require "spec_helper"

describe Docks::Containers::Variable do
  let(:static_property) do
    {
      name: "foo",
      static: true
    }
  end

  let(:instance_property) do
    {
      name: "bar",
      static: false
    }
  end

  describe "#static?" do
    it "returns true for a static method" do
      expect(described_class.new(static_property).static?).to be true
      expect(described_class.new(instance_property).static?).to be false
    end
  end

  describe "#instance?" do
    it "returns true for an instance method" do
      expect(described_class.new(static_property).instance?).to be false
      expect(described_class.new(instance_property).instance?).to be true
    end
  end

  describe "#property?" do
    it "is a method when it has a method attribute" do
      expect(described_class.new(name: "foo", property: true).property?).to be true
      expect(described_class.new(name: "foo").property?).to be false
    end
  end

  describe "#symbol_id" do
    let(:property) { described_class.new(name: "foo") }
    let(:factory) { Docks::Containers::Factory.new(name: "Foo") }

    it "returns the default if the property is not a property" do
      expect(property.symbol_id).to eq "variable-#{property.name}"
    end

    it "indicates it's a property and adds the classlike's name if it is a property" do
      factory.add_member(property)
      expect(property.symbol_id).to eq "property-#{factory.name}-#{property.name}"
    end

    it "indicates that it's static if appropriate" do
      property.static = true
      factory.add_member(property)
      expect(property.symbol_id).to eq "property-static-#{factory.name}-#{property.name}"
    end
  end
end
