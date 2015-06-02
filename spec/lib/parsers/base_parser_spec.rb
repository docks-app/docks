require "spec_helper"

describe Docks::Parsers::Base do
  subject { Docks::Parsers::Base.instance }

  before :each do
    Docks::Tags.register_bundled_tags
  end

  describe "#parse" do
    let(:example_parser) { Docks::Parsers::SCSS.instance }
    let(:example_files) do
      [
        File.expand_path("../../../fixtures/parsers/scss_parser_fixture_complex.scss", __FILE__),
        File.expand_path("../../../fixtures/parsers/scss_parser_fixture_basic.scss", __FILE__)
      ]
    end

    it "adds a source attribute to the symbol with source file" do
      example_files.each do |file|
        example_parser.parse(file).each do |symbol|
          expect(symbol.source.file).to eq file
        end
      end
    end

    it "adds the language code of the file" do
      example_files.each do |file|
        example_parser.parse(file).each do |symbol|
          expect(symbol.source.language_code).to eq Docks::Languages.extension_for_file(file)
        end
      end
    end
  end

  describe "#parse_comment_block" do
    it "adds a description when it is leading without a tag name" do
      description = "This is\na description"
      symbol = subject.parse_comment_block(description)
      expect(symbol.description.join("\n")).to eq description
    end

    it "adds a normal tag to an array of results" do
      title = "Next Tab"
      symbol = subject.parse_comment_block("    @title #{title}")
      expect(symbol.title).to eq title
    end

    it "adds a multiple-per-block tag to an array of arrays" do
      param = "{String} name"
      symbol = subject.parse_comment_block("   @param #{param}")
      expect(symbol.param).to eq [[param]]
    end

    it "adds a result even when there is no text content following the tag" do
      symbol = subject.parse_comment_block("  @class")
      expect(symbol[:class]).to eq ""
    end

    it "appends a second line of a normal tag to the same result array" do
      line_one = "html"
      line_two = " <p>Hello</p>"
      symbol = subject.parse_comment_block(" @example #{line_one}\n#{line_two}")
      example_result = symbol.example.first
      expect(example_result.length).to eq 2
      expect(example_result[0]).to eq line_one
      expect(example_result[1]).to eq line_two
    end

    it "adds details for multiple tags" do
      title = "Title"
      subtitle = "Subtitle"
      symbol = subject.parse_comment_block("  @title #{title}\n  @subtitle #{subtitle}")
      expect(symbol.title).to eq title
      expect(symbol.subtitle).to eq subtitle
    end

    it "adds a new array to multiple_allowed tags when other tags are between the first and second ones" do
      param_one = "{String} name - The\nname"
      param_two = "{Number} count - The\ncount"
      title = "Title"
      subtitle = "Subtitle"

      symbol = subject.parse_comment_block("@param #{param_one}\n@title #{title}\n@subtitle #{subtitle}\n@param #{param_two}")
      expect(symbol.title).to eq title
      expect(symbol.subtitle).to eq subtitle
      expect(symbol.param).to include(param_one.split("\n"))
      expect(symbol.param).to include(param_two.split("\n"))
    end

    it "keeps only the last instance of a one_per_file tag" do
      pattern_one = "Buttons"
      pattern_two = "No, wait, Forms!"

      symbol = subject.parse_comment_block("@pattern #{pattern_one}\n@pattern #{pattern_two}")
      expect(symbol.pattern).not_to eq pattern_one
      expect(symbol.pattern).to eq pattern_two
    end

    it "does not include lines following non-multiline comments even if the following lines include no tag" do
      pattern = "Button"
      following_line = "Here is some more content"

      symbol = subject.parse_comment_block("@pattern #{pattern}\n#{following_line}")
      expect(symbol.pattern).to eq pattern
      expect(symbol.description).to include(following_line)
    end

    it "only removes one space after the tag name" do
      pattern = "Button"
      symbol = subject.parse_comment_block("@pattern   #{pattern}")
      expect(symbol.pattern).to eq "  #{pattern}"
    end

    it "preserves newlines in multiline tags" do
      description = "This is\na description"
      symbol = subject.parse_comment_block(description)
      expect(symbol.description.join("\n")).to eq description
    end
  end
end
