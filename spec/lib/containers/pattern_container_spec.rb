require "spec_helper"

describe Docks::Containers::Pattern do
  before :each do
    Docks::Tags.register_bundled_tags
  end

  let(:name) { "button" }
  let(:title) { "UI Button" }
  let(:now) { Date.parse("1991-01-11") }
  let(:pattern_symbol) { Docks::Containers::Symbol.new(pattern: title) }
  let(:pattern) { described_class.new(name: name) }

  describe "#name" do
    it "is the name of the pattern during initialization" do
      expect(pattern.name).to eq name
    end
  end

  describe "#title" do
    it "is the capitalized name of the pattern if pattern block has been added" do
      expect(pattern.title).to eq name.capitalize
    end

    it "is the title specified in the pattern block if it has been added" do
      pattern.add(:style, pattern_symbol)
      expect(pattern.title).to eq title
    end
  end

  describe "#group" do
    it "defaults to including the pattern in some common group" do
      group_1, group_2 = pattern.group, described_class.new(name: "foo").group
      expect(group_1).to_not be nil
      expect(group_1).to eq group_2
    end

    it "uses the group from the pattern block, if added" do
      pattern_symbol[Docks::Tags::Group] = "foo"
      pattern.add(:style, pattern_symbol)
      expect(pattern.group).to eq "foo"
    end
  end

  describe "#valid?" do
    it "is invalid if it has no pattern block and no other symbols" do
      expect(pattern.valid?).to be false
    end

    it "is valid if it has a pattern block" do
      pattern.add(:style, pattern_symbol)
      expect(pattern.valid?).to be true
    end

    it "isn't valid if all details of the pattern are nil" do
      pattern.description = nil
      expect(pattern.valid?).to be false
    end

    it "is valid if any other symbol has been added" do
      pattern.add(:script, Docks::Containers::Function.new)
      expect(pattern.valid?).to be true
    end
  end

  describe "#structure_symbols" do
    before(:each) do
      pattern.add(:style, Docks::Containers::Component.new)
      pattern.add(:script, Docks::Containers::Component.new)
    end

    it "returns all symbols from style sources" do
      expect(pattern.structure_symbols.length).to be 1
    end

    it "is aliased to #style_symbols" do
      expect(pattern.style_symbols).to be pattern.structure_symbols
    end
  end

  describe "#has_structure?" do
    it "has no structure when there are no style results" do
      expect(pattern.has_structure?).to be false
    end

    it "has structure when there are style results" do
      pattern.add(:style, Docks::Containers::Component.new)
      expect(pattern.has_structure?).to be true
    end
  end

  describe "#behavior_symbols" do
    before(:each) do
      pattern.add(:style, Docks::Containers::Component.new)
      pattern.add(:script, Docks::Containers::Component.new)
    end

    it "returns all symbols from style sources" do
      expect(pattern.behavior_symbols.length).to be 1
    end

    it "is aliased to #script_symbols" do
      expect(pattern.script_symbols).to be pattern.behavior_symbols
    end
  end

  describe "#has_behavior?" do
    it "has no behavior when there are no script results" do
      expect(pattern.has_behavior?).to be false
    end

    it "has behavior when there are script results" do
      pattern.add(:script, Docks::Containers::Factory.new)
      expect(pattern.has_behavior?).to be true
    end
  end

  describe "#add" do
    let(:dummy_symbol_1) { Docks::Containers::Symbol.new }
    let(:dummy_symbol_2) { Docks::Containers::Symbol.new }

    it "adds a symbol to the passed source" do
      pattern.add(:script, dummy_symbol_1)
      pattern.add(:style, dummy_symbol_2)

      expect(pattern.behavior_symbols.length).to be 1
      expect(pattern.behavior_symbols.first).to be dummy_symbol_1
      expect(pattern.structure_symbols.length).to be 1
      expect(pattern.structure_symbols.first).to be dummy_symbol_2
    end

    it "adds an array of symbols to the passed source" do
      pattern.add(:script, [dummy_symbol_1, dummy_symbol_2])

      expect(pattern.behavior_symbols.length).to be 2
      expect(pattern.behavior_symbols).to eq [dummy_symbol_1, dummy_symbol_2]
    end

    it "doesn't add a pattern symbol to the passed source" do
      pattern.add(:script, pattern_symbol)
      expect(pattern.behavior_symbols).to be_empty
    end

    it "still adds the other symbols in a passed array even if a pattern symbol is among them" do
      pattern.add(:script, [dummy_symbol_1, pattern_symbol, dummy_symbol_2])

      expect(pattern.behavior_symbols.length).to be 2
      expect(pattern.behavior_symbols).to eq [dummy_symbol_1, dummy_symbol_2]
    end

    it "adds the belongs_to attribute to all contained symbols" do
      pattern.add(:script, [dummy_symbol_1, dummy_symbol_2])

      pattern.symbols.each do |symbol|
        expect(symbol.belongs_to).to be pattern
      end
    end
  end

  describe "#remove" do
    it "removes a symbol" do
      symbol = Docks::Containers::Symbol.new
      pattern.add(:style, symbol)
      expect(pattern.structure_symbols).to include symbol
      pattern.remove(symbol)
      expect(pattern.structure_symbols).not_to include symbol
    end
  end

  describe "#method_missing" do
    it "delegates missing methods to the pattern block" do
      expect(pattern.deprecated).to be nil

      pattern_symbol.deprecated = "2.0"
      pattern.add(:style, pattern_symbol)
      expect(pattern.deprecated).to eq "2.0"
    end
  end

  describe "#find" do
    it "returns itself if there is a matching pattern name and no symbol" do
      expect(pattern.find(Docks::Descriptor.new(pattern.name, assume: :pattern))).to be pattern
    end

    it "returns false when it can't find a given symbol" do
      expect(pattern.find("foo")).to be false
    end

    it "returns a symbol whose name matches the passed descriptor" do
      symbol = Docks::Containers::Component.new(name: "bar")
      pattern.add(:style, symbol)
      expect(pattern.find(symbol.name)).to be symbol
    end

    it "asks the contained symbol to find the descriptor and returns if successful" do
      method = Docks::Containers::Function.new(name: "toggle", method: true)
      factory = Docks::Containers::Factory.new(name: "Foo")
      factory.add_member(method)

      pattern.add(:script, factory)

      search = Docks::Descriptor.new("Foo#toggle")
      expect(factory).to receive(:find).with(search).and_call_original
      expect(pattern.find(search)).to be method
    end
  end

  describe "container associations" do
    it "includes a method to access all symbols of a given type" do
      Docks::Containers::TOP_LEVEL_SYMBOLS.each do |symbol|
        symbol_instance = Docks::Containers.container_for(symbol).new(name: "foo")
        pattern.add(:script, symbol_instance)

        results_of_symbol = pattern.send(symbol.pluralize.to_sym)
        expect(results_of_symbol.length).to be 1
        expect(results_of_symbol.first).to be symbol_instance
      end
    end

    it "includes only the set of symbols of a given type matching the passed options" do
      Docks::Containers::TOP_LEVEL_SYMBOLS.each do |symbol|
        symbol_instance = Docks::Containers.container_for(symbol).new(name: "foo")
        pattern.add(:script, symbol_instance)

        results_of_symbol = pattern.send(symbol.pluralize.to_sym, exclude: :script)
        expect(results_of_symbol.length).to be 0

        results_of_symbol = pattern.send(symbol.pluralize.to_sym, include: :script)
        expect(results_of_symbol.length).to be 1
        expect(results_of_symbol.first).to be symbol_instance

        results_of_symbol = pattern.send(symbol.pluralize.to_sym, exclude: :style)
        expect(results_of_symbol.length).to be 1
        expect(results_of_symbol.first).to be symbol_instance
      end
    end
  end

  describe "#symbols" do
    it "combines all symbol sources" do
      symbol_one = Docks::Containers::Symbol.new(name: "foo")
      symbol_two = Docks::Containers::Symbol.new(name: "bar")
      symbol_three = Docks::Containers::Symbol.new(name: "baz")
      pattern.add(:style, symbol_one)
      pattern.add(:script, symbol_two)
      pattern.add(:style, symbol_three)

      symbols = pattern.symbols
      expect(symbols.length).to be 3
      expect(symbols).to include symbol_one
      expect(symbols).to include symbol_two
      expect(symbols).to include symbol_three
    end
  end

  describe "#demos" do
    it "creates a demo for each component that needs one" do
      component_one = Docks::Containers::Component.new(name: "foo")
      component_two = Docks::Containers::Component.new(name: "bar")
      pattern.add(:style, [component_one, component_two])

      expect(component_one).to receive(:has_demo?).and_return(true)
      expect(component_two).to receive(:has_demo?).and_return(false)

      expect(pattern.demos.length).to be 1
      expect(pattern.demos.first.component).to be component_one
    end

    it "creates a demo for variations that need one" do
      variant = OpenStruct.new(demo_type: Docks::Types::Demo::OWN, name: "bar--baz")
      component = Docks::Containers::Component.new(name: "bar", variant: [variant])
      pattern.add(:style, component)

      expect(pattern.demos.length).to be 1
      expect(pattern.demos.last.component).to be variant
    end
  end

  describe "#summary" do
    before(:each) { pattern.add(:script, Docks::Containers::Function.new(name: "foo")) }
    let(:summary) { pattern.summary }

    it "preserves the name, group, title, and symbols" do
      expect(summary).to be_a described_class
      expect(summary.name).to eq pattern.name
      expect(summary.group).to eq pattern.group
      expect(summary.title).to eq pattern.title
      expect(summary.symbols).to eq pattern.symbols.map(&:summary)
    end
  end
end
