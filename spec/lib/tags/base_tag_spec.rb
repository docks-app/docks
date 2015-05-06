require "spec_helper"

describe Docks::Tags::Base do
  subject { Docks::Tags::Base.instance }

  it "has no synonyms by default" do
    expect(subject.synonyms).to eq []
  end

  it "is multiline by default" do
    expect(subject.multiline?).to be true
  end

  it "allows only one tag per block by default" do
    expect(subject.multiple_allowed?).to be false
  end

  it "returns the passed content when processing by default" do
    content = "foo"
    expect(subject.process(content)).to eq content
  end
end
