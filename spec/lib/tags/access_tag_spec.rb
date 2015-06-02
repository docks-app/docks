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
    let(:symbol) { Docks::Containers::Symbol.new }

    it "allows one of the included access types" do
      Docks::Types::Access.constants.each do |const|
        access_type = Docks::Types::Access.const_get(const)
        symbol.access = access_type
        subject.process(symbol)
        expect(symbol.access).to eq access_type
      end
    end

    it "sets the access to public for any non-recognized access type" do
      symbol.access = "foo"
      subject.process(symbol)
      expect(symbol.access).to eq Docks::Types::Access::PUBLIC
    end
  end
end
