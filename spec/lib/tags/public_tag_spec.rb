require "spec_helper"

describe Docks::Tags::Public do
  subject { Docks::Tags::Public.instance }

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
    let(:symbol) { Docks::Containers::Symbol.new(public: true) }

    before :each do
      subject.process(symbol)
    end

    it "sets the access attribute to be public" do
      expect(symbol.access).to be Docks::Types::Access::PUBLIC
    end

    it "removes the public attribute" do
      expect(symbol.public).to be nil
    end
  end
end
