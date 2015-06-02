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

  it "can be included in parse results" do
    expect(subject.parseable?).to be true
  end
end
