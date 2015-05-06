require "spec_helper"

describe Docks::Containers::Klass do
  subject { Docks::Containers::Klass }

  let(:klass) do
    {
      name: "Foo",
      symbol_type: Docks::Types::Symbol::CLASS,
      methods: [],
      properties: []
    }
  end

  let(:method) do
    {
      name: "bar",
      symbol_type: Docks::Types::Symbol::FUNCTION
    }
  end

  let(:property) do
    {
      name: "bar",
      symbol_type: Docks::Types::Symbol::VARIABLE
    }
  end

  let(:private_method) do
    {
      name: "baz",
      symbol_type: Docks::Types::Symbol::FUNCTION,
      access: Docks::Types::Access::PRIVATE
    }
  end

  let(:static_method) do
    {
      name: "baz",
      symbol_type: Docks::Types::Symbol::FUNCTION,
      static: true,
      access: Docks::Types::Access::PRIVATE
    }
  end

  describe "#initialize" do
    it "wraps every method in the correct container" do
      klass[:methods] << method
      container = subject.new(klass)
      expect(container.methods.length).to be 1
      expect(container.methods.first).to be_a Docks::Containers.container_for(method)
      expect(container.methods.first.to_h).to be method
    end

    it "wraps every property in the correct container" do
      klass[:properties] << property
      container = subject.new(klass)
      expect(container.properties.length).to be 1
      expect(container.properties.first).to be_a Docks::Containers.container_for(property)
      expect(container.properties.first.to_h).to be property
    end
  end

  describe "#methods" do
    it "returns all of the methods of the class" do
      klass[:methods] = [method, private_method]
      container = subject.new(klass)
      all_methods = container.methods
      expect(all_methods.length).to be 2
      expect(all_methods.map(&:to_h)).to include method
      expect(all_methods.map(&:to_h)).to include private_method
    end
  end

  describe "#public_methods" do
    it "returns all public methods of the class" do
      klass[:methods] = [method, private_method]
      container = subject.new(klass)
      public_methods = container.public_methods
      expect(public_methods.length).to be 1
      expect(public_methods.map(&:to_h)).to include method
      expect(public_methods.map(&:to_h)).not_to include private_method
    end
  end

  describe "#private_methods" do
    it "returns all public methods of the class" do
      klass[:methods] = [method, private_method]
      container = subject.new(klass)
      public_methods = container.private_methods
      expect(public_methods.length).to be 1
      expect(public_methods.map(&:to_h)).not_to include method
      expect(public_methods.map(&:to_h)).to include private_method
    end
  end

  describe "#static_methods" do
    it "returns all static methods of the class" do
      klass[:methods] = [method, private_method, static_method]
      container = subject.new(klass)
      static_methods = container.static_methods
      expect(static_methods.length).to be 1
      expect(static_methods.first.to_h).to be static_method
    end
  end

  describe "#instance_methods" do
    it "returns all instance methods of the class" do
      klass[:methods] = [private_method, static_method]
      container = subject.new(klass)
      the_instance_methods = container.instance_methods
      expect(the_instance_methods.length).to be 1
      expect(the_instance_methods.first.to_h).to be private_method
    end
  end
end
