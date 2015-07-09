require "spec_helper"

describe Docks::Tags::Author do
  subject { Docks::Tags::Author.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }
    let(:simple_content) { "Chris Sauve" }
    let(:email) { "chrismsauve@gmail.com" }
    let(:github) { "lemonmade" }
    let(:complex_content) { "#{simple_content} (#{email}, github: #{github})" }

    it "creates an array of authors even when only one is provided" do
      expect(process_author_with(simple_content)).to be_an(Array)
    end

    it "creates a :name when there are no other details" do
      result = process_author_with(simple_content).first
      expect(result.name).to eq simple_content
    end

    it "creates a :name when there are other details" do
      result = process_author_with(complex_content).first
      expect(result.name).to eq simple_content
    end

    it "does not create an :email when no parentheses are provided" do
      result = process_author_with(simple_content).first
      expect(result.email).to be nil
    end

    it "creates details when one is provided without a key" do
      result = process_author_with(complex_content).first
      expect(result.email).to eq email
      expect(result.github).to eq github
    end

    it "creates details when keys are provided for all values" do
      complex_content.sub!("(", "(email: ")
      result = process_author_with(complex_content).first
      expect(result.email).to eq email
      expect(result.github).to eq github
    end

    it "creates an author for each name separated by commas" do
      input = "#{simple_content},  #{simple_content} ,#{simple_content}"
      result = process_author_with(input)
      expect(result.length).to be 3

      result.each do |author|
        expect(author.name).to eq simple_content
      end
    end

    it "creates an author for each name separated by pipes" do
      input = "#{simple_content}|  #{simple_content} |#{simple_content}"
      result = process_author_with(input)
      expect(result.length).to be 3

      result.each do |author|
        expect(author.name).to eq simple_content
      end
    end

    it "creates an author for a complex author after a simple author name, separated by commas" do
      input = "#{simple_content}, #{complex_content}"
      result = process_author_with(input)
      expect(result.length).to be 2

      expect(result.first.name).to eq simple_content
      expect(result[1].name).to eq simple_content
      expect(result[1].email).to eq email
      expect(result[1].github).to eq github
    end

    it "creates an author for a complex author after a simple author name, separated by pipes" do
      input = "#{simple_content} |#{complex_content}"
      result = process_author_with(input)
      expect(result.length).to be 2

      expect(result.first.name).to eq simple_content
      expect(result[1].name).to eq simple_content
      expect(result[1].email).to eq email
      expect(result[1].github).to eq github
    end

    it "creates an author for a simple author after a complex author name, separated by spaces" do
      input = "#{complex_content}   #{simple_content}"
      result = process_author_with(input)
      expect(result.length).to be 2

      expect(result.first.name).to eq simple_content
      expect(result.first.email).to eq email
      expect(result.first.github).to eq github
      expect(result[1].name).to eq simple_content
    end

    it "creates an author for a simple author after a complex author name, separated by commas" do
      input = "#{complex_content},  #{simple_content}"
      result = process_author_with(input)
      expect(result.length).to be 2

      expect(result.first.name).to eq simple_content
      expect(result.first.email).to eq email
      expect(result.first.github).to eq github
      expect(result[1].name).to eq simple_content
    end

    it "creates an author for a simple author after a complex author name, separated by pipes" do
      input = "#{complex_content} || #{simple_content}"
      result = process_author_with(input)
      expect(result.length).to be 2

      expect(result.first.name).to eq simple_content
      expect(result.first.email).to eq email
      expect(result.first.github).to eq github
      expect(result[1].name).to eq simple_content
    end

    it "creates an author with details for each author/ parentheses pair separated by spaces" do
      input = "#{complex_content} #{complex_content}"
      result = process_author_with(input)
      expect(result.length).to be 2

      result.each do |author|
        expect(author.name).to eq simple_content
        expect(author.email).to eq email
        expect(author.github).to eq github
      end
    end

    it "creates an author with details for each author/ parentheses pair separated by pipes" do
      input = "#{complex_content} |#{complex_content}"
      result = process_author_with(input)
      expect(result.length).to be 2

      result.each do |author|
        expect(author.name).to eq simple_content
        expect(author.email).to eq email
        expect(author.github).to eq github
      end
    end

    it "creates an author with details for each author/ parentheses pair separated by commas" do
      input = "#{complex_content},  #{complex_content}"
      result = process_author_with(input)
      expect(result.length).to be 2

      result.each do |author|
        expect(author.name).to eq simple_content
        expect(author.email).to eq email
        expect(author.github).to eq github
      end
    end

    private

    def process_author_with(content)
      symbol[subject.name] = content
      subject.process(symbol)
      symbol[subject.name]
    end
  end
end
