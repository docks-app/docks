require "spec_helper"

describe Docks::Tags::State do
  subject { Docks::Tags::State.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end
end
