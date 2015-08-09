require "spec_helper"

describe Docks::Tags::Signature do
  subject { Docks::Tags::Signature.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "only allows one description per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "connects multiline content with line breaks" do
      signature = ["foo", "bar"]
      symbol = Docks::Containers::Symbol.new(signature: signature.dup)
      subject.process(symbol)
      expect(symbol[subject.name]).to eq signature.join("\n")
    end
  end

  describe "post process" do
    before(:each) { Docks::Languages.register_bundled_languages }

    let(:script_source) { OpenStruct.new(file: "foo.coffee") }

    let(:mixin) { Docks::Containers::Mixin.new(name: "foo", source: OpenStruct.new(file: "foo.scss")) }
    let(:function) { Docks::Containers::Function.new(name: "foo", source: script_source) }
    let(:method) { Docks::Containers::Function.new(name: "foo", source: script_source) }

    let(:klass) do
      klass = Docks::Containers::Klass.new(name: "Foo", source: script_source)
      klass.add_member(method)
      klass
    end

    let(:factory) do
      factory = Docks::Containers::Factory.new(name: "Bar", source: script_source)
      factory.add_member(method)
      factory
    end

    let(:object) do
      object = Docks::Containers::Variable.new(name: "Baz", object: true, source: script_source)
      object.add_member(method)
      object
    end

    let(:pattern) { Docks::Containers::Pattern.new(name: "foo") }

    it "asks the language for a function to update the signature" do
      pattern.add(:script, function)
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(function).and_return("foo")

      post_process

      expect(function.signature).to eq "foo"
    end

    it "asks the language for a mixin to update the signature" do
      pattern.add(:style, mixin)
      expect(Docks::Languages::Sass.instance).to receive(:signature_for).with(mixin).and_return("foo")

      post_process

      expect(mixin.signature).to eq "foo"
    end

    it "asks the language for a class and its methods to update the signature" do
      pattern.add(:script, klass)
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(klass).and_return("foo")
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(method).and_return("bar")

      post_process

      expect(klass.signature).to eq "foo"
      expect(method.signature).to eq "bar"
    end

    it "asks the language for a factory and its methods to update the signature" do
      pattern.add(:script, factory)
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(factory).and_return("foo")
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(method).and_return("bar")

      post_process

      expect(factory.signature).to eq "foo"
      expect(method.signature).to eq "bar"
    end

    it "asks the language for an object's methods to update the signature" do
      pattern.add(:script, object)
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(method).and_return("foo")

      post_process

      expect(method.signature).to eq "foo"
    end

    it "adds signatures for nested methods" do
      second_method = Docks::Containers::Function.new(name: "foo", source: script_source)
      method.add_member(second_method)

      pattern.add(:script, object)
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(method).and_return("foo")
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(second_method).and_return("bar")

      post_process

      expect(method.signature).to eq "foo"
      expect(second_method.signature).to eq "bar"
    end

    it "doesn't replace a singature that exists" do
      factory.signature = "Bar = (node) ->"
      pattern.add(:script, factory)
      expect { post_process }.to_not change { factory.signature }
    end

    def post_process
      Docks::Process.process(pattern)
    end
  end
end
