require "spec_helper"

describe Docks::Containers::PatternLibrary do
  subject { described_class.new }

  let(:name) { "button" }

  describe "#<<" do
    it "adds a pattern" do
      subject << OpenStruct.new(name: name)
      expect(subject.has_pattern?(name)).to be true
    end
  end

  describe "#find" do
    let(:pattern_one) do
      Docks::Containers::Pattern::Summary.new({
        name: "button",
        pattern: {},
        script: [],
        markup: [],
        style: []
      })
    end

    let(:pattern_two) do
      Docks::Containers::Pattern::Summary.new({
        name: "code_block",
        pattern: {},
        script: [{
          name: "CodeBlock",
          symbol_type: Docks::Types::Symbol::FACTORY
        }],
        markup: [],
        style: []
      })
    end

    before :each do
      subject << pattern_one
      subject << pattern_two
    end

    it "returns nil when no pattern matches the passed descriptor" do
      expect(subject.find("foo")).to be nil
      expect(subject.find("foo::bar")).to be nil
      expect(subject.find("foo#bar")).to be nil
    end

    it "finds a pattern with a name matching the passed descriptor" do
      expect(subject.find(pattern_two.name)).to eq OpenStruct.new(pattern: pattern_two, id: "")
    end

    it "finds a pattern with a contained symbol" do
      expect(subject.find("#{pattern_two.name}::CodeBlock")).to eq OpenStruct.new(pattern: pattern_two, id: pattern_two.symbols["CodeBlock"].symbol_id)
    end
  end
end
