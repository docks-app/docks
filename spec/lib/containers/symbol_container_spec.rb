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

  describe "#member?" do
    it "is a member when it is a property or method" do
      expect(Docks::Containers::Variable.new(property: true)).to be_member
      expect(Docks::Containers::Function.new(method: true)).to be_member
    end

    it "is not a member when it is not a property or method" do
      expect(Docks::Containers::Variable.new).to_not be_member
      expect(Docks::Containers::Function.new).to_not be_member
      expect(Docks::Containers::Klass.new).to_not be_member
      expect(Docks::Containers::Factory.new).to_not be_member
    end
  end

  describe "members" do
    let(:property) { Docks::Containers::Variable.new(name: "baz") }
    let(:method) { Docks::Containers::Function.new(name: "qux") }

    describe "#add_member" do
      context "when a variable is added" do
        it "adds all the relevant details" do
          subject.add_member(property)
          expect(property.for).to eq subject.name
          expect(property.belongs_to).to be subject
          expect(property.property?).to be true
          expect(property.static?).to be true
        end

        it "adds the property to the symbol's properties" do
          subject.add_member(property)
          expect(subject.properties).to include property
        end
      end

      context "when a function is added" do
        it "adds all the relevant details" do
          subject.add_member(method)
          expect(method.for).to eq subject.name
          expect(method.belongs_to).to be subject
          expect(method.method?).to be true
          expect(method.static?).to be true
        end

        it "adds the function to the symbol's methods" do
          subject.add_member(method)
          expect(subject.methods).to include method
        end
      end
    end

    describe "#methods" do
      it "returns an empty array when there are no methods" do
        expect(subject.methods).to be_empty
      end

      it "returns all of the methods of the class" do
        subject.add_members(method)
        all_methods = subject.methods
        expect(all_methods.length).to be 1
        expect(all_methods).to include method
      end
    end

    describe "#properties" do
      it "returns an empty array when there are no properties" do
        expect(subject.properties).to be_empty
      end

      it "returns all of the properties of the symbol" do
        subject.add_members(property)
        all_properties = subject.properties
        expect(all_properties.length).to be 1
        expect(all_properties).to include property
      end
    end

    describe "#members" do
      it "returns an empty array when there are no members" do
        expect(subject.members).to be_empty
      end

      it "returns all members, of any type" do
        subject.add_members(method, property)

        members = subject.members
        expect(members.length).to be 2
        expect(members).to include method
        expect(members).to include property
      end
    end

    describe "#has_members?" do
      it "returns false when there are no members" do
        expect(subject).not_to have_members
      end

      it "returns true when there are members" do
        subject.add_members(method, property)
        expect(subject).to have_members
      end
    end

    describe "#find" do
      it "returns false if the descriptor symbol doesn't match" do
        expect(subject.find("baz")).to be false
      end

      it "returns the symbol when the symbol name matches and there are no other parts to the descriptor" do
        expect(subject.find(subject.name)).to be subject
      end

      it "returns false when the symbol name matches but the member does not" do
        expect(subject.find("#{subject.name}.bar")).to be false
        expect(subject.find("#{subject.name}#bar")).to be false
        expect(subject.find("#{subject.name}~bar")).to be false
      end

      it "returns a method" do
        subject.add_members(method, property)
        expect(subject.find("#{subject.name}.#{method.name}")).to be method
      end

      it "returns a property" do
        subject.add_members(property, method)
        expect(subject.find("#{subject.name}.#{property.name}")).to be property
      end
    end
  end

  describe "#summary" do
    before(:each) do
      subject.add_members(Docks::Containers::Variable.new, Docks::Containers::Function.new)
    end

    let(:summary) { subject.summary }

    it "preserves the symbol_id, name, properties, and methods" do
      expect(summary).to be_a described_class
      expect(summary.name).to eq subject.name
      expect(summary.symbol_id).to eq subject.symbol_id
      expect(summary.properties).to eq subject.properties.map(&:summary)
      expect(summary.methods).to eq subject.methods.map(&:summary)
    end
  end
end
