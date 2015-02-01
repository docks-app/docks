require "spec_helper"

describe Docks::Tags::DemoType do
  subject { Docks::Tags::DemoType.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end
end
