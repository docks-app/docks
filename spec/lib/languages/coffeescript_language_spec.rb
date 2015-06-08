require "spec_helper"

describe Docks::Languages::CoffeeScript do
  subject { Docks::Languages::CoffeeScript.instance }

  describe ".extensions" do
    let(:extensions) { [subject.class.extensions].flatten }

    it "includes .coffee as an extension" do
      expect(extensions).to include "coffee"
    end

    it "includes .coffeescript as an extension" do
      expect(extensions).to include "coffeescript"
    end
  end

  describe "#signature_for" do
    let(:name) { "foo" }
    let(:function_no_params) { Docks::Containers::Function.new(name: name) }
    let(:function_with_params) { Docks::Containers::Function.new(name: name, params: [OpenStruct.new(name: "bar"), OpenStruct.new(name: "baz", default: "'qux'")]) }
    let(:klass) { Docks::Containers::Klass.new(name: name.capitalize, params: function_with_params.params) }
    let(:something_else) { Docks::Containers::Variable.new(name: "bar") }

    it "gives a signature to functions with no params" do
      expect(subject.signature_for(function_no_params)).to eq "#{function_no_params.name} = -> # ..."
    end

    it "gives a signature to functions with params, including default values" do
      expect(subject.signature_for(function_with_params)).to eq "#{function_with_params.name} = (bar, baz = 'qux') -> # ..."
    end

    it "gives a signature for classes with params, including default values" do
      expect(subject.signature_for(klass)).to eq "class #{klass.name}\n  constructor: (bar, baz = 'qux') -> # ..."
    end

    it "gives a signature to instance methods" do
      klass.add_member(function_with_params)
      expect(subject.signature_for(function_with_params)).to eq "#{function_with_params.name}: (bar, baz = 'qux') -> # ..."
    end

    it "gives a signature to static methods" do
      function_with_params.static = true
      klass.add_member(function_with_params)
      expect(subject.signature_for(function_with_params)).to eq "#{klass.name}.#{function_with_params.name} = (bar, baz = 'qux') -> # ..."
    end

    it "doesn't provide a signature for a non-function symbol" do
      expect(subject.signature_for(something_else)).to be nil
    end
  end
end
