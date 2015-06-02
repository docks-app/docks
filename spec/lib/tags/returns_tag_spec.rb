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
    let(:symbol) { Docks::Containers::Symbol.new }
    let(:types) { "{String | Array Object, Number}" }
    let(:description) { "This is the description" }

    it "splits apart types when no description is provided" do
      expect(process_returns_with(types).types).to eq Docks::Processors.split_types(types)
    end

    it "splits apart types when no description and no curly braces are provided" do
      expect(process_returns_with(types.gsub("{", "").gsub("}", "")).types).to eq Docks::Processors.split_types(types)
    end

    it "sets the types to nil when no types are provided" do
      expect(process_returns_with("").types).to be nil
      expect(process_returns_with("   ").types).to be nil
    end

    it "sets the types to nil when 'nothing' is set as the type" do
      expect(process_returns_with("Nothing  ").types).to be nil
    end

    it "preserves a description when the type is nothing" do
      returns = process_returns_with("nothing - foo")
      expect(returns.types).to be nil
      expect(returns.description).to eq "foo"
    end

    it "splits apart types when a description is provided" do
      type_results = Docks::Processors.split_types(types)
      expect(process_returns_with("#{types} #{description}").types).to eq type_results
      expect(process_returns_with("#{types} -  #{description}").types).to eq type_results
      expect(process_returns_with("#{types}   -#{description}").types).to eq type_results
      expect(process_returns_with("#{types}-  #{description}").types).to eq type_results
    end

    it "returns a nil description when no description is provided" do
      expect(process_returns_with([types]).description).to be nil
    end

    it "assigns a description when one is provided" do
      target_description = Docks::Processors.join_with_smart_line_breaks(description)
      expect(process_returns_with("#{types} #{description}").description).to eq target_description
      expect(process_returns_with("#{types} -  #{description}").description).to eq target_description
      expect(process_returns_with("#{types}   -#{description}").description).to eq target_description
      expect(process_returns_with("#{types}-  #{description}").description).to eq target_description
    end

    it "splits a apart types without curly braces with a following description" do
      types.gsub!("{", "")
      types.gsub!("}", "")

      type_results = Docks::Processors.split_types(types)
      expect(process_returns_with("#{types} -  #{description}").types).to eq type_results
      expect(process_returns_with("#{types}   -#{description}").types).to eq type_results
      expect(process_returns_with("#{types}-  #{description}").types).to eq type_results

      target_description = Docks::Processors.join_with_smart_line_breaks(description)
      expect(process_returns_with("#{types} -  #{description}").description).to eq target_description
      expect(process_returns_with("#{types}   -#{description}").description).to eq target_description
      expect(process_returns_with("#{types}-  #{description}").description).to eq target_description
    end

    private

    def process_returns_with(content)
      symbol[subject.name] = content
      subject.process(symbol)
      symbol[subject.name]
    end
  end
end
