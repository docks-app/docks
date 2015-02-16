require "spec_helper"

describe Docks do
  subject { Docks }

  it "has a configuration property" do
    expect(subject.configuration).to be Docks::Configuration.instance
  end

  describe ".configure" do
    it "yields the configuration object" do
      yielded = nil
      subject.configure { |config| yielded = config }
      expect(yielded).to be Docks::Configuration.instance
    end

    it "sets configured to true" do
      subject.configured = false
      subject.configure { }
      expect(subject.configured).to be true
    end

    it "pre- and post-configures before configuration" do
      expect(subject).to receive(:pre_configuration)
      expect(subject).to receive(:post_configuration)
      subject.configure { }
    end
  end
end

describe Docks::Configuration do
  subject { Docks::Configuration.instance }

  it "has the default configuration" do
  end

  describe ".custom_parsers" do
    it "yields the parser manager" do
      yielded = nil
      subject.custom_parsers { |parsers| yielded = parsers }
      expect(yielded).to be Docks::Parser
    end
  end

  describe ".custom_languages" do
    it "yields the language manager" do
      yielded = nil
      subject.custom_languages { |languages| yielded = languages }
      expect(yielded).to be Docks::Language
    end
  end
end
