require "spec_helper"

describe Docks::Tags::Require do
  subject { Docks::Tags::Require.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }

    it "breaks apart requires on commas, spaces and pipes" do
      requires = "foo | bar, baz qux"
      symbol[subject.name] = requires
      subject.process(symbol)
      expect(symbol[subject.name]).to eq Docks::Processors.split_on_commas_spaces_and_pipes(requires)
    end

    it "joins together multiple lines of requires" do
      requires = ["foo | bar, baz qux", "lux fuz"]
      symbol[subject.name] = requires.dup
      subject.process(symbol)
      expect(symbol[subject.name]).to eq requires.map { |alias_line| Docks::Processors.split_on_commas_spaces_and_pipes(alias_line) }.flatten
    end
  end
end
