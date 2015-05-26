require "spec_helper"

describe Docks::SymbolSources do
  subject { described_class }

  after :each do
    subject.send(:clear)
  end

  describe ".register_bundled_symbol_sources" do
    it "registers all bundled languages" do
      subject.constants.select do |const|
        klass = subject.const_get(const)
        next unless Class === klass && !(klass.eql?(subject::Base))
        expect(subject).to receive(:register).with(klass).and_call_original
      end

      subject.register_bundled_symbol_sources
    end
  end

  describe "#path_for" do
    before :each do
      subject.register_bundled_symbol_sources
    end

    it "returns nil when no sources recognize a symbol" do
      expect(subject.path_for("foo")).to be nil
    end

    it "returns the path from a symbol source that recognizes the symbol" do
      expect(subject.path_for("jquery")).to eq Docks::SymbolSources::JQuery.new.path_for("jquery")
    end
  end
end

describe Docks::SymbolSources::MDN do
  subject { described_class.new }

  describe "#recognizes?" do
    it "identifies a symbol that is a global object" do
      expect(subject.recognizes?("Object")).to be true
      expect(subject.recognizes?("object")).to be true
      expect(subject.recognizes?("Array")).to be true
      expect(subject.recognizes?("String")).to be true
      expect(subject.recognizes?("Iterator")).to be true
      expect(subject.recognizes?("Set")).to be true
    end
  end

  describe "#path_for" do
    it "creates a path to the MDN reference for a global object" do
      expect(subject.path_for("Object")).to eq "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"
    end
  end
end

describe Docks::SymbolSources::JQuery do
  subject { described_class.new }

  describe "#recognizes?" do
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
