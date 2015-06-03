require "spec_helper"

describe Docks::Tags::Klass do
  subject { Docks::Tags::Klass.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  it "only allows one tag per file" do
    expect(subject.only_one_per_file_allowed?).to be false
  end

  describe "#process" do
    it "converts the symbol to be a class container" do
      symbol = Docks::Containers::Function.new(class: "", name: "foo")
      symbol = Docks::Process.process(symbol)

      expect(symbol).to be_a Docks::Containers::Klass
      expect(symbol.symbol_type).to eq Docks::Types::Symbol::CLASS
    end
  end

  describe "#setup_post_processors" do
    before(:each) do
      Docks::Tags.register(described_class)
      Docks::Tags.register(Docks::Tags::Factory)
    end

    let(:pattern) { Docks::Containers::Pattern.new("foo") }
    let(:factory) { Docks::Containers::Factory.new }
    let(:klass) { Docks::Containers::Klass.new }
    let(:method) { Docks::Containers::Function.new(method: true) }
    let(:property) { Docks::Containers::Variable.new(property: true) }

    it "adds methods following the class to its array of methods" do
      pattern.add(:script, [klass, method])
      Docks::Process.process(pattern)

      expect(pattern.script_symbols.length).to be 1
      expect(pattern.script_symbols.first).to be klass
      expect(klass.methods.length).to be 1
      expect(klass.methods).to include method
    end

    it "adds properties following the class to its array of properties" do
      pattern.add(:script, [klass, property])
      Docks::Process.process(pattern)

      expect(pattern.script_symbols.length).to be 1
      expect(pattern.script_symbols.first).to be klass
      expect(klass.properties.length).to be 1
      expect(klass.properties).to include property
    end

    it "adds methods following the factory to the its array of methods" do
      pattern.add(:script, [klass, method])
      Docks::Process.process(pattern)

      expect(pattern.script_symbols.length).to be 1
      expect(pattern.script_symbols.first).to be klass
      expect(klass.methods.length).to be 1
      expect(klass.methods).to include method
    end

    it "adds properties following the factory to its array of properties" do
      pattern.add(:script, [factory, property])
      Docks::Process.process(pattern)

      expect(pattern.script_symbols.length).to be 1
      expect(pattern.script_symbols.first).to be factory
      expect(factory.properties.length).to be 1
      expect(factory.properties).to include property
    end

    it "only adds properties and methods to the most recent class or factory" do
      pattern.add(:script, [klass, property, factory, method])
      Docks::Process.process(pattern)

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).to include klass
      expect(pattern.script_symbols).to include factory

      expect(factory.properties).to be_empty
      expect(klass.properties.length).to be 1
      expect(klass.properties).to include property

      expect(klass.methods).to be_empty
      expect(factory.methods.length).to be 1
      expect(factory.methods).to include method
    end
  end
end
