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
    it "uses the extension for the current file as the language when none is provided" do
      allow(Docks::Parser).to receive(:current_file) { "foo_bar.coffee" }
      result = subject.process(["foo = (bar) ->"])
      expect(result[:language]).to eq "coffee"
    end
  end
end
