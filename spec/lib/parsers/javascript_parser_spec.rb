require "spec_helper"

describe Docks::Parsers::JavaScript do
  subject { Docks::Parsers::JavaScript.instance }

  before :each do
    Docks::Tags.register_bundled_tags
  end

  let(:basic_fixture) { File.join(File.dirname(__FILE__), "..", "..", "fixtures", "parsers", "javascript_parser_fixture_basic.js") }
  let(:complex_fixture) { File.join(File.dirname(__FILE__), "..", "..", "fixtures", "parsers", "javascript_parser_fixture_complex.js") }

  describe "#parse" do
    let(:basic_parsed_symbols) { subject.parse(basic_fixture) }
    let(:complex_parsed_symbols) { subject.parse(complex_fixture) }

    it "captures the correct number of documentation blocks" do
      expect(basic_parsed_symbols.length).to eq 2
      expect(complex_parsed_symbols.length).to eq 6
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
      expected_line_numbers = [10, 26]
      basic_parsed_symbols.each_with_index do |symbol, index|
        expect(symbol.source.line_number).to be expected_line_numbers[index]
      end

      expected_line_numbers = [2, 16, 39, 45, 54, 77]
      complex_parsed_symbols.each_with_index do |symbol, index|
        expect(symbol.source.line_number).to be expected_line_numbers[index]
      end
    end
  end

  describe "#symbol_block_extractor" do
    it "provides the first non-comment line as the second capture group" do
      [
        "_foo = 'bar'",
        "$node = $(this)",
        "bar = 'baz'"
      ].each do |non_comment|
        match = "  //*\n  // Description\n\n  #{non_comment}".match(subject.symbol_block_extractor)
        expect(match[:first_line]).to eq non_comment
      end
    end
  end

  describe "#comment_line_pattern" do
    let(:basic_comment) { "This is a comment" }
    let(:complex_comment) { "# This comment has ##some extra comment-like symbols/characters #" }

    context "when using line comments" do
      it "strips line comments" do
        expect("// #{basic_comment}".gsub(subject.comment_line_pattern, "")).to eq basic_comment
      end

      it "strips line comments with leading whitespace" do
        expect("    // #{basic_comment}".gsub(subject.comment_line_pattern, "")).to eq basic_comment
      end

      it "strips line complex comments" do
        expect("// #{complex_comment}".gsub(subject.comment_line_pattern, "")).to eq complex_comment
      end

      it "leaves empty lines intact" do
        content = "// Foo\n//\n// 1. Bar\n\n// 2. Baz"
        expect(content.gsub(subject.comment_line_pattern, "")).to eq "Foo\n\n1. Bar\n\n2. Baz"
      end
    end

    context "when using block commments" do
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
  end

  describe "#symbol_details_from_first_line" do
    it "identifies a class" do
      target_name = "Tab"
      name, type = subject.symbol_details_from_first_line(" class #{target_name}  ").values
      expect(type).to eq Docks::Types::Symbol::CLASS
      expect(name).to eq target_name
    end

    describe "functions" do
      it "identifies a function with the single arrow" do
        target_name = "activateTab"
        name, type = subject.symbol_details_from_first_line("#{target_name} = ($tab) -> $tab.activate()").values
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name
      end

      it "identifies a function with the fat arrow" do
        target_name = "activateTab"
        name, type = subject.symbol_details_from_first_line("#{target_name} = => $tab.activate()").values
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name
      end

      it "identifies a function declared in a class definition" do
        target_name = "activateTab"
        name, type = subject.symbol_details_from_first_line("  #{target_name} : ($tab) -> $tab.activate()").values
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name
      end

      it "identifies a function declared using dot notation" do
        target_name = "activateTab"

        name, type = subject.symbol_details_from_first_line("  foo.#{target_name} = ($tab) -> $tab.activate()").values
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name

        name, type = subject.symbol_details_from_first_line("  foo.bar.#{target_name} = ($tab) -> $tab.activate()").values
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name

        name, type = subject.symbol_details_from_first_line("  foo['bar'].#{target_name} = ($tab) -> $tab.activate()").values
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name
      end

      it "identifies a function declared using bracket notation" do
        target_name = "activateTab"

        name, type = subject.symbol_details_from_first_line("  foo['#{target_name}'] = ($tab) -> $tab.activate()").values
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name

        name, type = subject.symbol_details_from_first_line("  foo[\"#{target_name}\"] = ($tab) -> $tab.activate()").values
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name

        name, type = subject.symbol_details_from_first_line("  foo['bar']['#{target_name}'] = ($tab) -> $tab.activate()").values
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name

        name, type = subject.symbol_details_from_first_line("  foo.bar['#{target_name}'] = ($tab) -> $tab.activate()").values
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name
      end
    end

    describe "variables" do
      it "identifies a variable" do
        target_name = "newTab"
        name, type = subject.symbol_details_from_first_line("  #{target_name} = @newTab()").values
        expect(type).to eq Docks::Types::Symbol::VARIABLE
        expect(name).to eq target_name
      end

      it "identifies a variable declared in a class definition" do
        target_name = "val"
        name, type = subject.symbol_details_from_first_line("  #{target_name} : (2 * 3) / 4").values
        expect(type).to eq Docks::Types::Symbol::VARIABLE
        expect(name).to eq target_name
      end

      it "identifies a variable that is declared without assignment" do
        target_name = "val"
        name, type = subject.symbol_details_from_first_line(target_name).values
        expect(type).to eq Docks::Types::Symbol::VARIABLE
        expect(name).to eq target_name
      end

      it "identifies the first variable in a comma-separated list without assignment" do
        target_name = "val"
        name, type = subject.symbol_details_from_first_line("  #{target_name}, foo, bar , baz").values
        expect(type).to eq Docks::Types::Symbol::VARIABLE
        expect(name).to eq target_name
      end

      it "identifies the first variable in a comma-separated list with assignment" do
        target_name = "val"
        name, type = subject.symbol_details_from_first_line("  #{target_name}, foo, bar , baz = 'qux'").values
        expect(type).to eq Docks::Types::Symbol::VARIABLE
        expect(name).to eq target_name
      end
    end
  end
end
