require "spec_helper"

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
