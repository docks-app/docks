require "spec_helper"

describe Docks::Languages::Stylus do
  subject { Docks::Languages::Stylus.instance }

  describe ".extensions" do
    let(:extensions) { [subject.class.extensions].flatten }

    it "includes .less as an extension" do
      expect(extensions).to include "styl"
    end
  end

  describe "#signature_for" do
    let(:name) { "foo" }

    let(:mixin_no_params) { Docks::Containers::Mixin.new(name: name) }
    let(:mixin_with_params) { Docks::Containers::Mixin.new(name: name, params: [OpenStruct.new(name: "bar"), OpenStruct.new(name: "baz", default: "'qux'")]) }

    let(:something_else) { Docks::Containers::Component.new(name: name) }

    it "gives a signature to mixins with no params" do
      expect(subject.signature_for(mixin_no_params)).to eq "#{name}() // ..."
    end

    it "gives a signature to mixins with params, including default values" do
      expect(subject.signature_for(mixin_with_params)).to eq "#{name}(bar, baz = 'qux') // ..."
    end

    it "returns nil if the symbol is not a function/ mixin" do
      expect(subject.signature_for(something_else)).to be nil
    end
  end
end
