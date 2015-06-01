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
    it "sets the class to be true when it exists at all" do
      symbol = Docks::Containers::Symbol.new

      symbol[subject.name] = ""
      subject.process(symbol)
      expect(symbol[subject.name]).to be true

      symbol[subject.name] = "Factory"
      subject.process(symbol)
      expect(symbol[subject.name]).to be true
    end
  end
end
