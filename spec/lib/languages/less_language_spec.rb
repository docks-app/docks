require "spec_helper"

name = "foo"

describe Docks::Languages::Less do
  subject { Docks::Languages::Less.instance }

  describe ".extensions" do
    let(:extensions) { [subject.class.extensions].flatten }

    it "includes .less as an extension" do
      expect(extensions).to include "less"
    end
  end

  describe "#friendly_presentation" do
    let(:variable) do
      { symbol_type: Docks::Types::Symbol::VARIABLE, name: name }
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

    it "gives a friendly presentation for variables" do
      expect(subject.friendly_presentation(variable)).to eq "@#{name}"
    end

    it "only prefixes variable names with @ signs if they don't already exist" do
      variable[:name] = "@#{name}"
      expect(subject.friendly_presentation(variable)).to eq "@#{name}"
    end

    it "gives a friendly presentation for mixins with no params" do
      expect(subject.friendly_presentation(mixin_no_params)).to eq ".#{name}() { /* ... */ }"
    end

    it "gives a friendly presentation for mixins with params, including default values" do
      expect(subject.friendly_presentation(mixin_with_params)).to eq ".#{name}(@bar, @baz: qux) { /* ... */ }"
    end

    it "only prefixes variable names with dollar signs if they don't already exist" do
      mixin_with_params[:param].first[:name] = "@bar"
      expect(subject.friendly_presentation(mixin_with_params)).to eq ".#{name}(@bar, @baz: qux) { /* ... */ }"
    end

    it "defaults the friendly presentation to the name of the symbol" do
      expect(subject.friendly_presentation(something_else)).to eq name
    end
  end
end
