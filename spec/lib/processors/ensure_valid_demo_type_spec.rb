require 'spec_helper'

describe Docks::Processors::EnsureValidDemoType do
  subject { Docks::Processors::EnsureValidDemoType }

  it "allows one of the included demo types" do
    Docks::Types::Demo.constants.each do |const|
      demo_type = Docks::Types::Demo.const_get(const)
      expect(subject.process(demo_type)).to eq demo_type
    end
  end

  it "returns the default type when none of the included demo types are provided" do
    expect(subject.process("invalid")).to be Docks::Types::Demo::DEFAULT
  end
end
