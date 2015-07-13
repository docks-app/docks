require "spec_helper"

describe Docks::Tags::Method do
  subject { Docks::Tags::Method.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "marks the attribute as true" do
      symbol = Docks::Containers::Symbol.new(name: "foo", method: "")
      Docks::Process.process(symbol)
      expect(symbol[subject.name]).to be true
    end

    it "forces the symbol to be a function type" do
      symbol = Docks::Containers::Symbol.new(name: "foo", method: "")
      symbol = Docks::Process.process(symbol)
      expect(symbol).to be_a Docks::Containers::Function
    end
  end
end
