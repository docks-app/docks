require 'spec_helper'

describe Docks::Parsers::CoffeeScript do
  subject { Docks::Parsers::CoffeeScript }
  before :all do
    Docks::Tags.register_bundled_tags
  end

  let(:basic_fixture) { File.read(File.join(File.dirname(__FILE__), '..', '..', 'fixtures', 'parsers', 'coffee_parser_fixture_basic.coffee')) }
  let(:complex_fixture) { File.read(File.join(File.dirname(__FILE__), '..', '..', 'fixtures', 'parsers', 'coffee_parser_fixture_complex.coffee')) }

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
    let(:complex_comment) { "# This comment has ##some extra comment-like symbols/characters #" }

    it 'correctly strips line comments' do
      expect("# #{basic_comment}".gsub(subject.comment_pattern, '')).to eq basic_comment
    end

    it 'correctly strips line comments with leading whitespace' do
      expect("    # #{basic_comment}".gsub(subject.comment_pattern, '')).to eq basic_comment
    end

    it 'correctly strips line complex comments' do
      expect("# #{complex_comment}".gsub(subject.comment_pattern, '')).to eq complex_comment
    end
  end

  describe '::parse_result_details' do
    it 'correctly identifies a class' do
      target_name = 'Tab'
      name, type = subject.parse_result_details(" class #{target_name}  ")
      expect(type).to eq Docks::Types::Symbol::CLASS
      expect(name).to eq target_name
    end

    describe 'functions' do
      it 'correctly identifies a function with the single arrow' do
        target_name = 'activateTab'
        name, type = subject.parse_result_details("#{target_name} = ($tab) -> $tab.activate()")
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name
      end

      it 'correctly identifies a function with the fat arrow' do
        target_name = 'activateTab'
        name, type = subject.parse_result_details("#{target_name} = => $tab.activate()")
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name
      end

      it 'correctly identifies a function declared in a class definition' do
        target_name = 'activateTab'
        name, type = subject.parse_result_details("  #{target_name} : ($tab) -> $tab.activate()")
        expect(type).to eq Docks::Types::Symbol::FUNCTION
        expect(name).to eq target_name
      end
    end

    describe 'variables' do
      it 'correctly identifies a variable' do
        target_name = 'newTab'
        name, type = subject.parse_result_details("  #{target_name} = @newTab()")
        expect(type).to eq 'variable'
        expect(name).to eq target_name
      end

      it 'correctly identifies a variable declared in a class definition' do
        target_name = 'val'
        name, type = subject.parse_result_details("  #{target_name} : (2 * 3) / 4")
        expect(type).to eq 'variable'
        expect(name).to eq target_name
      end
    end
  end
end
