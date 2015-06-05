require "spec_helper"

describe Docks::SymbolSources::JQuery do
  subject { described_class.instance }

  describe "#recognizes?" do
    it "doesn't recognize a language that isn't a scripting one" do
      Docks::Languages.register_bundled_languages
      expect(subject.recognizes?("jQuery", language: "js")).to be true
      expect(subject.recognizes?("jQuery", language: "coffee")).to be true
      expect(subject.recognizes?("jQuery", language: "css")).to be false
    end

    it "identifies a jQuery object" do
      expect(subject.recognizes?("jQuery")).to be true
      expect(subject.recognizes?("jquery")).to be true
    end
  end

  describe "#path_for" do
    it "creates a path to jQuery API page" do
      expect(subject.path_for("jQuery")).to eq "http://api.jquery.com/"
    end
  end
end
