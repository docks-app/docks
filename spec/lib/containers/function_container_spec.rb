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
      expect(described_class.new(name: "foo", for: "Foo").method?).to be true
      expect(described_class.new(name: "foo").method?).to be false
    end
  end
end
