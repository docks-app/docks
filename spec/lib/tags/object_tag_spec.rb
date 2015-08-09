require "spec_helper"

describe Docks::Tags::Object do
  subject { Docks::Tags::Object.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "does not allow multiple tags per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }

    it "sets the type of the symbol to 'object'" do
      symbol[subject.name] = ""
      subject.process(symbol)
      expect(symbol[subject.name]).to be true
      expect(symbol.type).to eq "Object"
    end
  end
end
