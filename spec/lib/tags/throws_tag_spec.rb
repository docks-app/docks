require "spec_helper"

describe Docks::Tags::Throws do
  subject { Docks::Tags::Throws.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "allows only multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }
    let(:types) { "{TypeError | NameError DocksError, Error}" }
    let(:description) { "This is the description" }

    it "splits apart types when no description is provided" do
      expect(process_throws_with(types).types).to eq Docks::Processors.split_types(types)
    end

    it "splits apart types when a description is provided" do
      type_results = Docks::Processors.split_types(types)
      expect(process_throws_with("#{types} #{description}").types).to eq type_results
      expect(process_throws_with("#{types} -  #{description}").types).to eq type_results
      expect(process_throws_with("#{types}   -#{description}").types).to eq type_results
      expect(process_throws_with("#{types}-  #{description}").types).to eq type_results
    end

    it "returns a nil description when no description is provided" do
      expect(process_throws_with(types).description).to be nil
    end

    it "assigns a description when one is provided" do
      target_description = Docks::Processors.join_with_smart_line_breaks(description)
      expect(process_throws_with("#{types} #{description}").description).to eq target_description
      expect(process_throws_with("#{types} -  #{description}").description).to eq target_description
      expect(process_throws_with("#{types}   -#{description}").description).to eq target_description
      expect(process_throws_with("#{types}-  #{description}").description).to eq target_description
    end

    def process_throws_with(content)
      symbol[subject.name] = content
      subject.process(symbol)
      symbol[subject.name].first
    end
  end
end
