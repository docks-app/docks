require "spec_helper"

describe Docks::Descriptor do
  subject { described_class }

  let(:symbol) { "CodeBlock" }
  let(:pattern) { "code-block" }
  let(:instance_member) { "toggle" }
  let(:static_member) { "for" }
  let(:local_member) { "CodeCaches" }

  describe "#initialize" do
    it "returns something that is already a descriptor" do
      descriptor = subject.new(symbol)
      expect(subject.new(descriptor)).to be descriptor
    end

    it "identifies a symbol name" do
      expect(subject.new(symbol).symbol).to eq symbol
    end

    it "identifies a pattern instead of a symbol if the pattern assumption option is passed" do
      descriptor = subject.new(pattern, assume: :pattern)
      expect(descriptor.pattern).to eq pattern
      expect(descriptor.symbol).to be nil
    end

    it "identifies a pattern name" do
      result = subject.new("#{pattern}::#{symbol}")
      expect(result.pattern).to eq Docks.pattern_id(pattern)
      expect(result.symbol).to eq symbol
    end

    it "identifies an instance member" do
      result = subject.new("#{symbol}##{instance_member}")
      expect(result.symbol).to eq symbol
      expect(result.instance_member).to eq instance_member
    end

    it "identifies a static member" do
      result = subject.new("#{symbol}.#{static_member}")
      expect(result.symbol).to eq symbol
      expect(result.static_member).to eq static_member
    end

    it "identifies a local member" do
      result = subject.new("#{symbol}~#{local_member}")
      expect(result.symbol).to eq symbol
      expect(result.local_member).to eq local_member
    end
  end

  describe "#member?" do
    it "is not a member when it has no member information" do
      expect(subject.new(symbol).member?).to be false
    end

    it "is a member when it has member information" do
      expect(subject.new("#{symbol}##{instance_member}").member?).to be true
      expect(subject.new("#{symbol}.#{static_member}").member?).to be true
      expect(subject.new("#{symbol}~#{local_member}").member?).to be true
    end
  end

  describe "member" do
    it "returns any member" do
      expect(subject.new(symbol).member).to be nil
      expect(subject.new("#{symbol}##{instance_member}").member).to eq instance_member
      expect(subject.new("#{symbol}.#{static_member}").member).to eq static_member
      expect(subject.new("#{symbol}~#{local_member}").member).to eq local_member
    end
  end
end
