require "spec_helper"

describe Docks::Containers::Symbol do
  ACCESS_TYPES = Docks::Types::Access

  subject { described_class.new(name: "foo") }
  let(:access) { Docks::Tags::Access }

  describe "#symbol_type" do
    class Example < described_class
      def self.type; "foo" end
    end

    it "uses the symbol type of the class" do
      expect(subject.symbol_type).to eq described_class.type
      expect(Example.new.symbol_type).to eq Example.type
    end

    it "adds the symbol type to the backing hash" do
      expect(subject.to_h[:symbol_type]).to eq described_class.type
    end
  end

  describe "#private?" do
    it "identifies a private symbol based on its access type" do
      expect(subject.private?).to be false

      subject[access] = ACCESS_TYPES::PUBLIC
      expect(subject.private?).to be false

      subject[access] = ACCESS_TYPES::PRIVATE
      expect(subject.private?).to be true
    end
  end

  describe "#public?" do
    it "identifies a public variable based on its access type" do
      expect(subject.public?).to be true

      subject[access] = ACCESS_TYPES::PUBLIC
      expect(subject.public?).to be true

      subject[access] = ACCESS_TYPES::PRIVATE
      expect(subject.public?).to be false
    end
  end

  describe "#symbol_id" do
    it "creates a symbol_id" do
      expect(subject.symbol_id).to eq "#{subject.symbol_type}-#{subject.name}"
    end

    it "creates a symbol_id that is unique between two symbol types with the same name" do
      descendants = ObjectSpace.each_object(Class).select { |klass| klass < described_class }.sample(2)
      descendants.map! { |descendant| descendant.new(name: "foo") }
      expect(descendants.first.symbol_id).to_not eq descendants.last.symbol_id
    end
  end
end
