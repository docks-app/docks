require "spec_helper"

symbol = OpenStruct.new(foo: "bar")

describe Docks::Containers::Base do
  subject { Docks::Containers::Base.new(symbol) }

  describe "#method_missing" do
    it "sends the base tag of unrecognized symbols to the initialization hash" do
      expect(Docks::Tag).to receive(:default_tag_name).with(:foo).and_return(:baz)
      expect(symbol).to receive(:baz)
      subject.foo
    end
  end

  describe "#to_json" do
    it "parses the initialization hash as JSON" do
      expect(subject.to_json).to eq symbol.to_json
    end
  end
end

describe Docks::Containers do
  subject { Docks::Containers }

  describe ".container_for" do
    it "wraps a parse result in the correct container" do
      subject::TOP_LEVEL_SYMBOLS.each do |type|
        container = subject.constants.map { |const| subject.const_get(const) }.select { |const| const.respond_to?(:type) && const.type == type }.first
        expect(subject.container_for(OpenStruct.new(symbol_type: type))).to be container
      end
    end
  end
end
