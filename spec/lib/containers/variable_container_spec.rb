require "spec_helper"

describe Docks::Containers::Variable do
  let(:variable) do
    described_class.new(name: "foo")
  end

  let(:static_property) do
    described_class.new(name: "bar", static: true, property: true, for: "Foo")
  end

  let(:instance_property) do
    described_class.new(name: "baz", static: false, property: true, for: "Foo")
  end

  describe "#static?" do
    it "returns true for a static method" do
      expect(static_property.static?).to be true
      expect(instance_property.static?).to be false
    end
  end

  describe "#instance?" do
    it "returns true for an instance method" do
      expect(static_property.instance?).to be false
      expect(instance_property.instance?).to be true
    end
  end

  describe "#property?" do
    it "is a method when it has a method attribute" do
      expect(static_property.property?).to be true
      expect(variable.property?).to be false
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

  describe "#summary" do
    it "preserves the symbol_id, name, static and property status" do
      [instance_property, static_property, variable].each do |var|
        summary = var.summary

        expect(summary).to be_a described_class
        expect(summary.name).to eq var.name
        expect(summary.symbol_id).to eq var.symbol_id
        expect(summary.property?).to eq var.property?
        expect(summary.static?).to eq var.static?
      end
    end
  end

  describe "#find" do
    it "finds the variable if it's not a property and the symbol matches" do
      expect(variable.find(variable.name)).to be variable
      expect(variable.find(static_property.name)).to be false
      expect(static_property.find(static_property.name)).to be false
      expect(instance_property.find(instance_property.name)).to be false
    end

    it "finds the variable if it's a static property and the name matches" do
      expect(variable.find("foo.#{variable.name}")).to be false
      expect(static_property.find("foo.#{static_property.name}")).to be static_property
      expect(static_property.find("foo.#{instance_property.name}")).to be false
      expect(instance_property.find("foo.#{instance_property.name}")).to be false
    end

    it "finds the variable if it's an instance property and the name matches" do
      expect(variable.find("foo##{variable.name}")).to be false
      expect(static_property.find("foo##{static_property.name}")).to be false
      expect(instance_property.find("foo##{instance_property.name}")).to be instance_property
      expect(static_property.find("foo##{static_property.name}")).to be false
    end
  end
end
