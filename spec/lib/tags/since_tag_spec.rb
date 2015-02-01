require "spec_helper"

describe Docks::Tags::Since do
  subject { Docks::Tags::Since.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "allows only one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    let(:version) { "1.5.0-beta003" }
    let(:description) { "This is the description" }

    it "correctly sets the version when no description is provided" do
      expect(subject.process([version])[:version]).to eq version
    end

    it "correctly sets the version when a description is provided" do
      expect(subject.process(["#{version} #{description}"])[:version]).to eq version
      expect(subject.process(["#{version} -  #{description}"])[:version]).to eq version
      expect(subject.process(["#{version}   -#{description}"])[:version]).to eq version
    end

    it "correctly returns a nil description when no description is provided" do
      expect(subject.process([version])[:description]).to be nil
    end

    it "correctly assigns a description when one is provided" do
      target_description = Docks::Processors::JoinWithSmartLineBreaks.process(description)
      expect(subject.process(["#{version} #{description}"])[:description]).to eq target_description
      expect(subject.process(["#{version} -  #{description}"])[:description]).to eq target_description
      expect(subject.process(["#{version}   -#{description}"])[:description]).to eq target_description
    end
  end
end
