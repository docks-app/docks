require "spec_helper"

describe Docks::Tags::Pattern do
  subject { Docks::Tags::Pattern.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  it "only allows one tag per file" do
    expect(subject.only_one_per_file_allowed?).to be true
  end

  describe "#process" do
    it "does not perform any processing" do
      content = "foo"
      expect(subject.process(content)).to eq content
    end
  end
end
