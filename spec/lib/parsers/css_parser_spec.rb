require "spec_helper"

describe Docks::Parsers::CSS do
  subject { Docks::Parsers::CSS.instance }

  before :each do
    Docks::Tags.register_bundled_tags
  end

  let(:basic_fixture) { File.join(File.dirname(__FILE__), "..", "..", "fixtures", "parsers", "css_parser_fixture_basic.css") }
  let(:complex_fixture) { File.join(File.dirname(__FILE__), "..", "..", "fixtures", "parsers", "css_parser_fixture_complex.css") }

  describe "#parse" do
    let(:basic_parsed_symbols) { subject.parse(basic_fixture) }
    let(:complex_parsed_symbols) { subject.parse(complex_fixture) }

    it "captures the correct number of documentation blocks" do
      expect(basic_parsed_symbols.length).to be 2
      expect(complex_parsed_symbols.length).to be 6
    end

    it "captures the pattern comment block when one exists" do
      expect(basic_parsed_symbols.first[:pattern]).to be nil
      expect(complex_parsed_symbols.first[:pattern]).to_not be nil
    end

    it "captures the pattern comment block when it is written using the page synonym" do
      complex_parsed_symbols = subject.parse(File.read(complex_fixture).sub("@pattern", "@page"))
      expect(complex_parsed_symbols.first[:page]).to_not be nil
    end

    it "adds line number for the first line following all other comment blocks" do
      expected_line_numbers = [10, 30]
      basic_parsed_symbols.each_with_index do |symbol, index|
        expect(symbol.source.line_number).to be expected_line_numbers[index]
      end

      expected_line_numbers = [1, 21, 34, 48, 82, 99]
      complex_parsed_symbols.each_with_index do |symbol, index|
        expect(symbol.source.line_number).to be expected_line_numbers[index]
      end
    end
  end

  describe "#symbol_block_extractor" do
    it "provides the first non-comment line as the second capture group" do
      captures = File.read(basic_fixture).match(subject.symbol_block_extractor).captures

      captures.each { |capture| expect(captures[1].strip.start_with?("#")).to be false }
    end
  end

  describe "#comment_line_pattern" do
    let(:basic_comment) { "This is a comment" }
    let(:complex_comment) { "* This comment has some extra comment-like symbols/characters *" }

    it "spits back out comments without any leading comment symbols" do
      expect(basic_comment.gsub(subject.comment_line_pattern, "")).to eq basic_comment
    end

    it "strips line comments" do
      expect("* #{basic_comment}".gsub(subject.comment_line_pattern, "")).to eq basic_comment
    end

    it "strips line comments with leading whitespace" do
      expect("    * #{basic_comment}".gsub(subject.comment_line_pattern, "")).to eq basic_comment
    end

    it "strips line complex comments" do
      expect("* #{complex_comment}".gsub(subject.comment_line_pattern, "")).to eq complex_comment
    end

    it "leaves empty lines intact" do
      content = "* Foo\n*\n* 1. Bar\n\n* 2. Baz"
      expect(content.gsub(subject.comment_line_pattern, "")).to eq "Foo\n\n1. Bar\n\n2. Baz"
    end
  end

  describe "#symbol_details_from_first_line" do

    describe "states" do
      it "identifies a state as a class starting with `.is-`" do
        target_name = "is-active"
        name, type = subject.symbol_details_from_first_line(".#{target_name} {").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class containing `--is-`" do
        target_name = "tab-list__tab--is-active"
        name, type = subject.symbol_details_from_first_line(".#{target_name} {").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `.js-`" do
        target_name = "js-active"
        name, type = subject.symbol_details_from_first_line(".#{target_name} {").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class containing `--js-`" do
        target_name = "tab-list__tab--js-active"
        name, type = subject.symbol_details_from_first_line(".#{target_name} {").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end
    end

    describe "variants" do
      it "identifies a variant as a class containing `--`" do
        target_name = "tab-list__tab--large"
        name, type = subject.symbol_details_from_first_line(".#{target_name} {").values
        expect(type).to eq Docks::Types::Symbol::VARIANT
        expect(name).to eq target_name
      end
    end

    describe "component" do
      it "identifies a component as any class not matching state/ variant" do
        target_name = "tab-list__tab"
        name, type = subject.symbol_details_from_first_line(".#{target_name} { flex: 1 1 0; }").values
        expect(type).to eq Docks::Types::Symbol::COMPONENT
        expect(name).to eq target_name
      end
    end
  end
end
