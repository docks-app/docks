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
    let(:symbol) { Docks::Containers::Symbol.new }
    let(:version) { "1.5.0-beta003" }
    let(:description) { "This is the description" }

    it "correctly sets the version when no description is provided" do
      expect(process_since_with(version).version).to eq version
    end

    it "correctly sets the version when a description is provided" do
      expect(process_since_with("#{version} #{description}").version).to eq version
      expect(process_since_with("#{version} -  #{description}").version).to eq version
      expect(process_since_with("#{version}   -#{description}").version).to eq version
    end

    it "correctly returns a nil description when no description is provided" do
      expect(process_since_with(version).description).to be nil
    end

    it "correctly assigns a description when one is provided" do
      target_description = Docks::Processors.join_with_smart_line_breaks(description)
      expect(process_since_with("#{version} #{description}").description).to eq target_description
      expect(process_since_with("#{version} -  #{description}").description).to eq target_description
      expect(process_since_with("#{version}   -#{description}").description).to eq target_description
    end

    private

    def process_since_with(content)
      symbol[subject.name] = content
      subject.process(symbol)
      symbol[subject.name]
    end
  end
end
