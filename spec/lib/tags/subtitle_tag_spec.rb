require "spec_helper"

describe Docks::Tags::Subtitle do
  subject { Docks::Tags::Subtitle.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end
end
