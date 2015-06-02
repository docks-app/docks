require "spec_helper"

describe Docks::Languages::SCSS do
  subject { Docks::Languages::SCSS.instance }

  describe ".extensions" do
    let(:extensions) { [subject.class.extensions].flatten }

    it "includes .scss as an extension" do
      expect(extensions).to include "scss"
    end
  end

  describe "#signature_for" do
    let(:name) { "foo" }

    let(:function_no_params) { Docks::Containers::Function.new(name: name) }
    let(:function_with_params) { Docks::Containers::Function.new(name: name, params: [OpenStruct.new(name: "bar"), OpenStruct.new(name: "baz", default: "qux")]) }
    let(:mixin_no_params) { Docks::Containers::Mixin.new(name: name) }
    let(:mixin_with_params) { Docks::Containers::Mixin.new(name: name, params: [OpenStruct.new(name: "bar"), OpenStruct.new(name: "baz", default: "'qux'")]) }

    let(:something_else) { Docks::Containers::Component.new(name: name) }

    it "gives a signature to functions with no params" do
      expect(subject.signature_for(function_no_params)).to eq "@function #{name}() { /* ... */ }"
    end

    it "gives a signature to functions with params, including default values" do
      expect(subject.signature_for(function_with_params)).to eq "@function #{name}($bar, $baz: 'qux') { /* ... */ }"
    end

    it "gives a signature to mixins with no params" do
      expect(subject.signature_for(mixin_no_params)).to eq "@mixin #{name}() { /* ... */ }"
    end

    it "gives a signature to mixins with params, including default values" do
      expect(subject.signature_for(mixin_with_params)).to eq "@mixin #{name}($bar, $baz: 'qux') { /* ... */ }"
    end

    it "only prefixes variable names with dollar signs if they don't already exist" do
      function_with_params.params.first.name = "$bar"
      expect(subject.signature_for(function_with_params)).to eq "@function #{name}($bar, $baz: 'qux') { /* ... */ }"
    end

    it "returns nil if the symbol is not a function/ mixin" do
      expect(subject.signature_for(something_else)).to be nil
    end
  end
end
