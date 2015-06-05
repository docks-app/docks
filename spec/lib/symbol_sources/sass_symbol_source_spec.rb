require 'spec_helper'

describe Docks::SymbolSources::Sass do
  subject { described_class.instance }

  describe "#recognizes?" do
    it "only recognizes Sass" do
      Docks::Languages.register_bundled_languages
      expect(subject.recognizes?("Color", language: "sass")).to be true
      expect(subject.recognizes?("Color", language: "scss")).to be true
      expect(subject.recognizes?("Color", language: "css")).to be false
      expect(subject.recognizes?("Color", language: "js")).to be false
    end

    it "identifies a symbol that a Sass value object" do
      expect(subject.recognizes?("arglist")).to be true
      expect(subject.recognizes?("color")).to be true
      expect(subject.recognizes?("list")).to be true
      expect(subject.recognizes?("map")).to be true
      expect(subject.recognizes?("null")).to be true
      expect(subject.recognizes?("number")).to be true
      expect(subject.recognizes?("string")).to be true
    end

    it "identifies the function symbol" do
      expect(subject.recognizes?("function")).to be true
    end
  end

  describe "#path_for" do
    it "creates a path to Sass values" do
      expect(subject.path_for("color")).to eq "http://sass-lang.com/documentation/Sass/Script/Value/Color.html"
    end

    it "creates a path to Sass functions" do
      expect(subject.path_for("Function")).to eq "http://sass-lang.com/documentation/Sass/Script/Script/Functions.html"
    end
  end
end
