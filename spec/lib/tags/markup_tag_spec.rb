require "spec_helper"

describe Docks::Tags::Markup do
  subject { Docks::Tags::Markup.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "only allows one description per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "connects multiline content with line breaks" do
      content = ["foo", "bar"]
      expect(subject.process(content)).to eq Docks::Processors::JoinWithLineBreaks.process(content)
    end
  end
end
