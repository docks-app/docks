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

  describe "#find" do
    it "returns nil if the descriptor symbol doesn't match" do
      expect(subject.find("baz")).to be nil
    end

    it "returns the symbol when the symbol name matches and there are no other parts to the descriptor" do
      expect(subject.find(subject.name)).to be subject
    end

    it "returns nothing when the symbol name matches but the member does not" do
      expect(subject.find("#{subject.name}.bar")).to be nil
      expect(subject.find("#{subject.name}#bar")).to be nil
      expect(subject.find("#{subject.name}~bar")).to be nil
    end

    it "returns an instance method" do
      static_method.name = method.name
      subject.add_members(static_method, method)
      expect(subject.find("#{subject.name}##{method.name}")).to be method
    end

    it "returns a static method" do
      static_method.name = method.name
      subject.add_members(method, static_method)
      expect(subject.find("#{subject.name}.#{static_method.name}")).to be static_method
    end

    it "returns an instance property" do
      static_property.name = property.name
      subject.add_members(static_property, property)
      expect(subject.find("#{subject.name}##{property.name}")).to be property
    end

    it "returns a static property" do
      static_property.name = property.name
      subject.add_members(property, static_property)
      expect(subject.find("#{subject.name}.#{static_property.name}")).to be static_property
    end
  end

  describe "#methods" do
    it "returns an empty array when there are no methods" do
      expect(subject.methods).to be_empty
    end

    it "returns all of the methods of the class" do
      subject.add_members(method, private_method)
      all_methods = subject.methods
      expect(all_methods.length).to be 2
      expect(all_methods).to include method
      expect(all_methods).to include private_method
    end
  end

  describe "#public_methods" do
    it "returns an empty array when there are no public methods" do
      subject.add_member(private_method)
      expect(subject.public_methods).to be_empty
    end

    it "returns all public methods of the class" do
      subject.add_members(method, private_method)
      public_methods = subject.public_methods
      expect(public_methods.length).to be 1
      expect(public_methods.first).to be method
    end
  end

  describe "#private_methods" do
    it "returns an empty array when there are no private methods" do
      subject.add_member(method)
      expect(subject.private_methods).to be_empty
    end

    it "returns all private methods of the class" do
      subject.add_members(method, private_method)
      public_methods = subject.private_methods
      expect(public_methods.length).to be 1
      expect(public_methods.first).to be private_method
    end
  end

  describe "#static_methods" do
    it "returns an empty array when there are no static methods" do
      subject.add_members(method, private_method)
      expect(subject.static_methods).to be_empty
    end

    it "returns all static methods of the class" do
      subject.add_members(method, static_method, private_method)
      static_methods = subject.static_methods
      expect(static_methods.length).to be 1
      expect(static_methods.first).to be static_method
    end
  end

  describe "#instance_methods" do
    it "returns an empty array when there are no instance methods" do
      subject.add_member(static_method)
      expect(subject.instance_methods).to be_empty
    end

    it "returns all instance methods of the class" do
      subject.add_members(method, static_method, private_method)
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
      subject.add_members(property, private_property)
      all_properties = subject.properties
      expect(all_properties.length).to be 2
      expect(all_properties).to include property
      expect(all_properties).to include private_property
    end
  end

  describe "#public_properties" do
    it "returns an empty array when there are no public properties" do
      subject.add_member(private_property)
      expect(subject.public_properties).to be_empty
    end

    it "returns all public properties of the class" do
      subject.add_members(property, private_property)
      public_properties = subject.public_properties
      expect(public_properties.length).to be 1
      expect(public_properties.first).to be property
    end
  end

  describe "#private_properties" do
    it "returns an empty array when there are no private properties" do
      subject.add_member(property)
      expect(subject.private_properties).to be_empty
    end

    it "returns all private properties of the class" do
      subject.add_members(property, private_property)
      public_properties = subject.private_properties
      expect(public_properties.length).to be 1
      expect(public_properties.first).to be private_property
    end
  end

  describe "#static_properties" do
    it "returns an empty array when there are no static properties" do
      subject.add_members(property, private_property)
      expect(subject.static_properties).to be_empty
    end

    it "returns all static properties of the class" do
      subject.add_members(property, static_property, private_property)
      static_properties = subject.static_properties
      expect(static_properties.length).to be 1
      expect(static_properties.first).to be static_property
    end
  end

  describe "#instance_properties" do
    it "returns an empty array when there are no instance properties" do
      subject.add_member(static_property)
      expect(subject.instance_properties).to be_empty
    end

    it "returns all instance properties of the class" do
      subject.add_members(property, static_property, private_property)
      instance_properties = subject.instance_properties
      expect(instance_properties.length).to be 2
      expect(instance_properties).to include property
      expect(instance_properties).to include private_property
    end
  end

  describe "#instance_members" do
    it "includes all instance methods and properties" do
      subject.add_members(method, private_method, static_method)
      subject.add_members(property, private_property, static_property)

      members = subject.instance_members
      expect(members.length).to be 4
      expect(members).to include method
      expect(members).to include property
      expect(members).to include private_method
      expect(members).to include private_property
    end
  end

  describe "#static_members" do
    it "includes all static methods and properties" do
      subject.add_members(method, private_method, static_method)
      subject.add_members(property, private_property, static_property)

      members = subject.static_members
      expect(members.length).to be 2
      expect(members).to include static_method
      expect(members).to include static_property
    end
  end

  describe "#add_member" do
    context "when a variable is added" do
      it "adds all the relevant details" do
        subject.add_member(property)
        expect(property.for).to eq subject.name
        expect(property.belongs_to).to be subject
        expect(property.property?).to be true
      end

      it "adds the property to the class's properties" do
        subject.add_member(property)
        expect(subject.properties).to include property
      end
    end

    context "when a function is added" do
      it "adds all the relevant details" do
        subject.add_member(static_method)
        expect(static_method.for).to eq subject.name
        expect(static_method.belongs_to).to be subject
        expect(static_method.method?).to be true
      end

      it "adds the function to the class's methods" do
        subject.add_member(static_method)
        expect(subject.methods).to include static_method
      end
    end
  end

  describe "summary" do
    before(:each) do
      subject.add_members(method, private_method, static_method)
      subject.add_members(property, private_property, static_property)
    end

    describe "#instance_members" do
      it "has summarized instance members of the original " do
        members = subject.summary.instance_members
        expect(members.length).to be 4
        expect(members).to include method.summary
        expect(members).to include property.summary
        expect(members).to include private_method.summary
        expect(members).to include private_property.summary
      end
    end

    describe "#static_members" do
      it "has summarized static members of the original" do
        members = subject.summary.static_members
        expect(members.length).to be 2
        expect(members).to include static_method.summary
        expect(members).to include static_property.summary
      end
    end

    describe "#find" do
      before(:each) do
        subject[:methods] = []
        subject[:properties] = []
      end

      let(:summary) { subject.summary }

      it "returns nil if the descriptor symbol doesn't match" do
        expect(summary.find("baz")).to be nil
      end

      it "returns the symbol when the symbol name matches and there are no other parts to the descriptor" do
        expect(summary.find(summary.name)).to be summary
      end

      it "returns nothing when the symbol name matches but the member does not" do
        expect(summary.find("#{summary.name}.bar")).to be nil
        expect(summary.find("#{summary.name}#bar")).to be nil
        expect(summary.find("#{summary.name}~bar")).to be nil
      end

      it "returns an instance method" do
        static_method.name = method.name
        subject.add_members(static_method, method)
        expect(subject.summary.find("#{subject.name}##{method.name}")).to eq method.summary
      end

      it "returns a static method" do
        static_method.name = method.name
        subject.add_members(method, static_method)
        expect(subject.summary.find("#{subject.name}.#{static_method.name}")).to eq static_method.summary
      end

      it "returns an instance property" do
        static_property.name = property.name
        subject.add_members(static_property, property)
        expect(subject.summary.find("#{subject.name}##{property.name}")).to eq property.summary
      end

      it "returns a static property" do
        static_property.name = property.name
        subject.add_members(property, static_property)
        expect(subject.summary.find("#{subject.name}.#{static_property.name}")).to eq static_property.summary
      end
    end
  end
end
