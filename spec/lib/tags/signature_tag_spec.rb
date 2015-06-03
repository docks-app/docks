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

    let(:mixin) { Docks::Containers::Mixin.new(name: "foo", source: OpenStruct.new(file: "foo.scss")) }
    let(:function) { Docks::Containers::Function.new(name: "foo", source: OpenStruct.new(file: "foo.coffee")) }
    let(:method) { Docks::Containers::Function.new(name: "foo", source: OpenStruct.new(file: "foo.coffee")) }
    let(:klass) { Docks::Containers::Klass.new(name: "Foo", methods: [method], source: OpenStruct.new(file: "foo.coffee")) }
    let(:factory) { Docks::Containers::Factory.new(name: "Bar", methods: [method], source: OpenStruct.new(file: "foo.coffee")) }
    let(:pattern) { Docks::Containers::Pattern.new("foo") }

    it "asks the language for a function to update the signature" do
      pattern.add(:script, function)
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(function).and_return("foo")
      post_process
      expect(function.signature).to eq "foo"
    end

    it "asks the language for a mixin to update the signature" do
      pattern.add(:script, mixin)
      expect(Docks::Languages::Sass.instance).to receive(:signature_for).with(mixin).and_return("foo")
      post_process
      expect(mixin.signature).to eq "foo"
    end

    it "asks the language for a class and its methods to update the signature" do
      pattern.add(:script, klass)
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(klass).and_return("foo")
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(method).and_return("foo")
      post_process
      expect(klass.signature).to eq "foo"
      expect(method.signature).to eq "foo"
    end

    it "asks the language for a factory and its methods to update the signature" do
      pattern.add(:script, factory)
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(factory).and_return("foo")
      expect(Docks::Languages::CoffeeScript.instance).to receive(:signature_for).with(method).and_return("foo")
      post_process
      expect(factory.signature).to eq "foo"
      expect(method.signature).to eq "foo"
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
