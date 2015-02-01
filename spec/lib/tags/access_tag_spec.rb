require "spec_helper"

describe Docks::Tags::Access do
  subject { Docks::Tags::Access.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "allows one of the included access types" do
      Docks::Types::Access.constants.each do |const|
        access_type = Docks::Types::Access.const_get(const)
        expect(subject.process(access_type)).to eq access_type
      end
    end

    it "returns nil when none of the included access types are provided" do
      expect(subject.process("none of your business")).to be nil
    end
  end
end
