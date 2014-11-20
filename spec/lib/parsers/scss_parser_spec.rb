require 'spec_helper'

describe Docks::Parsers::SCSS do
  subject { Docks::Parsers::SCSS }
  before :all do
    Docks::Tags.register_bundled_tags
  end

  let(:basic_fixture) { File.read(File.join(File.dirname(__FILE__), '..', '..', 'fixtures', 'parsers', 'scss_parser_fixture_basic.scss')) }
  let(:complex_fixture) { File.read(File.join(File.dirname(__FILE__), '..', '..', 'fixtures', 'parsers', 'scss_parser_fixture_complex.scss')) }

  describe '::parse' do
    let(:basic_parse_results) { subject.parse(basic_fixture) }
    let(:complex_parse_results) { subject.parse(complex_fixture) }

    it 'captures the correct number of documentation blocks' do
      expect(basic_parse_results.length).to eq 2
      expect(complex_parse_results.length).to eq 6
    end

    it 'captures the page comment block when one exists' do
      expect(basic_parse_results.first[:page]).to be nil
      expect(complex_parse_results.first[:page]).to_not be nil
    end
  end

  describe '::comment_extractor' do
    it 'provides the first non-comment line as the second capture group' do
      captures = basic_fixture.match(subject.comment_extractor).captures

      captures.each { |capture| expect(captures[1].strip.start_with?('#')).to be false }
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
