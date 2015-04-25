require "spec_helper"

describe Docks::Containers::Function do
  subject { Docks::Containers::Function }

  let(:static_function) do
    {
      type: Docks::Types::Symbol::FUNCTION,
      name: "foo",
      static: true
    }
  end

  let(:instance_function) do
    {
      type: Docks::Types::Symbol::FUNCTION,
      name: "bar",
      static: false
    }
  end

  describe "#static?" do
    it "returns true for a static method" do
      expect(subject.new(static_function).static?).to be true
      expect(subject.new(instance_function).static?).to be false
    end
  end

  describe "#instance?" do
    it "returns true for an instance method" do
      expect(subject.new(static_function).instance?).to be false
      expect(subject.new(instance_function).instance?).to be true
    end
  end
end
