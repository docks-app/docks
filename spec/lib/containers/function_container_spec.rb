require "spec_helper"

describe Docks::Containers::Function do
  let(:instance_method) do
    described_class.new(name: "foo", static: false, method: true, for: "Foo")
  end

  let(:static_method) do
    described_class.new(name: "bar", static: true, method: true, for: "Foo")
  end

  let(:function) do
    described_class.new(name: "baz")
  end

  describe "#static?" do
    it "returns true for a static method" do
      expect(instance_method.static?).to be false
      expect(static_method.static?).to be true
    end
  end

  describe "#instance?" do
    it "returns true for an instance method" do
      expect(instance_method.instance?).to be true
      expect(static_method.instance?).to be false
    end
  end

  describe "#method?" do
    it "is a method when it has a for attribute" do
      expect(function.method?).to be false
      expect(instance_method.method?).to be true
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

  describe "#summary" do
    it "preserves the symbol_id, name, static and method status" do
      [static_method, instance_method, function].each do |func|
        summary = func.summary

        expect(summary).to be_a described_class
        expect(summary.name).to eq func.name
        expect(summary.symbol_id).to eq func.symbol_id
        expect(summary.method?).to eq func.method?
        expect(summary.static?).to eq func.static?
      end
    end
  end

  describe "#find" do
    it "finds the function if it's not a method and the symbol matches" do
      expect(function.find(function.name)).to be function
      expect(function.find(static_method.name)).to be false
      expect(static_method.find(static_method.name)).to be false
      expect(instance_method.find(instance_method.name)).to be false
    end

    it "finds the function if it's a static method and the name matches" do
      expect(function.find("foo.#{function.name}")).to be false
      expect(static_method.find("foo.#{static_method.name}")).to be static_method
      expect(static_method.find("foo.#{instance_method.name}")).to be false
      expect(instance_method.find("foo.#{instance_method.name}")).to be false
    end

    it "finds the function if it's an instance method and the name matches" do
      expect(function.find("foo##{function.name}")).to be false
      expect(static_method.find("foo##{static_method.name}")).to be false
      expect(instance_method.find("foo##{instance_method.name}")).to be instance_method
      expect(static_method.find("foo##{static_method.name}")).to be false
    end
  end
end
