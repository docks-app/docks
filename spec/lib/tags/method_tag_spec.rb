require "spec_helper"

describe Docks::Tags::Method do
  subject { Docks::Tags::Method.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  it "only allows one tag per file" do
    expect(subject.only_one_per_file_allowed?).to be false
  end

  describe "#process" do
    it "sets the method attribute to be true when it exists at all" do
      expect(subject.process("")).to be true
      expect(subject.process("myMethod")).to be true
    end
  end
end
