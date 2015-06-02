require "spec_helper"

describe Docks::Parser do
  subject { Docks::Parser }

  before :each do
    Docks::Tags.register_bundled_tags
    Docks::Languages.register_bundled_languages
  end

  describe ".parse" do
    let(:style_file) { File.expand_path("../../fixtures/parsers/scss_parser_fixture_basic.scss", __FILE__) }
    let(:script_file) { File.expand_path("../../fixtures/parsers/coffeescript_parser_fixture_basic.coffee", __FILE__) }
    let(:style_parser) { Docks::Parsers::SCSS.instance }
    let(:script_parser) { Docks::Parsers::CoffeeScript.instance }

    it "returns a pattern" do
      expect(subject.parse(style_file)).to be_a Docks::Containers::Pattern
    end

    it "parses the contents of each file" do
      expect(style_parser).to receive(:parse).with(style_file).and_call_original
      expect(script_parser).to receive(:parse).with(script_file).and_call_original
      subject.parse([style_file, script_file])
    end

    it "processes all parsed symbols and the final pattern" do
      symbols = style_parser.parse(style_file) + script_parser.parse(script_file)
      symbols.each { |symbol| expect(Docks::Process).to receive(:process).with(symbol) }
      expect(Docks::Process).to receive(:process).with(an_instance_of(Docks::Containers::Pattern))
      subject.parse([style_file, script_file])
    end

    it "includes the parse result of a file in the appropriate group" do
      expect(Docks::Process).to receive(:process).at_least(:once).and_return nil
      expect_any_instance_of(Docks::Containers::Pattern).to receive(:add).with(:style, style_parser.parse(style_file))
      expect_any_instance_of(Docks::Containers::Pattern).to receive(:add).with(:script, script_parser.parse(script_file))
      subject.parse([style_file, script_file])
    end

    it "doesn't try to parse a file that doesn't exist" do
      expect(File).to_not receive(:read).with("foo.bar")
      subject.parse("foo.bar")
    end

    it "doesn't try to parse a file that has no parser" do
      File.open("foo.md", "w") { |file| file.write("foo bar") }
      expect(subject).to_not receive(:parse_file).with("foo.md")
      subject.parse("foo.md")
      FileUtils.rm("foo.md")
    end

    it "doesn't try to parse a file that doesn't have a supported extension" do
      File.open("foo.bar", "w") { |file| file.write("foo bar") }
      expect(File).to_not receive(:read).with("foo.bar")
      subject.parse("foo.bar")
      FileUtils.rm("foo.bar")
    end
  end
end
