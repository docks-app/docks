require "spec_helper"

describe Docks::Tags::IncludeWith do
  subject { Docks::Tags::IncludeWith.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }

    it "breaks apart include_with on commas, spaces and pipes" do
      include_with = "foo | bar, baz qux"
      symbol[subject.name] = include_with
      subject.process(symbol)
      expect(symbol[subject.name]).to eq Docks::Processors.split_on_commas_spaces_and_pipes(include_with)
    end

    it "joins together multiple lines of include_with" do
      include_with = ["foo | bar, baz qux", "lux fuz"]
      symbol[subject.name] = include_with.dup
      subject.process(symbol)
      expect(symbol[subject.name]).to eq include_with.map { |with| Docks::Processors.split_on_commas_spaces_and_pipes(with) }.flatten
    end
  end

  describe "post_process" do
    describe "mirror the inclusion in the referenced symbol" do
      let(:component) { Docks::Containers::Component.new(name: "foo") }
      let(:included_component) { Docks::Containers::Component.new(name: "bar", include_with: [component.name]) }
      let(:included_variation) { Docks::Containers::State.new(name: "baz--qux", include_with: [component.name]) }
      let(:containing_component) { Docks::Containers::Component.new(name: "bar", states: [included_variation]) }
      let(:pattern) { Docks::Containers::Pattern.new(name: "foo") }

      it "joins included components" do
        pattern.add(:style, [component, included_component])
        post_process

        expect(component.included_symbols).to be_an Array
        expect(component.included_symbols.length).to be 1
        expect(component.included_symbols).to include included_component
      end

      it "joins included variations" do
        pattern.add(:style, [component, containing_component])
        post_process

        expect(component.included_symbols).to be_an Array
        expect(component.included_symbols.length).to be 1
        expect(component.included_symbols).to include included_variation
      end

      it "joins included subcomponents" do
        other_component =  Docks::Containers::Component.new(name: "fizz", subcomponents: [containing_component, included_component])
        pattern.add(:style, [component, other_component])
        post_process

        expect(component.included_symbols).to be_an Array
        expect(component.included_symbols.length).to be 2
        expect(component.included_symbols).to include included_component
        expect(component.included_symbols).to include included_variation
      end

      def post_process
        Docks::Process.process(pattern)
      end
    end
  end
end
