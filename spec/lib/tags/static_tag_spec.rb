require "spec_helper"

describe Docks::Tags::Static do
  subject { Docks::Tags::Static.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "sets the class to be true when it exists at all" do
      symbol = Docks::Containers::Symbol.new

      symbol[subject.name] = ""
      subject.process(symbol)
      expect(symbol[subject.name]).to be true

      symbol[subject.name] = "static"
      subject.process(symbol)
      expect(symbol[subject.name]).to be true
    end
  end
end
