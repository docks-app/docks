require "spec_helper"

describe Docks::Containers::Klass do
  subject { Docks::Containers::Klass.new(name: "foo") }

  let(:method) do
    Docks::Containers::Function.new(name: "bar")
  end

  let(:property) do
    Docks::Containers::Variable.new(name: "bar")
  end

  let(:private_method) do
    Docks::Containers::Function.new(name: "baz", access: Docks::Types::Access::PRIVATE)
  end

  let(:private_property) do
    Docks::Containers::Variable.new(name: "baz", access: Docks::Types::Access::PRIVATE)
  end

  let(:static_method) do
    Docks::Containers::Function.new(name: "baz", static: true, access: Docks::Types::Access::PRIVATE)
  end

  let(:static_property) do
    Docks::Containers::Variable.new(name: "baz", static: true, access: Docks::Types::Access::PRIVATE)
  end

  describe "#methods" do
    it "returns an empty array when there are no methods" do
      expect(subject.methods).to be_empty
    end

    it "returns all of the methods of the class" do
      subject.methods.concat [method, private_method]
      all_methods = subject.methods
      expect(all_methods.length).to be 2
      expect(all_methods).to include method
      expect(all_methods).to include private_method
    end
  end

  describe "#public_methods" do
    it "returns an empty array when there are no public methods" do
      subject.methods << private_method
      expect(subject.public_methods).to be_empty
    end

    it "returns all public methods of the class" do
      subject.methods.concat [method, private_method]
      public_methods = subject.public_methods
      expect(public_methods.length).to be 1
      expect(public_methods.first).to be method
    end
  end

  describe "#private_methods" do
    it "returns an empty array when there are no private methods" do
      subject.methods << method
      expect(subject.private_methods).to be_empty
    end

    it "returns all private methods of the class" do
      subject.methods.concat [method, private_method]
      public_methods = subject.private_methods
      expect(public_methods.length).to be 1
      expect(public_methods.first).to be private_method
    end
  end

  describe "#static_methods" do
    it "returns an empty array when there are no static methods" do
      subject.methods.concat [method, private_method]
      expect(subject.static_methods).to be_empty
    end

    it "returns all static methods of the class" do
      subject.methods.concat [method, static_method, private_method]
      static_methods = subject.static_methods
      expect(static_methods.length).to be 1
      expect(static_methods.first).to be static_method
    end
  end

  describe "#instance_methods" do
    it "returns an empty array when there are no instance methods" do
      subject.methods << static_method
      expect(subject.instance_methods).to be_empty
    end

    it "returns all instance methods of the class" do
      subject.methods.concat [method, static_method, private_method]
      instance_methods = subject.instance_methods
      expect(instance_methods.length).to be 2
      expect(instance_methods).to include method
      expect(instance_methods).to include private_method
    end
  end

  describe "#properties" do
    it "returns an empty array when there are no properties" do
      expect(subject.properties).to be_empty
    end

    it "returns all of the properties of the class" do
      subject.properties.concat [property, private_property]
      all_properties = subject.properties
      expect(all_properties.length).to be 2
      expect(all_properties).to include property
      expect(all_properties).to include private_property
    end
  end

  describe "#public_properties" do
    it "returns an empty array when there are no public properties" do
      subject.properties << private_property
      expect(subject.public_properties).to be_empty
    end

    it "returns all public properties of the class" do
      subject.properties.concat [property, private_property]
      public_properties = subject.public_properties
      expect(public_properties.length).to be 1
      expect(public_properties.first).to be property
    end
  end

  describe "#private_properties" do
    it "returns an empty array when there are no private properties" do
      subject.properties << property
      expect(subject.private_properties).to be_empty
    end

    it "returns all private properties of the class" do
      subject.properties.concat [property, private_property]
      public_properties = subject.private_properties
      expect(public_properties.length).to be 1
      expect(public_properties.first).to be private_property
    end
  end

  describe "#static_properties" do
    it "returns an empty array when there are no static properties" do
      subject.properties.concat [property, private_property]
      expect(subject.static_properties).to be_empty
    end

    it "returns all static properties of the class" do
      subject.properties.concat [property, static_property, private_property]
      static_properties = subject.static_properties
      expect(static_properties.length).to be 1
      expect(static_properties.first).to be static_property
    end
  end

  describe "#instance_properties" do
    it "returns an empty array when there are no instance properties" do
      subject.properties << static_property
      expect(subject.instance_properties).to be_empty
    end

    it "returns all instance properties of the class" do
      subject.properties.concat [property, static_property, private_property]
      instance_properties = subject.instance_properties
      expect(instance_properties.length).to be 2
      expect(instance_properties).to include property
      expect(instance_properties).to include private_property
    end
  end
end
