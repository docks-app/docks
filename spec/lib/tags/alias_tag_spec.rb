require "spec_helper"

describe Docks::Tags::Alias do
  subject { Docks::Tags::Alias.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  it "allows multiple tags per line" do
    expect(subject.multiple_per_line_allowed?).to be true
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }

    it "breaks apart aliases on commas, spaces and pipes" do
      aliases = "foo | bar, baz qux"
      symbol[subject.name] = aliases
      subject.process(symbol)
      expect(symbol[subject.name]).to eq Docks::Processors.split_on_commas_spaces_and_pipes(aliases)
    end

    it "joins together multiple lines of aliases" do
      aliases = ["foo | bar, baz qux", "lux fuz"]
      symbol[subject.name] = aliases.dup
      subject.process(symbol)
      expect(symbol[subject.name]).to eq aliases.map { |alias_line| Docks::Processors.split_on_commas_spaces_and_pipes(alias_line) }.flatten
    end
  end
end
