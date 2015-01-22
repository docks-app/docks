require "spec_helper"

describe Docks::Tags::Access do
  subject { Docks::Tags::Access.instance }

  it "correctly allows one of the included access types" do
    [
      Docks::Types::Access::PUBLIC,
      Docks::Types::Access::PRIVATE
    ].each do |access_type|
      expect(subject.process(access_type)).to eq access_type
    end
  end

  it "correctly returns nil when none of the included access types are provided" do
    expect(subject.process("none of your business")).to be nil
  end
end
