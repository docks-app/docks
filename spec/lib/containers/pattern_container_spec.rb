require "spec_helper"

now = Date.parse("1991-01-11")
name = :button
title = "UI Button"
pattern_block = { title: title, symbol_type: Docks::Types::Symbol::PATTERN }

describe Docks::Containers::Pattern do
  subject { Docks::Containers::Pattern }

  before :each do
    Docks::Tag.register_bundled_tags
  end

  let(:simple_parse_results) do
    {
      files: [],
      name: name,
      modified: now.to_s,
      pattern: Hash.new,

      script: [],
      markup: [],
      style: []
    }
  end

  let(:complex_parse_results) do
    {
      files: [],
      name: name,
      modified: now.to_s,
      pattern: pattern_block,

      script: [Hash.new],
      markup: [Hash.new],
      style: [Hash.new]
    }
  end

  describe "#to_s" do
    it "stringifies the parse results" do
      pattern = subject.new(complex_parse_results)
      expect(pattern.to_s).to eq complex_parse_results.to_s
    end
  end

  describe "#to_json" do
    it "returns the JSON dump of the parse results" do
      pattern = subject.new(complex_parse_results)
      expect(pattern.to_json).to eq complex_parse_results.to_json
    end
  end

  describe "#modified" do
    it "is the parsed date of the modification date in the parse results" do
      pattern = subject.new(simple_parse_results)
      expect(pattern.modified).to eq now
    end
  end

  describe "#name" do
    it "is the name of the parse results as a string" do
      pattern = subject.new(simple_parse_results)
      expect(pattern.name).to eq name.to_s
    end
  end

  describe "#title" do
    it "is the name of the parse results as a string if no pattern block exists" do
      pattern = subject.new(simple_parse_results)
      expect(pattern.title).to eq name.to_s
    end

    it "is the title specified in the pattern block if it exists" do
      pattern = subject.new(complex_parse_results)
      expect(pattern.title).to eq title
    end
  end

  describe "#method_missing" do
    it "delegates missing methods to the pattern block" do
      pattern = subject.new(complex_parse_results)
      expect(Docks::Tag).to receive(:default_tag_name).with(:foo).and_return(:foo)
      expect(pattern_block).to receive(:[]).with(:foo)
      pattern.foo
    end
  end

  describe "#has_markup?" do
    it "has no markup when there are no markup or style results" do
      pattern = subject.new(simple_parse_results)
      expect(pattern.has_markup?).to be false
    end

    it "has markup when there are both markup and style results" do
      pattern = subject.new(complex_parse_results)
      expect(pattern.has_markup?).to be true
    end

    it "has markup when there are only markup results" do
      complex_parse_results[:style] = []
      pattern = subject.new(complex_parse_results)
      expect(pattern.has_markup?).to be true
    end

    it "has markup when there are only style results" do
      complex_parse_results[:markup] = []
      pattern = subject.new(complex_parse_results)
      expect(pattern.has_markup?).to be true
    end
  end

  describe "#has_behavior?" do
    it "has no markup when there are no script results" do
      pattern = subject.new(simple_parse_results)
      expect(pattern.has_markup?).to be false
    end

    it "has behavior when there are script results" do
      pattern = subject.new(complex_parse_results)
      expect(pattern.has_markup?).to be true
    end
  end

  describe "container associations" do
    it "includes a method to access all symbols of a given type" do
      Docks::Containers::TOP_LEVEL_SYMBOLS.each do |symbol|
        symbol_instance = { symbol_type: symbol }
        simple_parse_results[:script] = [symbol_instance]
        pattern = subject.new(simple_parse_results)

        results_of_symbol = pattern.send(symbol.pluralize.to_sym)
        expect(results_of_symbol.length).to be 1
        expect(results_of_symbol.first.class.type).to eq symbol
      end
    end

    it "includes only the set of symbols of a given type matching the passed options" do
      Docks::Containers::TOP_LEVEL_SYMBOLS.each do |symbol|
        symbol_instance = { symbol_type: symbol }
        simple_parse_results[:script] = [symbol_instance]
        pattern = subject.new(simple_parse_results)

        results_of_symbol = pattern.send(symbol.pluralize.to_sym, exclude: :script)
        expect(results_of_symbol.length).to be 0

        results_of_symbol = pattern.send(symbol.pluralize.to_sym, include: :script)
        expect(results_of_symbol.length).to be 1
        expect(results_of_symbol.first.class.type).to eq symbol

        results_of_symbol = pattern.send(symbol.pluralize.to_sym, exclude: :style)
        expect(results_of_symbol.length).to be 1
        expect(results_of_symbol.first.class.type).to eq symbol
      end
    end

    it "wraps subcomponents in a container" do
      subcomponent = { foo: "bar" }
      component = { subcomponents: [subcomponent], symbol_type: Docks::Types::Symbol::COMPONENT }
      simple_parse_results[:script] = [component]
      pattern = Docks::Containers::Pattern.new(simple_parse_results)
      expect(pattern.components.first.subcomponents.first).to be_a Docks::Containers::Component
    end
  end

  describe "#demos" do
    it "creates a demo for each component that needs one" do
      component_one = { symbol_type: Docks::Types::Symbol::COMPONENT, name: "foo", markup: "<p>Hi</p>" }
      component_two = { symbol_type: Docks::Types::Symbol::COMPONENT, name: "bar" }

      simple_parse_results[:style] = [component_one, component_two]
      pattern = subject.new(simple_parse_results)

      expect(pattern.demos.length).to be 1
      expect(pattern.demos.first.component.name).to eq component_one[:name]
    end
  end

  describe "#demo_for" do
    it "sends back the demo with a name that matches the one passed" do
      component = { symbol_type: Docks::Types::Symbol::COMPONENT, name: "foo", markup: "<p>Hi</p>" }
      simple_parse_results[:style] = [component]
      pattern = subject.new(simple_parse_results)
      expect(pattern.demo_for("foo")).not_to be nil
    end

    it "sends back nothing when there exists no demo matching the passed name" do
      component = { symbol_type: Docks::Types::Symbol::COMPONENT, name: "foo", markup: "<p>Hi</p>" }
      simple_parse_results[:style] = [component]
      pattern = subject.new(simple_parse_results)
      expect(pattern.demo_for("bar")).to be nil
    end
  end
end
