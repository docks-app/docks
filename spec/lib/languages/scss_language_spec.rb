require "spec_helper"

name = "foo"

describe Docks::Languages::SCSS do
  subject { Docks::Languages::SCSS.instance }

  let(:variable) do
    { symbol_type: Docks::Types::Symbol::VARIABLE, name: name }
  end

  let(:placeholder) do
    { symbol_type: Docks::Types::Symbol::PLACEHOLDER, name: name }
  end

  let(:function_no_params) do
    { symbol_type: Docks::Types::Symbol::FUNCTION, name: name }
  end

  let(:function_with_params) do
    {
      symbol_type: Docks::Types::Symbol::FUNCTION,
      name: name,
      param: [
        { name: "bar" },
        { name: "baz", default: "qux" }
      ]
    }
  end

  let(:mixin_no_params) do
    { symbol_type: Docks::Types::Symbol::MIXIN, name: name }
  end

  let(:mixin_with_params) do
    {
      symbol_type: Docks::Types::Symbol::MIXIN,
      name: name,
      param: [
        { name: "bar" },
        { name: "baz", default: "qux" }
      ]
    }
  end

  let(:something_else) do
    { symbol_type: Docks::Types::Symbol::COMPONENT, name: name }
  end

  describe "#friendly_presentation" do
    it "gives a friendly presentation for variables" do
      expect(subject.friendly_presentation(variable)).to eq "$#{name}"
    end

    it "gives a friendly presentation for placeholders" do
      expect(subject.friendly_presentation(placeholder)).to eq "%#{name}"
    end

    it "gives a friendly presentation for functions with no params" do
      expect(subject.friendly_presentation(function_no_params)).to eq "@function #{name}() { /* ... */ }"
    end

    it "gives a friendly presentation for functions with params, including default values" do
      expect(subject.friendly_presentation(function_with_params)).to eq "@function #{name}($bar, $baz: qux) { /* ... */ }"
    end

    it "gives a friendly presentation for mixins with no params" do
      expect(subject.friendly_presentation(mixin_no_params)).to eq "@mixin #{name}() { /* ... */ }"
    end

    it "gives a friendly presentation for mixins with params, including default values" do
      expect(subject.friendly_presentation(mixin_with_params)).to eq "@mixin #{name}($bar, $baz: qux) { /* ... */ }"
    end

    it "only prefixes variable names with dollar signs if they don't already exist" do
      function_with_params[:param].first[:name] = "$bar"
      expect(subject.friendly_presentation(function_with_params)).to eq "@function #{name}($bar, $baz: qux) { /* ... */ }"
    end

    it "defaults the friendly presentation to the name of the symbol" do
      expect(subject.friendly_presentation(something_else)).to eq name
    end
  end
end
