require "spec_helper"

describe Docks::Parsers::Base do
  subject { Docks::Parsers::Base.instance }

  before :all do
    Docks::Tag.register_bundled_tags
  end

  describe "#parse_comment_block" do
    it "adds a description when it is leading without a tag name" do
      description = "This is\na description"
      result = subject.parse_comment_block(description)
      expect(result[:description].join("\n")).to eq description
    end

    it "adds a normal tag to an array of results" do
      title = "Next Tab"
      result = subject.parse_comment_block("    @title #{title}")
      expect(result[:title]).to eq title
    end

    it "adds a multiple-per-block tag to an array of arrays" do
      param = "{String} name"
      result = subject.parse_comment_block("   @param #{param}")
      expect(result[:param]).to eq [[param]]
    end

    it "appends a second line of a normal tag to the same result array" do
      line_one = "html"
      line_two = " <p>Hello</p>"
      result = subject.parse_comment_block(" @example #{line_one}\n#{line_two}")
      example_result = result[:example].first
      expect(example_result.length).to eq 2
      expect(example_result[0]).to eq line_one
      expect(example_result[1]).to eq line_two
    end

    it "adds details for multiple tags" do
      title = "Title"
      subtitle = "Subtitle"
      result = subject.parse_comment_block("  @title #{title}\n  @subtitle #{subtitle}")
      expect(result[:title]).to eq title
      expect(result[:subtitle]).to eq subtitle
    end

    it "adds a new array to multiple_allowed tags when other tags are between the first and second ones" do
      param_one = "{String} name - The\nname"
      param_two = "{Number} count - The\ncount"
      title = "Title"
      subtitle = "Subtitle"

      result = subject.parse_comment_block("@param #{param_one}\n@title #{title}\n@subtitle #{subtitle}\n@param #{param_two}")
      expect(result[:title]).to eq title
      expect(result[:subtitle]).to eq subtitle
      expect(result[:param]).to include(param_one.split("\n"))
      expect(result[:param]).to include(param_two.split("\n"))
    end

    it "keeps only the last instance of a one_per_file tag" do
      pattern_one = "Buttons"
      pattern_two = "No, wait, Forms!"

      result = subject.parse_comment_block("@pattern #{pattern_one}\n@pattern #{pattern_two}")
      expect(result[:pattern]).not_to eq pattern_one
      expect(result[:pattern]).to eq pattern_two
    end

    it "does not include lines following non-multiline comments even if the following lines include no tag" do
      pattern = "Button"
      following_line = "Here is some more content"

      result = subject.parse_comment_block("@pattern #{pattern}\n#{following_line}")
      expect(result[:pattern]).to eq pattern
      expect(result[:description]).to include(following_line)
    end

    it "only removes one space after the tag name" do
      pattern = "Button"
      result = subject.parse_comment_block("@pattern   #{pattern}")
      expect(result[:pattern]).to eq "  #{pattern}"
    end
  end
end
