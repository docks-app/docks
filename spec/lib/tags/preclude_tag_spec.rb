require "spec_helper"

describe Docks::Tags::Preclude do
  subject { Docks::Tags::Preclude.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }

    it "breaks apart precludes on commas, spaces and pipes" do
      precludes = "foo | bar, baz qux"
      symbol[subject.name] = precludes
      subject.process(symbol)
      expect(symbol[subject.name]).to eq Docks::Processors.split_on_commas_spaces_and_pipes(precludes)
    end

    it "joins together multiple lines of precludes" do
      precludes = ["foo | bar, baz qux", "lux fuz"]
      symbol[subject.name] = precludes.dup
      subject.process(symbol)
      expect(symbol[subject.name]).to eq precludes.map { |alias_line| Docks::Processors.split_on_commas_spaces_and_pipes(alias_line) }.flatten
    end
  end
end
