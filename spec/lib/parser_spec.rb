require "spec_helper"

describe Docks::Parser do
  subject { Docks::Parser }

  around do |example|
    Docks::Tags.register_bundled_tags
    Docks::Languages.register_bundled_languages
    example.run
    subject.send(:clean)
  end

  describe ".parse" do
    let(:style_file) { File.expand_path("../../fixtures/parsers/sass_parser_fixture_basic.scss", __FILE__) }
    let(:script_file) { File.expand_path("../../fixtures/parsers/coffeescript_parser_fixture_basic.coffee", __FILE__) }
    let(:style_parser) { Docks::Parsers::Sass.instance }
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
      symbols.each { |symbol| expect(Docks::Process).to receive(:process).with(symbol) { |arg| arg } }
      expect(Docks::Process).to receive(:process).with(an_instance_of(Docks::Containers::Pattern))
      subject.parse([style_file, script_file])
    end

    it "includes the parse result of a file in the appropriate group" do
      expect(Docks::Process).to receive(:process).at_least(:once) { |arg| arg }
      expect_any_instance_of(Docks::Containers::Pattern).to receive(:add).with(:style, style_parser.parse(style_file))
      expect_any_instance_of(Docks::Containers::Pattern).to receive(:add).with(:script, script_parser.parse(script_file))
      subject.parse([style_file, script_file])
    end

    it "uses a matching registered parser" do
      class ExampleParser < Docks::Parsers::Base; end
      subject.register(ExampleParser, for: /fixture/)
      expect(ExampleParser.instance).to receive(:parse).with(style_file).and_return([])
      subject.parse([style_file])
    end

    it "uses the last registered parser" do
      class ExampleParser < Docks::Parsers::Base; end
      class OtherParser < Docks::Parsers::Base; end

      subject.register(ExampleParser, for: /fixture/)
      subject.register(OtherParser, for: /parser/)
      expect(OtherParser.instance).to receive(:parse).with(style_file).and_return([])
      subject.parse([style_file])
    end

    it "doesn't use a parser that doesn't match the file" do
      class ExampleParser < Docks::Parsers::Base; end
      subject.register(ExampleParser, for: /script/)
      expect(ExampleParser.instance).to_not receive(:parse)
      subject.parse([style_file])
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

    it "sets the most recently modified file's time to be the pattern's modified attribute" do
      FileUtils.touch(script_file)
      expected_modified = File.mtime(script_file)
      pattern = subject.parse([style_file, script_file])
      expect(pattern.modified).to eq expected_modified
    end
  end
end
