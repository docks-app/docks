require "spec_helper"

describe Docks::Tags::Require do
  subject { Docks::Tags::Require.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  it "allows multiple tags per line" do
    expect(subject.multiple_per_line_allowed?).to be true
  end
end
