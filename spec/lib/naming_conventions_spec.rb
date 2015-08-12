require "spec_helper"

describe Docks::NamingConventions do
  subject { described_class }
  let(:convention) { described_class::BEM }

  describe ".for" do
    it "gets the convention from a string" do
      expect(described_class.for("BEM")).to be_a convention
    end

    it "gets the convention from a symbol" do
      expect(described_class.for(:BEM)).to be_a convention
    end

    it "gets the convention from a class" do
      expect(described_class.for(convention)).to be_a convention
    end

    it "gets the convention from an instance" do
      expect(described_class.for(convention.instance)).to be_a convention
    end

    it "doesn't throw an error when it fails" do
      expect { described_class.for(:FOO) }.not_to raise_error
    end
  end
end
