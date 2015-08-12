require "spec_helper"

describe Docks::Themes do
  subject { described_class }
  let(:theme) { described_class::API }

  describe ".for" do
    it "gets the theme from a string" do
      expect(described_class.for("API")).to be_a theme
    end

    it "gets the theme from a symbol" do
      expect(described_class.for(:API)).to be_a theme
    end

    it "gets the theme from a class" do
      expect(described_class.for(theme)).to be_a theme
    end

    it "gets the theme from an instance" do
      expect(described_class.for(theme.instance)).to be_a theme
    end

    it "doesn't throw an error when it fails" do
      expect { described_class.for(:FOO) }.not_to raise_error
    end
  end
end
