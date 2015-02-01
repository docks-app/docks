require "spec_helper"

describe Docks::Tags::Variant do
  subject { Docks::Tags::Variant.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end
end
