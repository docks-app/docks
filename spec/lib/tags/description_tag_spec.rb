require "spec_helper"

describe Docks::Tags::Description do
  subject { Docks::Tags::Description.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "only allows one description per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "connects multiline content with smart line breaks" do
      content = ["foo", "bar"]
      expect(subject.process(content)).to eq Docks::Processors::JoinWithSmartLineBreaks.process(content)
    end
  end
end
