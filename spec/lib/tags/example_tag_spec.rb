#TODO: check for leading whitespace when there is no language/ description

require "spec_helper"

describe Docks::Tags::Example do
  subject { Docks::Tags::Example.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }
    let(:code) { "foo = (bar) ->" }
    let(:language) { "coffee" }

    before(:each) { Docks::Languages.register_bundled_languages }

    it "calls the code block processor" do
      expect(subject).to receive(:code_block_with_language_and_description).and_call_original
      symbol[subject.name] = [[language, code]]
      subject.process(symbol)
      expect(symbol[subject.name].first).to eq OpenStruct.new(language: language, code: code)
    end

    it "uses the extension for the current file as the language when none is provided" do
      expect(Docks).to receive(:current_file).and_return "foo_bar.#{language}"
      symbol[subject.name] = [[code]]
      subject.process(symbol)
      expect(symbol[subject.name].first).to eq OpenStruct.new(language: language, code: code)
    end
  end
end
