require 'spec_helper'

describe Docks::Parsers::Haml do
  subject { Docks::Parsers::Haml.instance }

  before :all do
    Docks::Tag.register_bundled_tags
  end

  let(:basic_fixture) { File.read(File.join(File.dirname(__FILE__), '..', '..', 'fixtures', 'parsers', 'haml_parser_fixture_basic.haml')) }
  let(:complex_fixture) { File.read(File.join(File.dirname(__FILE__), '..', '..', 'fixtures', 'parsers', 'haml_parser_fixture_complex.haml')) }

  describe '#parse' do
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

  describe '#comment_extractor' do
    it 'provides the first non-comment line as the second capture group' do
      captures = basic_fixture.match(subject.comment_extractor).captures

      captures.each { |capture| expect(captures[1].strip.start_with?('#')).to be false }
    end
  end

  describe '#comment_pattern' do
    let(:basic_comment) { 'This is a comment' }
    let(:complex_comment) { "# This comment has ##some extra comment-like symbols/characters #" }

    it 'correctly strips line comments' do
      expect("-# #{basic_comment}".gsub(subject.comment_pattern, '')).to eq basic_comment
    end

    it 'correctly strips line comments with leading whitespace' do
      expect("    -# #{basic_comment}".gsub(subject.comment_pattern, '')).to eq basic_comment
    end

    it 'correctly strips line complex comments' do
      expect("-# #{complex_comment}".gsub(subject.comment_pattern, '')).to eq complex_comment
    end
  end

  describe '#parse_result_details' do
    it 'correctly identifies a component with a single class' do
      target_name = 'tab-list__tab'
      name, type = subject.parse_result_details("  %div.#{target_name}  ")
      expect(type).to eq Docks::Types::Symbol::COMPONENT
      expect(name).to eq target_name
    end

    it 'correctly identifies a component with multiple classes' do
      target_name = 'tab-list__tab'
      name, type = subject.parse_result_details("  %div.#{target_name}.#{target_name}--is-active  ")
      expect(type).to eq Docks::Types::Symbol::COMPONENT
      expect(name).to eq target_name
    end

    it 'correctly identifies an implicit `div` with a class' do
      target_name = 'tab-list__tab'
      name, type = subject.parse_result_details("  .#{target_name}.#{target_name}--is-active  ")
      expect(type).to eq Docks::Types::Symbol::COMPONENT
      expect(name).to eq target_name
    end
  end
end
