require "spec_helper"

describe Docks::Tags::Link do
  subject { Docks::Tags::Link.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }
    let(:simple_content) { "http://apple.com" }
    let(:caption) { "chrismsauve@gmail.com" }
    let(:complex_content) { "#{simple_content} (#{caption})" }

    it "creates a :url when there are no other details" do
      expect(process_link_with(simple_content).first.url).to eq simple_content
    end

    it "creates a :url when there are other details" do
      expect(process_link_with(complex_content).first.url).to eq simple_content
    end

    it "does not create a :caption when no parentheses are provided" do
      expect(process_link_with(simple_content).first.caption).to be nil
    end

    it "creates a :caption when one is provided without a key" do
      expect(process_link_with(complex_content).first.caption).to eq caption
    end

    it "creates a :caption when the key is provided" do
      complex_content.sub!("(", "(caption: ")
      expect(process_link_with(complex_content).first.caption).to eq caption
    end

    private

    def process_link_with(content)
      symbol[subject.name] = content
      subject.process(symbol)
      symbol[subject.name]
    end
  end
end
