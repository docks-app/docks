require "spec_helper"

describe Docks::Tags::Member do
  subject { described_class.instance }

  it "can't be be parsed from files" do
    expect(subject.parseable?).to be false
  end

  describe "post process" do
    before(:each) { Docks::Tags.register_bundled_tags }

    let(:pattern) { Docks::Containers::Pattern.new(name: "symbol_1") }
    let(:factory) { Docks::Containers::Factory.new(name: "symbol_2") }
    let(:klass) { Docks::Containers::Klass.new(name: "symbol_3") }
    let(:object) { Docks::Containers::Variable.new(name: "symbol_4", object: true) }
    let(:variable) { Docks::Containers::Variable.new(name: "symbol_5") }
    let(:function) { Docks::Containers::Function.new(name: "symbol_6") }
    let(:method) { Docks::Containers::Function.new(name: "symbol_7", method: true) }
    let(:property) { Docks::Containers::Variable.new(name: "symbol_8", property: true) }

    it "adds methods following a class to its array of methods" do
      pattern.add(:script, [factory, klass, method])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include method
      expect(klass.methods.length).to be 1
      expect(klass.methods).to include method
    end

    it "adds properties following a class to its array of properties" do
      pattern.add(:script, [factory, klass, property])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include property
      expect(klass.properties.length).to be 1
      expect(klass.properties).to include property
    end

    it "adds methods following a factory to its array of methods" do
      pattern.add(:script, [function, factory, method])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include method
      expect(factory.methods.length).to be 1
      expect(factory.methods).to include method
    end

    it "adds properties following a factory to its array of properties" do
      pattern.add(:script, [function, factory, property])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include property
      expect(factory.properties.length).to be 1
      expect(factory.properties).to include property
    end

    it "adds methods following an object to its array of methods" do
      pattern.add(:script, [klass, object, method])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include method
      expect(object.methods.length).to be 1
      expect(object.methods).to include method
    end

    it "adds properties following an object to its array of properties" do
      pattern.add(:script, [klass, object, property])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include property
      expect(object.properties.length).to be 1
      expect(object.properties).to include property
    end

    it "adds methods following a variable to its array of methods" do
      pattern.add(:script, [object, variable, method])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include method
      expect(variable.methods.length).to be 1
      expect(variable.methods).to include method
    end

    it "adds properties following a variable to its array of properties" do
      pattern.add(:script, [object, variable, property])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include property
      expect(variable.properties.length).to be 1
      expect(variable.properties).to include property
    end

    it "adds methods following a function to its array of methods" do
      pattern.add(:script, [variable, function, method])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include method
      expect(function.methods.length).to be 1
      expect(function.methods).to include method
    end

    it "adds properties following a function to its array of properties" do
      pattern.add(:script, [variable, function, property])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include property
      expect(function.properties.length).to be 1
      expect(function.properties).to include property
    end

    it "adds properties and methods to the most object" do
      pattern.add(:script, [object, klass, property, factory, method])
      post_process

      expect(pattern.script_symbols.length).to be 3
      expect(pattern.script_symbols).not_to include property
      expect(pattern.script_symbols).not_to include method

      expect(factory.properties).to be_empty
      expect(klass.properties.length).to be 1
      expect(klass.properties).to include property

      expect(klass.methods).to be_empty
      expect(factory.methods.length).to be 1
      expect(factory.methods).to include method
    end

    it "adds properties to a non-recent object if the for attribute is explicitly set" do
      property.for = factory.name
      pattern.add(:script, [factory, object, property])
      post_process

      expect(pattern.script_symbols.length).to be 2
      expect(pattern.script_symbols).not_to include property
      expect(factory.properties).to eq [property]
      expect(object.properties).to be_empty
    end

    it "adds nested properties" do
      object.for = factory.name
      pattern.add(:script, [factory, object, property])
      post_process

      expect(pattern.script_symbols.length).to be 1
      expect(pattern.script_symbols).to include factory
      expect(factory.properties).to eq [object]
      expect(object.properties).to eq [property]
    end

    private

    def post_process
      Docks::Process.process(pattern)
    end
  end
end
