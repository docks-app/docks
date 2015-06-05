require "spec_helper"

describe Docks::SymbolSources::MDN do
  subject { described_class.instance }

  describe "#recognizes?" do
    it "doesn't recognize a language that isn't a scripting one" do
      Docks::Languages.register_bundled_languages
      expect(subject.recognizes?("Object", language: "js")).to be true
      expect(subject.recognizes?("Object", language: "coffee")).to be true
      expect(subject.recognizes?("Object", language: "css")).to be false
    end

    it "identifies a symbol that is a global object" do
      expect(subject.recognizes?("Object")).to be true
      expect(subject.recognizes?("object")).to be true
      expect(subject.recognizes?("Array")).to be true
      expect(subject.recognizes?("String")).to be true
      expect(subject.recognizes?("Iterator")).to be true
      expect(subject.recognizes?("Set")).to be true
    end

    it "identifies a symbol that is a web API object" do
      expect(subject.recognizes?("HTMLElement")).to be true
      expect(subject.recognizes?("htmlelement")).to be true
      expect(subject.recognizes?("Blob")).to be true
      expect(subject.recognizes?("NodeList")).to be true
    end
  end

  describe "#path_for" do
    it "creates a path to the MDN reference for a global object" do
      expect(subject.path_for("Object")).to eq "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"
    end

    it "creates a path to the MDN reference for a web API object" do
      expect(subject.path_for("NodeList")).to eq "https://developer.mozilla.org/docs/Web/API/NodeList"
    end
  end
end
