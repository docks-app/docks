require "spec_helper"

describe Docks::Tags::Compatibility do
  subject { Docks::Tags::Compatibility.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  it "allows multiple tags per line" do
    expect(subject.multiple_per_line_allowed?).to be true
  end

  describe "#process" do

    let(:simple_content) { "Chrome" }
    let(:version) { "latest" }
    let(:complex_content) { "#{simple_content} (#{version})" }

    it "creates an array of authors even when only one is provided" do
      expect(subject.process(simple_content)).to be_an(Array)
    end

    it "correctly creates a :browser when there are no other details" do
      result = subject.process(simple_content).first
      expect(result[:browser]).to eq simple_content
    end

    it "correctly creates a :browser when there are other details" do
      result = subject.process(complex_content).first
      expect(result[:browser]).to eq simple_content
    end

    it "does not create a :version when no parentheses are provided" do
      result = subject.process(simple_content).first
      expect(result[:version]).to be nil
    end

    it "correctly creates a :version when it is provided without a key" do
      result = subject.process(complex_content).first
      expect(result[:version]).to eq version
    end

    it "correctly creates a :version when provided with a key" do
      complex_content.sub!("(", "(version: ")
      result = subject.process(complex_content).first
      expect(result[:version]).to eq version
    end

    it "creates an entry for each browser separated by commas" do
      input = "#{simple_content},  #{simple_content} ,#{simple_content}"
      result = subject.process(input)
      expect(result.length).to be 3

      result.each do |author|
        expect(author[:browser]).to eq simple_content
      end
    end

    it "creates an entry for each browser separated by pipes" do
      input = "#{simple_content}|  #{simple_content} |#{simple_content}"
      result = subject.process(input)
      expect(result.length).to be 3

      result.each do |author|
        expect(author[:browser]).to eq simple_content
      end
    end

    it "creates an entry for a complex compatibility detail after a simple browser name, separated by commas" do
      input = "#{simple_content}, #{complex_content}"
      result = subject.process(input)
      expect(result.length).to be 2

      expect(result.first[:browser]).to eq simple_content
      expect(result[1][:browser]).to eq simple_content
      expect(result[1][:version]).to eq version
    end

    it "creates an entry for a complex compatibility detail after a simple browser name, separated by pipes" do
      input = "#{simple_content} |#{complex_content}"
      result = subject.process(input)
      expect(result.length).to be 2

      expect(result.first[:browser]).to eq simple_content
      expect(result[1][:browser]).to eq simple_content
      expect(result[1][:version]).to eq version
    end

    it "creates an entry for a browser name after a complex compatibility detail, separated by spaces" do
      input = "#{complex_content}   #{simple_content}"
      result = subject.process(input)
      expect(result.length).to be 2

      expect(result.first[:browser]).to eq simple_content
      expect(result.first[:version]).to eq version
      expect(result[1][:browser]).to eq simple_content
    end

    it "creates an entry for a browser name after a complex compatibility detail, separated by commas" do
      input = "#{complex_content},  #{simple_content}"
      result = subject.process(input)
      expect(result.length).to be 2

      expect(result.first[:browser]).to eq simple_content
      expect(result.first[:version]).to eq version
      expect(result[1][:browser]).to eq simple_content
    end

    it "creates an entry for a browser name after a complex compatibility detail, separated by pipes" do
      input = "#{complex_content} || #{simple_content}"
      result = subject.process(input)
      expect(result.length).to be 2

      expect(result.first[:browser]).to eq simple_content
      expect(result.first[:version]).to eq version
      expect(result[1][:browser]).to eq simple_content
    end

    it "creates an entry with details for each browser/ parentheses pair separated by spaces" do
      input = "#{complex_content} #{complex_content}"
      result = subject.process(input)
      expect(result.length).to be 2

      result.each do |author|
        expect(author[:browser]).to eq simple_content
        expect(author[:version]).to eq version
      end
    end

    it "creates an entry with details for each browser/ parentheses pair separated by pipes" do
      input = "#{complex_content} |#{complex_content}"
      result = subject.process(input)
      expect(result.length).to be 2

      result.each do |author|
        expect(author[:browser]).to eq simple_content
        expect(author[:version]).to eq version
      end
    end

    it "creates an entry with details for each browser/ parentheses pair separated by commas" do
      input = "#{complex_content},  #{complex_content}"
      result = subject.process(input)
      expect(result.length).to be 2

      result.each do |author|
        expect(author[:browser]).to eq simple_content
        expect(author[:version]).to eq version
      end
    end

  end
end
