require "spec_helper"

describe Docks::Tags::DemoType do
  subject { Docks::Tags::DemoType.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "makes sure the value is a valid demo type" do
      symbol = Docks::Containers::Symbol.new
      symbol[subject.name] = Docks::Types::Demo::JOINT

      expect(subject).to receive(:ensure_valid_demo_type).and_call_original
      subject.process(symbol)
      expect(symbol[subject.name]).to be Docks::Types::Demo::JOINT
    end
  end
end
