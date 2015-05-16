require "spec_helper"

# TODO: ensure that this works:

# // @page Font Sizes
# // @group Helper
# //
# // The stylesheet exists as a single place to manage all font sizes. To use
# // a font size in your stylesheet, follow this procedure:
# //
# // 1. Add a well-named entry to the `$FONT-SIZES` map with the value set to
# //    the font size for that element.
# //
# // 2. If you wish to include a `font-size` declaration in your stylesheet,
# //    `@include font-size()`, passing it the name of the component to retrieve
# //    the font-size for.
# //
# // 3. Retrieving the actual font-size dimension (for example, to be used in a
# //    calculation to determine necessary padding) should be done by passing the
# //    same argument discussed above to the `font-size` *function*.

def content_for_fixture(fixture)
  file = File.join(File.dirname(__FILE__), "..", "..", "fixtures", "processors", "join_with_smart_line_breaks", "#{fixture}.txt")
  File.read(file).split("\n")
end

def paragraph_count(text)
  text.split(/\n+/).length
end

describe Docks::Processors::JoinWithSmartLineBreaks do
  subject { Docks::Processors::JoinWithSmartLineBreaks }

  it "returns a non-array argument" do
    non_array = "I'm not an array!"
    expect(subject.process(non_array)).to eq non_array
  end

  it "returns nil for an empty array" do
    expect(subject.process([])).to be nil
  end

  it "returns nil for an array containing only whitespace strings" do
    expect(subject.process([" "])).to be nil
    expect(subject.process([" ", "   "])).to be nil
  end

  it "identifies paragraphs as any block of text separated by at least one newline" do
    content = subject.process(content_for_fixture(:multiple_paragraphs))
    expect(paragraph_count(content)).to eq 4
  end

  context "when there are lists" do
    let(:content) { subject.process(content_for_fixture(:lists)) }

    it "separates lists by a single newline even when they are directly beside each other" do
      expect(paragraph_count(content)).to eq 9
    end

    context "when there are nested items" do
      let(:content) { subject.process(content_for_fixture(:lists_with_nesting)) }

      it "puts nested lists directly following one another on their own lines" do
        content.sub!(/```[^`]*```\s*/, "")
        expect(paragraph_count(content)).to eq 6
      end

      it "preserves indentation nested under lists" do
        expect(content).to match /\n\n\s\sindented paragraph/i
      end

      it "preserves nested code block indentation" do
        expect(content).to match /\n\n\s\s```/
      end

      it "preserves nested list indentation" do
        expect(content).to match /\n\n\s\s\* items/i
      end
    end
  end

  context "when there are headers" do
    let(:content) { subject.process(content_for_fixture(:headings)) }

    it "puts a newline between the header and its underline" do
      expect(content).to match /foo\n===/i
      expect(content).to match /bar\n---/i
    end

    it "separates paragraphs from immediately preceeding and following contents" do
      content.gsub!(/\n[=\-]+\n/, "")
      expect(paragraph_count(content)).to eq 8
    end
  end

  context "when there are fenced code blocks" do
    let(:content) do
      subject.process(content_for_fixture(:code_blocks))
    end

    let(:code_block) do
      first_code_fence_index = content.index("```")
      second_code_fence_index = content.index("```", first_code_fence_index + 1) + 2

      content[first_code_fence_index..second_code_fence_index]
    end

    it "creates only a single line break between fenced code blocks" do
      expect(code_block.split("\n").length).to eq 5
    end

    it "creates paragraphs when a code block is followed immediately by a paragraph" do
      content.sub!(code_block, "")
      paragraphs = paragraph_count(content)
      expect(paragraphs).to eq 3
    end
  end
end
