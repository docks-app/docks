require "spec_helper"

describe Docks::Tags::Deprecated do
  subject { Docks::Tags::Deprecated.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "allows only one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }
    let(:simple_version) { "v2.0" }
    let(:complex_version) { "Version 2.0.32-b2034" }
    let(:description) { "This is the description" }

    it "returns just the version when no description is provided" do
      expect(process_deprecation_with([simple_version]).version).to eq simple_version
    end

    it "gets a simple version when a description is provided" do
      expect(process_deprecation_with(["#{simple_version}   - #{description}"]).version).to eq simple_version
      expect(process_deprecation_with(["#{simple_version} -  #{description}"]).version).to eq simple_version
    end

    it "gets a complex version when a description is provided" do
      expect(process_deprecation_with(["#{complex_version}   - #{description}"]).version).to eq complex_version
      expect(process_deprecation_with(["#{complex_version} -  #{description}"]).version).to eq complex_version
    end

    it "returns a nil description when no description is provided" do
      expect(process_deprecation_with([complex_version]).description).to be nil
    end

    it "assigns a description when one is provided" do
      target_description = Docks::Processors.join_with_smart_line_breaks(description)
      expect(process_deprecation_with(["#{complex_version}   - #{description}"]).description).to eq target_description
      expect(process_deprecation_with(["#{complex_version} -  #{description}"]).description).to eq target_description
    end

    def process_deprecation_with(content)
      symbol[subject.name] = content
      subject.process(symbol)
      symbol[subject.name]
    end
  end
end
