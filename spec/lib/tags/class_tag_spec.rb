require "spec_helper"

describe Docks::Tags::Klass do
  subject { Docks::Tags::Klass.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "marks the attribute as true" do
      symbol = Docks::Containers::Symbol.new(name: "foo", class: "")
      Docks::Process.process(symbol)
      expect(symbol[subject.name]).to be true
    end

    it "converts the symbol to be a class container" do
      symbol = Docks::Containers::Function.new(class: "", name: "foo")
      symbol = Docks::Process.process(symbol)

      expect(symbol).to be_a Docks::Containers::Klass
      expect(symbol.symbol_type).to eq Docks::Types::Symbol::CLASS
    end
  end
end
