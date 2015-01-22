require "spec_helper"

describe Docks::Tags::Returns do
  subject { Docks::Tags::Returns.instance }

  let(:types) { "{String | Array Object, Number}" }
  let(:description) { "This is the description" }

  it "correctly splits apart types when no description is provided" do
    expect(subject.process([types])[:types]).to eq Docks::Processors::BreakApartTypes.process(types)
  end

  it "correctly splits apart types when a description is provided" do
    type_results = Docks::Processors::BreakApartTypes.process(types)
    expect(subject.process(["#{types} #{description}"])[:types]).to eq type_results
    expect(subject.process(["#{types} -  #{description}"])[:types]).to eq type_results
    expect(subject.process(["#{types}   -#{description}"])[:types]).to eq type_results
    expect(subject.process(["#{types}-  #{description}"])[:types]).to eq type_results
  end

  it "correctly returns a nil description when no description is provided" do
    expect(subject.process([types])[:description]).to be nil
  end

  it "correctly assigns a description when one is provided" do
    target_description = Docks::Processors::JoinWithSmartLineBreaks.process(description)
    expect(subject.process(["#{types} #{description}"])[:description]).to eq target_description
    expect(subject.process(["#{types} -  #{description}"])[:description]).to eq target_description
    expect(subject.process(["#{types}   -#{description}"])[:description]).to eq target_description
    expect(subject.process(["#{types}-  #{description}"])[:description]).to eq target_description
  end
end
