require "spec_helper"

describe Docks::Language do
  subject { Docks::Language }
  before :each do
    subject.send(:clear_languages)
  end

  describe "extensions" do
    it "registers all bundled language extensions" do
      subject.register_bundled_languages
      extensions = subject.extensions

      bundled = Docks::Languages.constants.select do |const|
        klass = Docks::Languages.const_get(const)
        Class === klass && !(klass.eql?(Docks::Languages::Base))
      end

      bundled.each do |bundled_language|
        [Docks::Languages.const_get(bundled_language).extensions].flatten.each do |ext|
          expect(extensions).to include ext
        end
      end
    end

    it "has a method to retrieve extensions for each type of file" do
      Docks::Types::Languages.constants.each do |const|
        expect(subject.respond_to?("#{Docks::Types::Languages.const_get(const)}_extensions")).to be true
      end
    end

    it "registers extensions with the correct type" do
      subject.register(OpenStruct.new(type: Docks::Types::Languages::MARKUP, extensions: "haml"))
      subject.register(OpenStruct.new(type: Docks::Types::Languages::SCRIPT, extensions: ["coffeescript", "coffee"]))

      expect(subject.markup_extensions).to include "haml"
      expect(subject.markup_extensions).not_to include "coffee"
      expect(subject.markup_extensions).not_to include "coffeescript"
      expect(subject.script_extensions).to include "coffee"
      expect(subject.script_extensions).to include "coffeescript"
      expect(subject.script_extensions).not_to include "haml"
    end
  end

  describe ".file_type" do
    it "correctly recognizes a registered file type" do
      subject.register(OpenStruct.new(type: Docks::Types::Languages::SCRIPT, extensions: ["coffee", "coffeescript"]))
      expect(subject.file_type("foo/bar/baz.coffee")).to be Docks::Types::Languages::SCRIPT
      expect(subject.file_type("foo/bar/baz.coffeescript")).to be Docks::Types::Languages::SCRIPT
      expect(subject.file_type("foo/bar/baz.min.coffee")).to be Docks::Types::Languages::SCRIPT
    end

    it "correctly returns nil for an unregistered file type" do
      expect(subject.file_type("foo/bar/baz.coffee")).to be nil
    end
  end
end
