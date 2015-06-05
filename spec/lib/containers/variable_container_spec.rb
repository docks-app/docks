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

  describe "#method?" do
    it "is a method when it has a for attribute" do
      expect(described_class.new(name: "foo", for: "Foo").property?).to be true
      expect(described_class.new(name: "foo").property?).to be false
    end
  end

  describe "#symbol_id" do
    let(:property) { described_class.new(name: "foo") }

    it "returns the default if the property is not a property" do
      expect(property.symbol_id).to eq "variable-#{property.name}"
    end

    it "indicates it's a property and adds the classlike's name if it is a property" do
      property.for = "Foo"
      expect(property.symbol_id).to eq "property-#{property.for}-#{property.name}"
    end

    it "indicates that it's static if appropriate" do
      property.for = "Foo"
      property.static = true
      expect(property.symbol_id).to eq "property-static-#{property.for}-#{property.name}"
    end
  end
end
