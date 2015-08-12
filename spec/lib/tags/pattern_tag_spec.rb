require "spec_helper"

describe Docks::Tags::Pattern do
  subject { Docks::Tags::Pattern.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "does not perform any processing" do
      content = "foo"
      expect(subject.process(content)).to eq content
    end
  end

  describe "post processing" do
    let(:symbols) do
      [
        Docks::Containers::Klass.new(name: "Foo"),
        Docks::Containers::Factory.new(name: "Bar"),
        Docks::Containers::Function.new(name: "fooBar"),
        Docks::Containers::Variable.new(name: "baz")
      ]
    end

    let(:pattern) do
      pattern = Docks::Containers::Pattern.new(name: "foo")
      pattern.add(:script, symbols)
      pattern
    end

    before(:each) do
      Docks::Tags.register(described_class)
    end

    it "adds the pattern name to all contained symbols" do
      Docks::Process.process(pattern)

      pattern.symbols.each do |symbol|
        expect(symbol[subject]).to eq pattern.name
      end
    end
  end
end
