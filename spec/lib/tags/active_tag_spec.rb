require "spec_helper"

describe Docks::Tags::Active do
  subject { Docks::Tags::Active.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "boolean-ifies the parsed value" do
      symbol = Docks::Containers::Symbol.new
      symbol[subject.name] = "false"

      expect(subject).to receive(:stringy_boolean).and_call_original
      subject.process(symbol)
      expect(symbol[subject.name]).to be false
    end
  end
end
