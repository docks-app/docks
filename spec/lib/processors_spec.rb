require "spec_helper"

describe Docks::Processors do
  subject { described_class }

  before :each do
    Docks::Languages.register_bundled_languages
  end

  describe ".split_on_characters" do
    it "returns the original argument if a non-String was passed" do
      content = { foo: :bar }
      expect(subject.split_on_characters(content)).to eq content
    end

    it "returns the original content if a non-Array and non-String was passed as the `split_on` argument" do
      content = "String content"
      split_on = { but: "non-string split_on" }

      expect(subject.split_on_characters(content, split_on)).to eq content
    end

    it "splits on a single character" do
      target_array = %w(one two three)
      expect(subject.split_on_characters("one,two,three", ",")).to eq target_array
    end

    it "splits on multiple characters" do
      target_array = %w(one two three)
      expect(subject.split_on_characters("one,two|three", ",|")).to eq target_array
    end

    it "splits on an array of characters" do
      target_array = %w(one two three)
      expect(subject.split_on_characters("one,two|three", [",", "|"])).to eq target_array
    end

    it "removes empty strings where they would otherwise be included" do
      target_array = %w(one two three)
      expect(subject.split_on_characters("one,,two,three", ",")).to eq target_array
    end
  end

  describe ".split_on_commas_spaces_and_pipes" do
    it "returns the original argument if a non-String and non-Array was passed" do
      content = { foo: :bar }
      expect(subject.split_on_commas_spaces_and_pipes(content)).to eq content
    end

    it "splits breaks apart commas" do
      target_array = %w(Array String)

      expect(subject.split_on_commas_spaces_and_pipes("Array, String")).to eq target_array
      expect(subject.split_on_commas_spaces_and_pipes("Array ,String")).to eq target_array
      expect(subject.split_on_commas_spaces_and_pipes("Array , String")).to eq target_array
      expect(subject.split_on_commas_spaces_and_pipes("Array ,, String")).to eq target_array
    end

    it "splits breaks apart pipes" do
      target_array = %w(Array String)

      expect(subject.split_on_commas_spaces_and_pipes("Array| String")).to eq target_array
      expect(subject.split_on_commas_spaces_and_pipes("Array |String")).to eq target_array
      expect(subject.split_on_commas_spaces_and_pipes("Array | String")).to eq target_array
      expect(subject.split_on_commas_spaces_and_pipes("Array || String")).to eq target_array
    end

    it "splits on internal spaces" do
      target_array = ["Item", "1", "Item", "2"]

      expect(subject.split_on_commas_spaces_and_pipes(" Item 1 , Item 2  ")).to eq target_array
    end

    it "joins together results of a passed array" do
      target_array = %w(Array Object String Hash)
      expect(subject.split_on_commas_spaces_and_pipes("Array, Object String | Hash")).to eq target_array
    end
  end

  describe ".split_on_top_level_parens_commas_and_pipes" do
    it "returns the original result as an array if it contained no parentheses" do
      content = "foo bar"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq [content]
    end

    it "does not split on unmatched opening parentheses" do
      content = "This better not match... :( OR ELSE"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq [content]
    end

    it "does not split on unmatched closing parentheses" do
      content = "We got past the first one :) now to make it past here..."
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq [content]
    end

    it "does not split on reversed sets of parentheses" do
      content = "I start happy :) then end sad... :("
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq [content]
    end

    it "does not split when there is only one set of parentheses" do
      content = "foo (bar)"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq [content]
    end

    it "does not split when there is a nested set of parentheses" do
      content = "foo (bar (baz))"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq [content]
    end

    it "creates a result for each set of top-level parentheses" do
      content = "here's (one), and here's (two), AND HERE'S (THREE)"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content).length).to be 3
    end

    it "does not create additional results for nested parentheses" do
      content = "here's (one), and here's (t(w)o), AND HERE'S (TH(R)EE)"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content).length).to be 3
    end

    it "strips spaces, pipes, and commas between the closing paren and the next character" do
      content = "here's (one), and here's (t(w)o)   AND HERE'S (TH(R)EE) |  oh and (four)"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq ["here's (one)", "and here's (t(w)o)", "AND HERE'S (TH(R)EE)", "oh and (four)"]
    end

    it "strips multiple commas/ pipes" do
      content = "here's (one) ,, and here's (t(w)o)   AND HERE'S (TH(R)EE) ||||  oh and (four)"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq ["here's (one)", "and here's (t(w)o)", "AND HERE'S (TH(R)EE)", "oh and (four)"]
    end

    it "splits even when the parentheses are directly beside each other" do
      content = "(one)(two)(three)"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq ["(one)", "(two)", "(three)"]
    end

    it "splits out the last segment even when it has no parentheses" do
      content = "foo (bar), baz"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq ["foo (bar)", "baz"]
    end

    it "does not split on a comma inside of parentheses" do
      content = "foo (bar, baz)"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq [content]
    end

    it "does not split on a pipe inside of parentheses" do
      content = "foo (bar || baz)"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq [content]
    end

    it "creates a result for each set of top-level commas" do
      content = "one, two ,,three ,  four"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq %w(one two three four)
    end

    it "creates a result for each set of top-level pipes" do
      content = "one| two |three |  four"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq %w(one two three four)
    end

    it "creates a result for each set of top-level mixed commas and pipes" do
      content = "one, two |three ,  four,"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content)).to eq %w(one two three four)
    end

    it "does not create additional results for nested commas and pipes" do
      content = "one (one,), and here's (t|wo) || AND HERE'S (TH(R|)EE)"
      expect(subject.split_on_top_level_parens_commas_and_pipes(content).length).to be 3
    end
  end

  describe ".split_types" do
    let(:target_array) { %w(Array String) }

    it "breaks apart commas" do
      expect(subject.split_types("{Array, String}")).to eq target_array
      expect(subject.split_types("{Array ,String}")).to eq target_array
      expect(subject.split_types("{Array , String}")).to eq target_array
      expect(subject.split_types("{Array ,, ,String}")).to eq target_array
    end

    it "breaks apart pipes" do
      expect(subject.split_types("{Array| String}")).to eq target_array
      expect(subject.split_types("{Array |String}")).to eq target_array
      expect(subject.split_types("{Array | String}")).to eq target_array
      expect(subject.split_types("{Array || |String}")).to eq target_array
    end

    it "breaks apart spaces alone" do
      expect(subject.split_types("{Array String}")).to eq target_array
      expect(subject.split_types("{Array  String}")).to eq target_array
    end
  end

  describe ".stringy_boolean" do
    it "defaults to true for an empty string" do
      expect(subject.stringy_boolean("")).to be true
    end

    it "defaults to false for nil" do
      expect(subject.stringy_boolean("")).to be true
    end

    it "defaults to true a non-/false/ string" do
      expect(subject.stringy_boolean("Anything!")).to be true
      expect(subject.stringy_boolean("true")).to be true
      expect(subject.stringy_boolean("We are the knights...")).to be true
    end

    it "defaults to false for a string matching /false/" do
      expect(subject.stringy_boolean("false")).to be false
      expect(subject.stringy_boolean("  false")).to be false
      expect(subject.stringy_boolean("false    ")).to be false
      expect(subject.stringy_boolean("  false   ")).to be false
    end
  end

  describe ".join_with_smart_line_breaks" do
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

    it "returns a non-array argument" do
      non_array = "I'm not an array!"
      expect(subject.join_with_smart_line_breaks(non_array)).to eq non_array
    end

    it "returns nil for an empty array" do
      expect(subject.join_with_smart_line_breaks([])).to be nil
    end

    it "returns nil for an array containing only whitespace strings" do
      expect(subject.join_with_smart_line_breaks([" "])).to be nil
      expect(subject.join_with_smart_line_breaks([" ", "   "])).to be nil
    end

    it "identifies paragraphs as any block of text separated by at least one newline" do
      content = subject.join_with_smart_line_breaks(content_for_fixture(:multiple_paragraphs))
      expect(paragraph_count(content)).to eq 4
    end

    context "when there are lists" do
      let(:content) { subject.join_with_smart_line_breaks(content_for_fixture(:lists)) }

      it "separates lists by a single newline even when they are directly beside each other" do
        expect(paragraph_count(content)).to eq 9
      end

      context "when there are nested items" do
        let(:content) { subject.join_with_smart_line_breaks(content_for_fixture(:lists_with_nesting)) }

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
      let(:content) { subject.join_with_smart_line_breaks(content_for_fixture(:headings)) }

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
        subject.join_with_smart_line_breaks(content_for_fixture(:code_blocks))
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

    private

    def content_for_fixture(fixture)
      file = File.expand_path("../../fixtures/processors/join_with_smart_line_breaks/#{fixture}.txt", __FILE__)
      File.read(file).split("\n")
    end

    def paragraph_count(text)
      text.split(/\n+/).length
    end
  end

  describe ".name_and_parenthetical" do
    let(:basic_content) { ":checked?" }
    let(:basic_result) { subject.name_and_parenthetical(basic_content) }
    let(:complex_name) { "Chris Sauve" }
    let(:complex_details) { "email: chrismsauve@gmail.com" }
    let(:complex_content) { "#{complex_name}   (#{complex_details})" }

    it "sets the :name of the returned hash to the non-parenthetical part of the passed string if no custom name is passed" do
      expect(basic_result[:name]).to eq basic_content
      expect(subject.name_and_parenthetical(complex_content)[:name]).to eq complex_name
    end

    it "sets the custom name of the returned hash to the passed non-parenthetical string" do
      custom_name = :setter
      processed = subject.name_and_parenthetical(basic_content, custom_name)
      expect(processed[custom_name]).to eq basic_content
    end

    it "joins the parenthetical results to the name" do
      parenthetical = {
        foo: "bar",
        bar: "baz"
      }
      parenthetical_as_string = ""
      parenthetical.to_a.each do |k, v|
        parenthetical_as_string << "#{k} : #{v}, "
      end
      parenthetical_as_string.sub(/,\s$/, "")

      parenthetical[:name] = basic_content

      content = "#{basic_content} (#{parenthetical_as_string})"
      expect(subject.name_and_parenthetical(content)).to eq parenthetical
    end

    it "passes along the default to the parenthetical" do
      default_key, default_val = :value, "true"
      content = "#{basic_content} (#{default_val})"
      expect(subject.name_and_parenthetical(content, :name, default_key)[default_key]).to eq default_val
    end
  end

  describe ".parenthetical_options" do
    let(:default) { :foo }
    let(:value) { "bar" }
    let(:simple_result) {
      result = {}
      result[default] = value
      result
    }

    it "associates a default value when no key-value pairs are found" do
      expect(subject.parenthetical_options(value, default)).to eq simple_result
    end

    it "creates a non-default key even if it is the only one provided" do
      non_default = :bar
      non_default_value = "baz"
      non_default_result = {}
      non_default_result[non_default] = non_default_value
      expect(subject.parenthetical_options("(#{non_default}: #{non_default_value})", default)).to eq non_default_result
    end

    it "creates a single key value pair" do
      expect(subject.parenthetical_options("#{default}: #{value}")).to eq simple_result
      expect(subject.parenthetical_options("#{default}:   #{value}")).to eq simple_result
      expect(subject.parenthetical_options("#{default} : #{value}")).to eq simple_result
      expect(subject.parenthetical_options("#{default}   :  #{value}")).to eq simple_result
    end

    it "creates multiple key value pairs" do
      key_2 = :bar
      val_2 = "baz"
      pair_1 = "#{default}: #{value}"
      pair_2 = "#{key_2}: #{val_2}"
      simple_result[key_2] = val_2

      expect(subject.parenthetical_options("#{pair_1}, #{pair_2}")).to eq simple_result
      expect(subject.parenthetical_options("#{pair_1},   #{pair_2}")).to eq simple_result
      expect(subject.parenthetical_options("#{pair_1} ,#{pair_2}")).to eq simple_result
      expect(subject.parenthetical_options("#{pair_1}   ,#{pair_2}")).to eq simple_result
      expect(subject.parenthetical_options("#{pair_1} , #{pair_2}")).to eq simple_result
      expect(subject.parenthetical_options("#{pair_1}   ,  #{pair_2}")).to eq simple_result
    end

    describe "multi-word keys" do
      let(:key_string) { "Activate with" }
      let(:key) { key_string.downcase.gsub(/\s+/, "_").to_sym }
      let(:result) {
        result = {}
        result[key] = key_string
        result
      }

      it "creates key-value pairs by symbolizing spaced keys" do
        expect(subject.parenthetical_options("#{key_string}: #{key_string}")).to eq result
      end

      it "creates multiple key-value pairs that include multi-word keys" do
        result.merge!(simple_result)
        expect(subject.parenthetical_options("#{default}: #{value}  , #{key_string} : #{key_string}")).to eq result
      end
    end

    it "creates a default key when a non-default key-value pair is also provided" do
      key_2 = :bar
      val_2 = 'baz'
      simple_result[key_2] = val_2
      content = "#{value}, #{key_2}: #{val_2}"

      expect(subject.parenthetical_options(content, default)).to eq simple_result
    end
  end

  describe ".ensure_valid_demo_type" do
    it "allows one of the included demo types" do
      Docks::Types::Demo.constants.each do |const|
        demo_type = Docks::Types::Demo.const_get(const)
        expect(subject.ensure_valid_demo_type(demo_type)).to eq demo_type
      end
    end

    it "returns the default type when none of the included demo types are provided" do
      expect(subject.ensure_valid_demo_type("invalid")).to be Docks::Types::Demo::DEFAULT
    end
  end

  describe ".multiline_description" do
    let(:complex_content) { ['First content', 'Second content', 'Third content'] }

    it "ruses the entirety of the original content as the description if the yielded block did not return a Hash" do
      content = ["Hello!"]
      final_content = subject.multiline_description(content) { |content| content }
      expect(final_content).to eq description: content.first
    end

    it "uses the entirety of the original content as the description if no block was passed" do
      content = ["Hello!"]
      final_content = subject.multiline_description(content)
      expect(final_content).to eq description: content.first
    end

    it "passes the first item in the array to the passed block" do
      subject.multiline_description(complex_content) do |content|
        expect(content).to eq complex_content.first
      end
    end

    it "preserves the hash returned by the block in the end result" do
      key = :name
      value = nil
      result = subject.multiline_description(complex_content) do |content|
        intermediate = {}
        intermediate[key] = value = content
        intermediate
      end

      expect(result[:name]).to eq value
    end

    it "joins the second thru last items of the passed array as the description" do
      result = subject.multiline_description(complex_content) do |content|
        { foo: content }
      end

      expect(result[:description]).to eq subject.join_with_smart_line_breaks(["Second content", "Third content"])
    end

    it "joins the description portion identified in the block to the rest of the description" do
      result = subject.multiline_description(complex_content) do |content|
        content = content.split(" ")
        intermediate = { foo: content[0] }
        intermediate[:description] = content[1]
        intermediate
      end

      expect(result[:description]).to eq subject.join_with_smart_line_breaks(["content", "Second content", "Third content"])
    end
  end

  describe ".code_block_with_language_and_description" do
    let(:description) { "The description." }
    let(:language) { "scss" }
    let(:code) { [".foo {", "  content: 'bar';", "}"] }

    it "uses the passed language if one is provided" do
      expect(subject.code_block_with_language_and_description(code.unshift(language))[:language]).to eq language
    end

    it "has a nil description when only the language is provided" do
      expect(subject.code_block_with_language_and_description(code.unshift(language))[:description]).to be nil
    end

    it "uses the description and language when provided" do
      result = subject.code_block_with_language_and_description(code.unshift("#{language} - #{description}"))
      expect(result[:description]).to eq description
      expect(result[:language]).to eq language
    end

    it "assigns the entire passed content to the code attribute when no language is provided" do
      expect(subject.code_block_with_language_and_description(code)[:code]).to eq code.join("\n")
    end

    it "assigns the second thru last array items to the code attribute when a valid language is provided" do
      expect(subject.code_block_with_language_and_description(code.unshift(language))[:code]).to eq code.join("\n")
    end

    it "assigns the second thru last array items to the code attribute when a valid language and description is provided" do
      result = subject.code_block_with_language_and_description(code.unshift("#{language} - #{description}"))
      expect(result[:code]).to eq code.join("\n")
    end
  end
end
