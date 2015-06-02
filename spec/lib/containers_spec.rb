require "spec_helper"

describe Docks::Containers do
  subject { Docks::Containers }

  describe ".container_for" do
    it "wraps a parse result in the correct container" do
      subject::TOP_LEVEL_SYMBOLS.each do |type|
        container = subject.constants.map { |const| subject.const_get(const) }.select { |const| const.respond_to?(:type) && const.type == type }.first
        expect(subject.container_for(type)).to be container
      end
    end

    it "returns the base symbol if no type was passed" do
      expect(subject.container_for).to be Docks::Containers::Symbol
    end

    it "returns the base symbol for an unrecognized type" do
      expect(subject.container_for("foo")).to be Docks::Containers::Symbol
    end
  end
end
