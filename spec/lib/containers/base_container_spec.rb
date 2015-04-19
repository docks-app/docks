require "spec_helper"

symbol = { foo: "bar" }

describe Docks::Containers::Base do
  subject { Docks::Containers::Base.new(symbol) }

  describe "#method_missing" do
    it "sends the base tag of unrecognized symbols to the initialization hash" do
      expect(Docks::Tags).to receive(:base_tag_name).with(:foo).and_return(:baz)
      expect(symbol).to receive(:[]).with(:baz)
      subject.foo
    end
  end

  describe "#to_json" do
    it "parses the initialization hash as JSON" do
      expect(subject.to_json).to eq symbol.to_json
    end
  end

  describe "#[]" do
    it "accesses the item in the contained hash" do
      expect(subject[:foo]).to eq symbol[:foo]
    end
  end

  describe "#[]=" do
    it "sets the item in the contained hash" do
      expect(subject[:foo] = "baz").to eq "baz"
    end
  end

  describe "#each" do
    it "yields each key-value pair of the hash" do
      symbol[:bar] = "baz"
      subject_with_multiple = Docks::Containers::Base.new(symbol)
      expect { |b| subject_with_multiple.each(&b) }.to yield_successive_args *symbol.each.to_a
    end
  end
end

describe Docks::Containers do
  subject { Docks::Containers }

  describe ".container_for" do
    it "wraps a parse result in the correct container" do
      subject::TOP_LEVEL_SYMBOLS.each do |type|
        container = subject.constants.map { |const| subject.const_get(const) }.select { |const| const.respond_to?(:type) && const.type == type }.first
        expect(subject.container_for(symbol_type: type)).to be container
      end
    end
  end
end
