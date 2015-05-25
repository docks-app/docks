require "spec_helper"

describe Docks::Naming do
  subject { described_class }

  let(:symbol) { "CodeBlock" }
  let(:pattern) { "code-block" }
  let(:instance_member) { "toggle" }
  let(:static_member) { "for" }
  let(:local_member) { "CodeCaches" }

  describe ".parse_descriptor" do
    it "identifies a symbol name" do
      expect(subject.parse_descriptor(symbol)).to eq symbol: symbol
    end

    it "identifies a pattern name" do
      expect(subject.parse_descriptor("#{pattern}::#{symbol}")).to eq pattern: Docks::Group.group_identifier(pattern).to_s, symbol: symbol
    end

    it "identifies an instance member" do
      expect(subject.parse_descriptor("#{symbol}##{instance_member}")).to eq symbol: symbol, instance_member: instance_member
    end

    it "identifies a static member" do
      expect(subject.parse_descriptor("#{symbol}.#{static_member}")).to eq symbol: symbol, static_member: static_member
    end

    it "identifies a local member" do
      expect(subject.parse_descriptor("#{symbol}~#{local_member}")).to eq symbol: symbol, local_member: local_member
    end
  end
end
