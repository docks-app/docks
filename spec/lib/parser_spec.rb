require "spec_helper"

describe Docks::Parser do
  subject { Docks::Parser }

  before :all do
    Docks::Tag.register_bundled_tags
    Docks::Process.register_bundled_post_processors
    Docks::Language.register_bundled_languages
  end

  describe ".parse_group" do
    it "includes the parse result of a file in the appropriate group" do
      file = File.join(File.dirname(__FILE__), "..", "fixtures", "parsers", "scss_parser_fixture_basic.scss")
      expect(subject.parse_group([file])[Docks::Language.file_type(file)]).to include(subject.send(:parse_file, file).first)
    end

    it "moves the pattern block to the top level of the parse result" do
      file = File.join(File.dirname(__FILE__), "..", "fixtures", "parsers", "scss_parser_fixture_complex.scss")
      pattern_block = subject.send(:parse_file, file).first
      expect(subject.parse_group([file])[:pattern]).to eq pattern_block
      expect(subject.parse_group([file])[Docks::Language.file_type(file)]).to_not include(pattern_block)
    end

    it "does not include any parse result if the file is not a supported file type" do
      file = File.join(File.dirname(__FILE__), "..", "fixtures", "grouper", "components", "form", "form.m")
      parse_group_result = subject.parse_group([file])
      expect(parse_group_result[Docks::Types::Languages::MARKUP]).to be_empty
      expect(parse_group_result[Docks::Types::Languages::SCRIPT]).to be_empty
      expect(parse_group_result[Docks::Types::Languages::STYLE]).to be_empty
    end

    it "does not include any parse result if the file does not exist" do
      file = File.join(File.dirname(__FILE__), "..", "fixtures", "grouper", "form", "form.haml")
      parse_group_result = subject.parse_group([file])
      expect(parse_group_result[Docks::Types::Languages::MARKUP]).to be_empty
      expect(parse_group_result[Docks::Types::Languages::SCRIPT]).to be_empty
      expect(parse_group_result[Docks::Types::Languages::STYLE]).to be_empty
    end
  end
end
