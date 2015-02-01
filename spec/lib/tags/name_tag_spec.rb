require "spec_helper"

describe Docks::Tags::Name do
  subject { Docks::Tags::Name.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "does not perform any processing" do
      content = "foo"
      expect(subject.process(content)).to eq content
    end
  end
end
