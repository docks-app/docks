require "spec_helper"

describe Docks::Languages do
  subject { Docks::Languages }

  before :each do
    subject.send(:clean)
  end

  describe ".extensions" do
    it "returns all extensions in an array" do
      subject.register(Docks::Languages::Haml)
      subject.register(Docks::Languages::CoffeeScript)

      [Docks::Languages::Haml.extensions].flatten.each do |extension|
        expect(subject.extensions).to include(extension)
      end

      [Docks::Languages::CoffeeScript.extensions].flatten.each do |extension|
        expect(subject.extensions).to include(extension)
      end
    end
  end

  describe ".<type>_extensions" do
    it "has a method to retrieve extensions for each type of file" do
      Docks::Types::Languages.constants.each do |const|
        expect(subject.respond_to?("#{Docks::Types::Languages.const_get(const)}_extensions")).to be true
      end
    end

    it "registers extensions with the correct type" do
      subject.register(Docks::Languages::Haml)
      subject.register(Docks::Languages::CoffeeScript)

      [Docks::Languages::Haml.extensions].flatten.each do |extension|
        expect(subject.send("#{Docks::Languages::Haml.type}_extensions".to_sym)).to include(extension)
        expect(subject.send("#{Docks::Languages::CoffeeScript.type}_extensions".to_sym)).not_to include(extension)
      end

      [Docks::Languages::CoffeeScript.extensions].flatten.each do |extension|
        expect(subject.send("#{Docks::Languages::CoffeeScript.type}_extensions".to_sym)).to include(extension)
        expect(subject.send("#{Docks::Languages::Haml.type}_extensions".to_sym)).not_to include(extension)
      end
    end
  end

  describe ".register_bundled_languages" do
    it "registers all bundled languages" do
      extensions = []
      subject.constants.select do |const|
        klass = subject.const_get(const)
        next unless Class === klass && !(klass.eql?(subject::Base))

        expect(subject).to receive(:register).with(klass).and_call_original
        extensions.concat([klass.extensions].flatten)
      end

      subject.register_bundled_languages

      bundled_extensions = subject.extensions
      extensions.each do |extension|
        expect(bundled_extensions).to include(extension)
      end
    end
  end

  describe ".language_for" do
    it "returns the language associated with a file" do
      subject.register(Docks::Languages::CoffeeScript)

      [Docks::Languages::CoffeeScript.extensions].flatten.each do |extension|
        expect(subject.language_for("foo/bar/baz.#{extension}")).to be Docks::Languages::CoffeeScript.instance
        expect(subject.language_for("foo/bar/baz.min.#{extension}")).to be Docks::Languages::CoffeeScript.instance
      end
    end

    it "returns nil when no language exists to manage that file" do
      expect(subject.language_for("foo/bar/baz.#{[Docks::Languages::Haml.extensions].flatten.first}")).to be nil
    end
  end

  describe ".file_type" do
    it "correctly recognizes a registered file type" do
      subject.register(Docks::Languages::CoffeeScript)

      [Docks::Languages::CoffeeScript.extensions].flatten.each do |extension|
        expect(subject.file_type("foo/bar/baz.#{extension}")).to be Docks::Types::Languages::SCRIPT
        expect(subject.file_type("foo/bar/baz.min.#{extension}")).to be Docks::Types::Languages::SCRIPT
      end
    end

    it "returns nil for an unregistered file type" do
      expect(subject.file_type("foo/bar/baz.coffee")).to be nil
    end
  end

  describe ".supported_file?" do
    it "supports a file type whose extension is associated with a registered language" do
      subject.register(Docks::Languages::CoffeeScript)

      [Docks::Languages::CoffeeScript.extensions].flatten.each do |extension|
        expect(subject.supported_file?("foo/bar/baz.#{extension}")).to be true
        expect(subject.supported_file?("foo/bar/baz.min.#{extension}")).to be true
      end
    end

    it "doesn't support a file whose extension hasn't been registered" do
      expect(subject.supported_file?("foo/bar/baz.coffee")).to be false
    end
  end
end
