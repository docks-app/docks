require "spec_helper"

describe Docks::Tags::ActivateWith do
  subject { Docks::Tags::ActivateWith.instance }

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

    it "breaks apart activate_withs on commas, spaces and pipes" do
      activate_withs = "foo | bar, baz qux"
      symbol[subject.name] = activate_withs
      subject.process(symbol)
      expect(symbol[subject.name]).to eq Docks::Processors.split_on_commas_spaces_and_pipes(activate_withs)
    end

    it "joins together multiple lines of activate_withs" do
      activate_withs = ["foo | bar, baz qux", "lux fuz"]
      symbol[subject.name] = activate_withs.dup
      subject.process(symbol)
      expect(symbol[subject.name]).to eq activate_withs.map { |with| Docks::Processors.split_on_commas_spaces_and_pipes(with) }.flatten
    end
  end
end
