require "spec_helper"

describe Docks::Tags::Helper do
  subject { Docks::Tags::Helper.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "only allows one description per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "connects multiline content with line breaks" do
      helper = ["foo", "bar"]
      symbol = Docks::Containers::Symbol.new(helper: helper.dup)
      subject.process(symbol)
      expect(symbol[subject.name]).to eq helper.join("\n")
    end
  end
end
