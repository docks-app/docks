require "spec_helper"

describe Docks::Tags::Factory do
  subject { Docks::Tags::Factory.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  it "only allows one tag per file" do
    expect(subject.only_one_per_file_allowed?).to be false
  end

  describe "#process" do
    it "converts the symbol to be a class container" do
      symbol = Docks::Containers::Function.new(factory: "", name: "foo")
      symbol = Docks::Process.process(symbol)

      expect(symbol).to be_a Docks::Containers::Factory
      expect(symbol.symbol_type).to eq Docks::Types::Symbol::FACTORY
    end
  end
end
