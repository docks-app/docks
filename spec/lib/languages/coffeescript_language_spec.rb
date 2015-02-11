require "spec_helper"

name = "foo"

describe Docks::Languages::CoffeeScript do
  subject { Docks::Languages::CoffeeScript.instance }

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

  let(:something_else) do
    { symbol_type: Docks::Types::Symbol::COMPONENT, name: name }
  end

  describe "#friendly_presentation" do
    it "gives a friendly presentation for functions with no params" do
      expect(subject.friendly_presentation(function_no_params)).to eq "#{name} = -> # ..."
    end

    it "gives a friendly presentation for functions with params, including default values" do
      expect(subject.friendly_presentation(function_with_params)).to eq "#{name} = (bar, baz = qux) -> # ..."
    end

    it "defaults the friendly presentation to the name of the symbol" do
      expect(subject.friendly_presentation(something_else)).to eq name
    end
  end
end
