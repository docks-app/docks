require "spec_helper"

describe Docks::Tags::DemoType do
  subject { Docks::Tags::DemoType.instance }

  it "correctly allows one of the included demo types" do
    Docks::Types::Demo.constants.each do |const|
      access_type = Docks::Types::Demo.const_get(const)
      expect(subject.process(access_type)).to eq access_type
    end
  end

  it "correctly returns the Docks::Types::Demo::DONE type when none of the included demo types are provided" do
    expect(subject.process("none of your business")).to be Docks::Types::Demo::NONE
  end
end
