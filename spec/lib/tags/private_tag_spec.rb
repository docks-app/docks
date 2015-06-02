require "spec_helper"

describe Docks::Tags::Private do
  subject { Docks::Tags::Private.instance }

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
    describe "#process" do
      let(:symbol) { Docks::Containers::Symbol.new(private: true) }

      before :each do
        subject.process(symbol)
      end

      it "sets the access attribute to be private" do
        expect(symbol.access).to be Docks::Types::Access::PRIVATE
      end

      it "removes the private attribute" do
        expect(symbol.private).to be nil
      end
    end
  end
end
