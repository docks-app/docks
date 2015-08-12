require "spec_helper"

describe Docks::Containers::Variable do
  let(:variable) do
    described_class.new(name: "foo")
  end

  let(:static_property) do
    described_class.new(name: "bar", static: true, property: true)
  end

  let(:instance_property) do
    described_class.new(name: "baz", static: false, property: true)
  end

  let(:factory) do
    Docks::Containers::Factory.new(name: "Foo")
  end

  before(:each) do
    factory.add_members(instance_property, static_property)
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
    it "returns the default if the variable is not a property" do
      expect(variable.symbol_id).to eq "variable-#{variable.name}"
    end

    it "indicates it's a property and adds the classlike's name if it is a property" do
      expect(instance_property.symbol_id).to eq "property-#{factory.name}-#{instance_property.name}"
    end

    it "indicates that it's static if appropriate" do
      expect(static_property.symbol_id).to eq "property-static-#{factory.name}-#{static_property.name}"
    end
  end

  describe "#to_descriptor" do
    let(:pattern) { Docks::Containers::Pattern.new(name: "foo") }

    it "returns the super descriptor if not a property" do
      expect(variable.to_descriptor).to eq variable.name

      pattern.add(:script, variable)
      expect(variable.to_descriptor).to eq "#{pattern.name}::#{variable.name}"
    end

    it "returns the proper instance property descriptor" do
      pattern.add(:script, factory)
      expect(instance_property.to_descriptor).to eq "#{factory.to_descriptor}##{instance_property.name}"
    end

    it "returns the proper static property descriptor" do
      pattern.add(:script, factory)
      expect(static_property.to_descriptor).to eq "#{factory.to_descriptor}.#{static_property.name}"
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
