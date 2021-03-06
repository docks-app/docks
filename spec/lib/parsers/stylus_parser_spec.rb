require "spec_helper"

describe Docks::Parsers::Stylus do
  subject { Docks::Parsers::Stylus.instance }

  let(:basic_fixture) { File.join(File.dirname(__FILE__), "..", "..", "fixtures", "parsers", "stylus_parser_fixture_basic.styl") }
  let(:complex_fixture) { File.join(File.dirname(__FILE__), "..", "..", "fixtures", "parsers", "stylus_parser_fixture_complex.styl") }

  describe "#parse" do
    let(:basic_parsed_symbols) { subject.parse(basic_fixture) }
    let(:complex_parsed_symbols) { subject.parse(complex_fixture) }

    it "captures the correct number of documentation blocks" do
      expect(basic_parsed_symbols.length).to eq 2
      expect(complex_parsed_symbols.length).to eq 6
    end

    it 'captures the pattern comment block when one exists' do
      expect(basic_parsed_symbols.first[:pattern]).to be nil
      expect(complex_parsed_symbols.first[:pattern]).to_not be nil
    end

    it "captures the pattern comment block when it is written using the page synonym" do
      complex_parsed_symbols = subject.parse(File.read(complex_fixture).sub("@pattern", "@page"))
      expect(complex_parsed_symbols.first[:page]).to_not be nil
    end

    it "adds line number for the first line following all other comment blocks" do
      expected_line_numbers = [8, 24]
      basic_parsed_symbols.each_with_index do |symbol, index|
        expect(symbol.source.line_number).to be expected_line_numbers[index]
      end

      expected_line_numbers = [1, 19, 34, 50, 76, 89]
      complex_parsed_symbols.each_with_index do |symbol, index|
        expect(symbol.source.line_number).to be expected_line_numbers[index]
      end
    end
  end

  describe "#symbol_block_extractor" do
    it "provides the first non-comment line as the second capture group" do
      [
        ".button",
        "#button",
        "&--is-active",
        "[button]",
        "body",
        "@media large",
        "+button-style()"
      ].each do |non_comment|
        match = "  //*\n  // Description\n\n  #{non_comment}".match(subject.symbol_block_extractor)
        expect(match[:first_line]).to eq non_comment
      end
    end
  end

  describe "#comment_line_pattern" do
    let(:basic_comment) { "This is a comment" }
    let(:complex_comment) { "// This comment has some extra comment-like symbols/characters //" }

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
    it "identifies a mixin/ function without params" do
      target_name = "full-size"
      name, type = subject.symbol_details_from_first_line("#{target_name}()").values
      expect(type).to eq Docks::Types::Symbol::MIXIN
      expect(name).to eq target_name
    end
    it "identifies a mixin/ function with params" do
      target_name = "strip-units"
      name, type = subject.symbol_details_from_first_line("#{target_name}(num)").values
      expect(type).to eq Docks::Types::Symbol::MIXIN
      expect(name).to eq target_name
    end

    it "identifies a variable" do
      target_name = "message-width"
      name, type = subject.symbol_details_from_first_line("#{target_name} = 40rem").values
      expect(type).to eq Docks::Types::Symbol::VARIABLE
      expect(name).to eq target_name
    end

    describe "states" do
      it "identifies a state as a class starting with `is-`" do
        target_name = "is-active"
        name, type = subject.symbol_details_from_first_line("#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `&.is-`" do
        target_name = "is-active"
        name, type = subject.symbol_details_from_first_line("&.#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class containing `--is-`" do
        target_name = "tab-list__tab--is-active"
        name, type = subject.symbol_details_from_first_line(".#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `&--is-`" do
        target_name = "--is-active"
        name, type = subject.symbol_details_from_first_line("&#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `js-`" do
        target_name = "js-active"
        name, type = subject.symbol_details_from_first_line(".#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `&.js-`" do
        target_name = "js-active"
        name, type = subject.symbol_details_from_first_line("&.#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class containing `--js-`" do
        target_name = "tab-list__tab--js-active"
        name, type = subject.symbol_details_from_first_line(".#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `&--js-`" do
        target_name = "--js-active"
        name, type = subject.symbol_details_from_first_line("&#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end
    end

    describe "variants" do
      it "identifies a variant as a class containing `--`" do
        target_name = "tab-list__tab--large"
        name, type = subject.symbol_details_from_first_line(".#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::VARIANT
        expect(name).to eq target_name
      end

      it "identifies a variant as a class starting with `&--`" do
        target_name = "--large"
        name, type = subject.symbol_details_from_first_line("&#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::VARIANT
        expect(name).to eq target_name
      end
    end

    describe "component" do
      it "identifies a component as any class not matching state/ variant" do
        target_name = "tab-list__tab"
        name, type = subject.symbol_details_from_first_line(".#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::COMPONENT
        expect(name).to eq target_name
      end

      it "identifies a component as a class starting with `&__`" do
        target_name = "__tab"
        name, type = subject.symbol_details_from_first_line("&#{target_name}").values
        expect(type).to eq Docks::Types::Symbol::COMPONENT
        expect(name).to eq target_name
      end
    end
  end
end
