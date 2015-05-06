require "spec_helper"

describe Docks::Tags::Param do
  subject { Docks::Tags::Param.instance }

  let(:name) { "_tab_list2" }
  let(:types) { "Array | DOMElement" }
  let(:processed_types) { Docks::Processors::BreakApartTypes.process(types) }
  let(:default) { "[]" }
  let(:description) { "The list of tabs." }

  describe "#process" do
    it "creates the param when only the name is provided" do
      result = subject.process([name])
      expect(result[:name]).to eq name
    end

    it "creates the param when special characters exist in the name" do
      result = subject.process(["_with_underscore"])
      expect(result[:name]).to eq "_with_underscore"

      result = subject.process(["$$with-dollars"])
      expect(result[:name]).to eq "$$with-dollars"
    end

    context "when types provided" do
      it "creates the param when the name and types are provided" do
        result = subject.process(["{#{types}} #{name}"])
        expect(result[:name]).to eq name
        expect(result[:types]).to eq processed_types
      end

      it "sets the types to an empty array when not provided" do
        result = subject.process([name])
        expect(result[:name]).to eq name
        expect(result[:types]).to eq Array.new
      end
    end

    context "when optional" do
      it "creates the param with an optional attribute" do
        result = subject.process(["[#{name}]"])
        expect(result[:name]).to eq name
        expect(result[:optional]).to be true
        expect(result[:default]).to be nil
      end

      it "creates the param with an optional attribute and the actual default value" do
        result = subject.process(["[#{name} = #{default}]"])
        expect(result[:name]).to eq name
        expect(result[:optional]).to be true
        expect(result[:default]).to eq default
      end

      it "sets optional and default to the appropriate values when not provided" do
        result = subject.process([name])
        expect(result[:name]).to eq name
        expect(result[:optional]).to be false
        expect(result[:default]).to be nil
      end
    end

    context "when description provided" do
      it "creates the param when the name and description are provided" do
        result = subject.process(["#{name} #{description}"])
        expect(result[:name]).to eq name
        expect(result[:description]).to eq description

        result = subject.process(["#{name} -  #{description}"])
        expect(result[:name]).to eq name
        expect(result[:description]).to eq description
      end

      it "sets description to be nil when not provided" do
        result = subject.process([name])
        expect(result[:name]).to eq name
        expect(result[:description]).to be nil
      end
    end

    context "combinations of the components" do
      it "processes lines with a name, default, and types" do
        result = subject.process(["{#{types}}    [#{name}  =#{default}]"])
        expect(result[:name]).to eq name
        expect(result[:types]).to eq processed_types
        expect(result[:optional]).to be true
        expect(result[:default]).to eq default
        expect(result[:description]).to be nil
      end

      it "processes lines with a name, types, and description" do
        result = subject.process(["{#{types}} #{name}    -#{description}"])
        expect(result[:name]).to eq name
        expect(result[:types]).to eq processed_types
        expect(result[:optional]).to be false
        expect(result[:default]).to be nil
        expect(result[:description]).to eq description

        result = subject.process(["{#{types}} #{name} #{description}"])
        expect(result[:name]).to eq name
        expect(result[:types]).to eq processed_types
        expect(result[:optional]).to be false
        expect(result[:default]).to be nil
        expect(result[:description]).to eq description
      end

      it "processes lines with a name, optional, and description" do
        result = subject.process(["[#{name}] #{description}"])
        expect(result[:name]).to eq name
        expect(result[:types]).to eq Array.new
        expect(result[:optional]).to be true
        expect(result[:default]).to be nil
        expect(result[:description]).to eq description

        result = subject.process(["[#{name}]   -      #{description}"])
        expect(result[:name]).to eq name
        expect(result[:types]).to eq Array.new
        expect(result[:optional]).to be true
        expect(result[:default]).to be nil
        expect(result[:description]).to eq description
      end

      it "processes lines with a name, default value, and description" do
        result = subject.process(["[#{name}= #{default}] #{description}"])
        expect(result[:name]).to eq name
        expect(result[:types]).to eq Array.new
        expect(result[:optional]).to be true
        expect(result[:default]).to eq default
        expect(result[:description]).to eq description

        result = subject.process(["[#{name}   = #{default}]   -#{description}"])
        expect(result[:name]).to eq name
        expect(result[:types]).to eq Array.new
        expect(result[:optional]).to be true
        expect(result[:default]).to eq default
        expect(result[:description]).to eq description
      end
    end
  end
end
