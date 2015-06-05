require "spec_helper"

describe Docks::SymbolSources do
  subject { described_class }

  before(:each) do
    Docks::Languages.register_bundled_languages
  end

  describe "#path_for" do
    it "returns nil when no sources recognize a symbol" do
      expect(subject.path_for("foo")).to be nil
    end

    it "returns the path from a symbol source that recognizes the symbol" do
      expect(subject.path_for("jquery")).to eq Docks::SymbolSources::JQuery.instance.path_for("jquery")
    end
  end
end
