require "spec_helper"

describe Docks::Containers::PatternLibrary do
  subject { described_class.new }

  let(:name) { "button" }

  let(:pattern_one) do
    Docks::Containers::Pattern.new(name: name)
  end

  let(:factory) do
    Docks::Containers::Factory.new(name: "CodeBlock")
  end

  let(:pattern_two) do
    pattern = Docks::Containers::Pattern.new(name: "code_block")
    pattern.add(:script, factory)
    pattern
  end

  describe "#<<" do
    it "adds a pattern" do
      subject << pattern_one
      expect(subject.has_pattern?(name)).to be true
    end
  end

  describe "#[]" do
    it "returns nil for a name that doesn't match any patterns" do
      expect(subject["foo"]).to be nil
    end

    it "returns a pattern whose name matches the passed name" do
      subject << pattern_two
      subject << pattern_one
      expect(subject[pattern_one.name]).to be pattern_one
      expect(subject[pattern_two.name.split("_").join("-")]).to be pattern_two
    end
  end

  describe "#has_pattern?" do
    it "returns false for a pattern that doesn't exist" do
      expect(subject.has_pattern?("foo")).to be false
    end

    it "returns true for a pattern that matches the passed name" do
      subject << pattern_two
      subject << pattern_one
      expect(subject.has_pattern?(pattern_one.name)).to be true
      expect(subject.has_pattern?(pattern_two.name.split("_").join("-"))).to be true
    end
  end

  describe "#group_by" do
    it "groups symbols on the passed attribute" do
      result = {}
      subject << pattern_one
      subject << pattern_two

      subject.group_by(:name) do |name, group|
        result[name] = group
      end

      expect(result).to eq("button" => [pattern_one], "code_block" => [pattern_two])
    end
  end

  describe "#groups" do
    it "groups by each pattern's group" do
      result = {}
      pattern_one.group = "foo"
      pattern_two.group = "foo"
      subject << pattern_one
      subject << pattern_two

      subject.groups do |group_name, group|
        result[group_name] = group
      end

      expect(result).to eq("foo" => [pattern_one, pattern_two])
    end
  end

  describe "#find" do
    before :each do
      subject << pattern_one
      subject << pattern_two
    end

    it "returns false when no pattern matches the passed descriptor" do
      expect(subject.find("foo")).to be false
      expect(subject.find("foo::bar")).to be false
      expect(subject.find("foo#bar")).to be false
    end

    it "finds a pattern with a name matching the passed descriptor" do
      expect(subject.find(pattern_two.name)).to eq OpenStruct.new(pattern: pattern_two, symbol: nil)
    end

    it "finds a pattern with a contained symbol" do
      expect(subject.find("#{pattern_two.name}::CodeBlock")).to eq OpenStruct.new(pattern: pattern_two, symbol: factory)
    end
  end
end
