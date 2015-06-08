require "spec_helper"

describe Docks::Containers::Function do
  let(:static_function) do
    {
      name: "foo",
      static: true
    }
  end

  let(:instance_function) do
    {
      name: "bar",
      static: false
    }
  end

  describe "#static?" do
    it "returns true for a static method" do
      expect(described_class.new(static_function).static?).to be true
      expect(described_class.new(instance_function).static?).to be false
    end
  end

  describe "#instance?" do
    it "returns true for an instance method" do
      expect(described_class.new(static_function).instance?).to be false
      expect(described_class.new(instance_function).instance?).to be true
    end
  end

  describe "#method?" do
    it "is a method when it has a for attribute" do
      expect(described_class.new(name: "foo", method: true).method?).to be true
      expect(described_class.new(name: "foo").method?).to be false
    end
  end

  describe "#symbol_id" do
    let(:function) { described_class.new(name: "foo") }
    let(:factory) { Docks::Containers::Factory.new(name: "Foo") }

    it "returns the default if the function is not a method" do
      expect(function.symbol_id).to eq "function-#{function.name}"
    end

    it "indicates it's a method and adds the classlike's name if it is a method" do
      factory.add_member(function)
      expect(function.symbol_id).to eq "method-#{function.for}-#{function.name}"
    end

    it "indicates that it's static if appropriate" do
      factory.add_member(function)
      function.static = true
      expect(function.symbol_id).to eq "method-static-#{function.for}-#{function.name}"
    end
  end
end
