require "spec_helper"

describe Docks::Tags::Property do
  subject { Docks::Tags::Property.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "marks the attribute as true" do
      symbol = Docks::Containers::Symbol.new(name: "foo", property: "")
      Docks::Process.process(symbol)
      expect(symbol[subject.name]).to be true
    end

    it "forces the symbol to be a variable type" do
      symbol = Docks::Containers::Symbol.new(name: "foo", property: "")
      symbol = Docks::Process.process(symbol)
      expect(symbol).to be_a Docks::Containers::Variable
    end
  end
end
