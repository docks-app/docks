require 'spec_helper'

describe Docks::Parsers::SCSS do
  subject { Docks::Parsers::SCSS }

  let(:basic_fixture) { File.read(File.join(File.dirname(__FILE__), '..', 'fixtures', 'parsers', 'scss_parser_fixture_basic.scss')) }
  let(:complex_fixture) { File.read(File.join(File.dirname(__FILE__), '..', 'fixtures', 'parsers', 'scss_parser_fixture_complex.scss')) }

  describe '::page_comment_extractor' do
    it 'correctly captures a page block when one exists' do
      expect(complex_fixture.index('// @page')).to_not be nil
      expect(complex_fixture.scan(subject.page_comment_extractor).length).to eq 1
    end

    it 'correctly fails to capture a page block when none exists' do
      expect(basic_fixture.index('// @page')).to be nil
      expect(basic_fixture.scan(subject.page_comment_extractor).length).to eq 0
    end
  end

  describe '::comment_extractor' do
    let(:complex_fixture_cleaned) { subject.clean_page_comment(complex_fixture) }

    it 'captures the correct number of documentation blocks' do
      basic_captures = basic_fixture.scan(subject.comment_extractor).length
      expect(basic_captures).to be 2

      complex_captures = complex_fixture_cleaned.scan(subject.comment_extractor).length
      expect(complex_captures).to be 5
    end

    it 'provides the first non-comment line as the second capture group' do
      captures = complex_fixture_cleaned.match(subject.comment_extractor).captures

      captures.each { |capture| expect(capture[1].strip.start_with?('//')).to be false }
    end
  end

  describe '::clean_page_comment' do
    it 'does nothing to a file without a page documentation block' do
      expect(subject.clean_page_comment(basic_fixture)).to eq basic_fixture
    end

    it 'removes only the page documentation block from a file where a normal documentation block directly follows the page block' do
      expect(subject.clean_page_comment(complex_fixture)).to eq complex_fixture[complex_fixture.index('//*', 1)..-1]
    end
  end

  describe '::comment_pattern' do
    let(:basic_comment) { 'This is a comment' }
    let(:complex_comment) { "// This comment has some extra comment-like symbols/characters //" }

    it 'correctly strips line comments' do
      expect("// #{basic_comment}".gsub(subject.comment_pattern, '')).to eq basic_comment
    end

    it 'correctly strips line comments with leading whitespace' do
      expect("    // #{basic_comment}".gsub(subject.comment_pattern, '')).to eq basic_comment
    end

    it 'correctly strips line complex comments' do
      expect("// #{complex_comment}".gsub(subject.comment_pattern, '')).to eq complex_comment
    end
  end

  describe '::parse_result_details' do
    it 'correctly identifies a placeholder' do
      target_name = 'clearfix'
      name, type = subject.parse_result_details("%#{target_name} {")
      expect(type).to eq Docks::Types::Symbol::PLACEHOLDER
      expect(name).to eq target_name
    end

    it 'correctly identifies a mixin' do
      target_name = 'full-size'
      name, type = subject.parse_result_details("@mixin #{target_name}($height, $width) {")
      expect(type).to eq Docks::Types::Symbol::MIXIN
      expect(name).to eq target_name
    end

    it 'correctly identifies a function' do
      target_name = 'strip-units'
      name, type = subject.parse_result_details("@function #{target_name}($num) {")
      expect(type).to eq Docks::Types::Symbol::FUNCTION
      expect(name).to eq target_name
    end

    it 'correctly identifies a variable' do
      target_name = 'message-width'
      name, type = subject.parse_result_details("$#{target_name}: 40rem;")
      expect(type).to eq Docks::Types::Symbol::VARIABLE
      expect(name).to eq target_name
    end

    describe 'states' do
      it 'correctly identifies a state as a class starting with `is-`' do
        target_name = 'is-active'
        name, type = subject.parse_result_details("#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it 'correctly identifies a state as a class starting with `&.is-`' do
        target_name = 'is-active'
        name, type = subject.parse_result_details("&.#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it 'correctly identifies a state as a class containing `--is-`' do
        target_name = 'tab-list__tab--is-active'
        name, type = subject.parse_result_details(".#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it 'correctly identifies a state as a class starting with `&--is-`' do
        target_name = '--is-active'
        name, type = subject.parse_result_details("&#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it 'correctly identifies a state as a class starting with `js-`' do
        target_name = 'js-active'
        name, type = subject.parse_result_details(".#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it 'correctly identifies a state as a class starting with `&.js-`' do
        target_name = 'js-active'
        name, type = subject.parse_result_details("&.#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it 'correctly identifies a state as a class containing `--js-`' do
        target_name = 'tab-list__tab--js-active'
        name, type = subject.parse_result_details(".#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it 'correctly identifies a state as a class starting with `&--js-`' do
        target_name = '--js-active'
        name, type = subject.parse_result_details("&#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end
    end

    describe 'variants' do
      it 'correctly identifies a variant as a class containing `--`' do
        target_name = 'tab-list__tab--large'
        name, type = subject.parse_result_details(".#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::VARIANT
        expect(name).to eq target_name
      end

      it 'correctly identifies a variant as a class starting with `&--`' do
        target_name = '--large'
        name, type = subject.parse_result_details("&#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::VARIANT
        expect(name).to eq target_name
      end
    end

    describe 'component' do
      it 'correctly identifies a component as any class not matching state/ variant' do
        target_name = 'tab-list__tab'
        name, type = subject.parse_result_details(".#{target_name} { flex: 1 1 0; }")
        expect(type).to eq Docks::Types::Symbol::COMPONENT
        expect(name).to eq target_name
      end

      it 'correctly identifies a component as a class starting with `&__`' do
        target_name = '__tab'
        name, type = subject.parse_result_details("&#{target_name} { flex: 1 1 0; }")
        expect(type).to eq Docks::Types::Symbol::COMPONENT
        expect(name).to eq target_name
      end
    end
  end
end
