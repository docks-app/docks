require "spec_helper"

describe Docks::Tags::Returns do
  subject { Docks::Tags::Returns.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "allows only one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    let(:types) { "{String | Array Object, Number}" }
    let(:description) { "This is the description" }

    it "splits apart types when no description is provided" do
      expect(subject.process([types])[:types]).to eq Docks::Processors::BreakApartTypes.process(types)
    end

    it "splits apart types when no description and no curly braces are provided" do
      expect(subject.process([types.gsub("{", "").gsub("}", "")])[:types]).to eq Docks::Processors::BreakApartTypes.process(types)
    end

    it "sets the value to nil when no types are provided" do
      expect(subject.process([""])).to be nil
      expect(subject.process(["  "])).to be nil
    end

    it "sets the value to nil when 'nothing' is set as the type" do
      expect(subject.process([""])).to be nil
      expect(subject.process(["  "])).to be nil
    end

    it "splits apart types when a description is provided" do
      type_results = Docks::Processors::BreakApartTypes.process(types)
      expect(subject.process(["#{types} #{description}"])[:types]).to eq type_results
      expect(subject.process(["#{types} -  #{description}"])[:types]).to eq type_results
      expect(subject.process(["#{types}   -#{description}"])[:types]).to eq type_results
      expect(subject.process(["#{types}-  #{description}"])[:types]).to eq type_results
    end

    it "returns a nil description when no description is provided" do
      expect(subject.process([types])[:description]).to be nil
    end

    it "assigns a description when one is provided" do
      target_description = Docks::Processors::JoinWithSmartLineBreaks.process(description)
      expect(subject.process(["#{types} #{description}"])[:description]).to eq target_description
      expect(subject.process(["#{types} -  #{description}"])[:description]).to eq target_description
      expect(subject.process(["#{types}   -#{description}"])[:description]).to eq target_description
      expect(subject.process(["#{types}-  #{description}"])[:description]).to eq target_description
    end
  end
end
