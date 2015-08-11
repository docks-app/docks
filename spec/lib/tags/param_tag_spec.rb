require "spec_helper"

describe Docks::Tags::Param do
  subject { Docks::Tags::Param.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }
    let(:name) { "_tab_list2" }
    let(:types) { "Array | DOMElement" }
    let(:processed_types) { Docks::Processors.split_types(types) }
    let(:default) { "[]" }
    let(:description) { "The list of tabs." }

    it "creates the param when only the name is provided" do
      result = process_param_with([name]).first
      expect(result.name).to eq name
      expect(result.multiple).to be false
    end

    it "creates the param when special characters exist in the name" do
      result = process_param_with(["_with_underscore"]).first
      expect(result.name).to eq "_with_underscore"

      result = process_param_with(["$$with-dollars"]).first
      expect(result.name).to eq "$$with-dollars"
    end

    context "when this param represents multiple params" do
      it "is not multiple when no spread operator is used" do
        result = process_param_with([name]).first
        expect(result.name).to eq name
        expect(result.multiple).to be false
      end

      it "indicates that the param is a multiple param when the spread operator is used" do
        result = process_param_with(["...#{name}"]).first
        expect(result.name).to eq name
        expect(result.multiple).to be true
      end
    end

    context "when types provided" do
      it "creates the param when the name and types are provided" do
        result = process_param_with(["{#{types}} #{name}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq processed_types
      end

      it "sets the types to an empty array when not provided" do
        result = process_param_with([name]).first
        expect(result.name).to eq name
        expect(result.types).to eq Array.new
      end
    end

    context "when optional" do
      it "creates the param with an optional attribute" do
        result = process_param_with(["[#{name}]"]).first
        expect(result.name).to eq name
        expect(result.optional).to be true
        expect(result.default).to be nil
      end

      it "creates the param with an optional attribute and the actual default value" do
        result = process_param_with(["[#{name} = #{default}]"]).first
        expect(result.name).to eq name
        expect(result.optional).to be true
        expect(result.default).to eq default
      end

      it "sets optional and default to the appropriate values when not provided" do
        result = process_param_with([name]).first
        expect(result.name).to eq name
        expect(result.optional).to be false
        expect(result.default).to be nil
      end
    end

    context "when description provided" do
      it "creates the param when the name and description are provided" do
        result = process_param_with(["#{name} #{description}"]).first
        expect(result.name).to eq name
        expect(result.description).to eq description

        result = process_param_with(["#{name} -  #{description}"]).first
        expect(result.name).to eq name
        expect(result.description).to eq description
      end

      it "sets description to be nil when not provided" do
        result = process_param_with([name]).first
        expect(result.name).to eq name
        expect(result.description).to be nil
      end
    end

    context "when there are combinations of the components" do
      it "processes lines with a name, default, and types" do
        result = process_param_with(["{#{types}}    [#{name}  =#{default}]"]).first
        expect(result.name).to eq name
        expect(result.types).to eq processed_types
        expect(result.optional).to be true
        expect(result.default).to eq default
        expect(result.description).to be nil
      end

      it "processes lines with a name, types, and description" do
        result = process_param_with(["{#{types}} #{name}    -#{description}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq processed_types
        expect(result.optional).to be false
        expect(result.default).to be nil
        expect(result.description).to eq description

        result = process_param_with(["{#{types}} #{name} #{description}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq processed_types
        expect(result.optional).to be false
        expect(result.default).to be nil
        expect(result.description).to eq description
      end

      it "processes lines with a name, optional, and description" do
        result = process_param_with(["[#{name}] #{description}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq Array.new
        expect(result.optional).to be true
        expect(result.default).to be nil
        expect(result.description).to eq description

        result = process_param_with(["[#{name}]   -      #{description}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq Array.new
        expect(result.optional).to be true
        expect(result.default).to be nil
        expect(result.description).to eq description
      end

      it "processes lines with a name, default value, and description" do
        result = process_param_with(["[#{name}= #{default}] #{description}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq Array.new
        expect(result.optional).to be true
        expect(result.default).to eq default
        expect(result.description).to eq description

        result = process_param_with(["[#{name}   = #{default}]   -#{description}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq Array.new
        expect(result.optional).to be true
        expect(result.default).to eq default
        expect(result.description).to eq description
      end

      it "processes lines with a name, types, spread param, and description" do
        result = process_param_with(["{#{types}} ...#{name}  #{description}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq processed_types
        expect(result.optional).to be false
        expect(result.multiple).to be true
        expect(result.default).to be nil
        expect(result.description).to eq description

        result = process_param_with([" {#{types}}  ...#{name}   -#{description}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq processed_types
        expect(result.optional).to be false
        expect(result.multiple).to be true
        expect(result.default).to be nil
        expect(result.description).to eq description
      end

      it "processes lines with a name, types, spread param, default value, and description" do
        result = process_param_with(["{#{types}} [...#{name}= #{default}] #{description}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq processed_types
        expect(result.optional).to be true
        expect(result.multiple).to be true
        expect(result.default).to eq default
        expect(result.description).to eq description

        ap result

        result = process_param_with([" {#{types}}  [...#{name}   = #{default}]   -#{description}"]).first
        expect(result.name).to eq name
        expect(result.types).to eq processed_types
        expect(result.optional).to be true
        expect(result.multiple).to be true
        expect(result.default).to eq default
        expect(result.description).to eq description
      end
    end

    context "when there are properties" do
      let(:base_param) { "foo" }
      let(:prop_one) { "{String} foo.bar" }
      let(:prop_two) { "{Number} foo['baz']" }
      let(:prop_three) { "{String} foo[].qux" }
      let(:unrelated) { "qux" }

      it "joins a property using dot syntax" do
        params = process_param_with [base_param, prop_one]
        param = params.first
        expect(params.length).to be 1
        expect(param.name).to eq base_param
        expect(param.properties.length).to be 1
        expect(param.properties.first.name).to eq "bar"
      end

      it "joins a property using bracket syntax" do
        params = process_param_with [base_param, prop_two]
        param = params.first
        expect(params.length).to be 1
        expect(param.name).to eq base_param
        expect(param.properties.length).to be 1
        expect(param.properties.first.name).to eq "baz"
      end

      it "joins a property with another property that is an array" do
        params = process_param_with([base_param, prop_three])
        param = params.first

        expect(params.length).to be 1
        expect(param.name).to eq base_param
        expect(param.properties.length).to be 1
        expect(param.properties.first.name).to eq "qux"
      end

      it "creates a base param when none exists" do
        params = process_param_with prop_two
        param = params.first
        expect(params.length).to be 1
        expect(param.name).to eq base_param
        expect(param.properties.length).to be 1
        expect(param.properties.first.name).to eq "baz"
      end

      it "leaves unrelated base params alone" do
        params = process_param_with [prop_one, prop_two, unrelated]
        expect(params.length).to be 2
        expect(params.first.name).to eq base_param
        expect(params.first.properties.length).to be 2
        expect(params.last.name).to eq unrelated
      end
    end

    private

    def process_param_with(content)
      symbol[subject.name] = content
      subject.process(symbol)
      symbol[subject.name]
    end
  end
end
