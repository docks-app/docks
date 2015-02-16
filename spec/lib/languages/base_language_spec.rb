require "spec_helper"

describe Docks::Languages::Base do
  subject { Docks::Languages::Base.instance }

  describe "#load_stub" do
    it "doesn't do anything to load a stub file" do
      expect(subject.load_stub("foo.bar")).to be nil
    end
  end

  describe "#friendly_presentation" do
    it "defaults the friendly presentation to the name of the symbol" do
      name = "foo"
      expect(subject.friendly_presentation(name: name)).to eq name
    end
  end
end

describe Docks::Languages do
  subject { Docks::Languages }

  describe ".bundled_languages" do
    it "has all bundled languages except the base language" do
      bundled_languages = subject.bundled_languages

      subject.constants.each do |const|
        klass = subject.const_get(const)
        next unless Class === klass && !(klass.eql?(subject::Base))
        expect(bundled_languages).to include klass
      end
    end

    it "caches the bundled languages for subsequent calls" do
      before = subject.bundled_languages
      expect(subject.bundled_languages).to be before
    end
  end
end
