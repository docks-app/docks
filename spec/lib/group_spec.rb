require "spec_helper"

describe Docks do
  subject { described_class }

  describe ".pattern_id" do
    it "returns a nil identifier when a non-string is passed" do
      expect(subject.pattern_id(:nothing_to_see_here)).to be nil
    end

    it "uses only the extension-less, base file name" do
      expect(subject.pattern_id("foo/bar/baz/button.min.css")).to eq subject.pattern_id("button")
    end

    it "strips leading underscores" do
      expect(subject.pattern_id("_checkbox.html.erb")).to eq "checkbox"
    end

    it "normalizes dashes and underscores" do
      expect(subject.pattern_id("foo_bar_baz")).to eq subject.pattern_id("foo-bar-baz")
    end
  end

  describe ".pattern_id=" do
    it "allows the pattern identification method to be redefined" do
      built_in_identifier = subject.instance_variable_get(:@pattern_id)
      subject.pattern_id = lambda { |filename| "foo" }
      expect(subject.pattern_id("bar")).to eq "foo"
      subject.pattern_id = built_in_identifier
    end

    it "does not reassign the pattern identifier unless it returns a result for a valid input" do
      expect { subject.pattern_id = lambda { |file| } }.not_to change { subject.pattern_id("foo") }
    end
  end
end

describe Docks::Grouper do
  subject { Docks::Grouper }

  before :each do
    Docks::Languages.register_bundled_languages
  end

  describe ".group" do
    it "returns an empty Hash when no paths are provided" do
      expect(subject.group([])).to eq Hash.new
    end

    it "returns an empty Hash when the passed glob does not match any files" do
      pattern = File.join(File.dirname(__FILE__), "../fixtures/grouper/components/non-existent-thing/*")
      expect(subject.group(pattern)).to eq Hash.new
    end

    it "groups together files of the same name that match the passed globbing patterns in an Array" do
      pattern = File.join(File.dirname(__FILE__), "../fixtures/grouper/components/button/*")
      files = Dir.glob(pattern)

      group_result = subject.group(pattern)
      button_result = group_result[Docks.pattern_id(files.first)]

      expect(button_result).to eq files
    end

    it "groups together files of the same name that match the passed globbing patterns with multiple globbing patterns, some of which do not reference actual files" do
      button_pattern = File.join(File.dirname(__FILE__), "../fixtures/grouper/components/button/*")
      button_files = Dir.glob(button_pattern)
      pattern_non_match = File.join(File.dirname(__FILE__), "../fixtures/grouper/components/non-existent-thing/*")

      group_result = subject.group([button_pattern, pattern_non_match])
      button_result = group_result[Docks.pattern_id(button_files.first)]

      expect(button_result).to eq button_files
    end

    it "groups together files of the same name that match the passed globbing patterns with multiple globbing patterns that match" do
      button_pattern = File.join(File.dirname(__FILE__), "../fixtures/grouper/components/button/*")
      button_files = Dir.glob(button_pattern)

      tab_pattern = File.join(File.dirname(__FILE__), "../fixtures/grouper/components/next-tab/*")
      tab_files = Dir.glob(tab_pattern)

      group_result = subject.group([button_pattern, tab_pattern])
      button_result = group_result[Docks.pattern_id(button_files.first)]
      tab_result = group_result[Docks.pattern_id(tab_files.first)]

      expect(button_result).to eq button_files
      expect(tab_result).to eq tab_files
    end

    context "when components are spread across folders" do
      let(:globs) do
        [
          File.join(File.dirname(__FILE__), "../fixtures/grouper/markup/**/*.haml"),
          File.join(File.dirname(__FILE__), "../fixtures/grouper/scripts/**/*.coffee"),
          File.join(File.dirname(__FILE__), "../fixtures/grouper/style/**/*.scss")
        ]
      end

      let(:result) { subject.group(globs) }
      let(:expected_results) do
        {
          "resizable" => 2,
          "list_view" => 2,
          "toggle" => 3
        }
      end

      it "groups together files in dedicated scripts/ markup/ style folders" do
        expected_results.each do |group, file_count|
          expect(result[group].length).to eq file_count
        end
      end

      it "groups together files in dedicated scripts/ markup/ style folders and in component folders" do
        globs << File.join(File.dirname(__FILE__), "../fixtures/grouper/components/button/*")
        globs << File.join(File.dirname(__FILE__), "../fixtures/grouper/components/checkbox/*")
        expected_results["button"] = 3
        expected_results["checkbox"] = 3

        result = subject.group(globs)

        expected_results.each do |group, file_count|
          expect(result[group].length).to eq file_count
        end
      end
    end

    describe "acceptance criteria" do
      it "rejects minified files" do
        pattern = File.join(File.dirname(__FILE__), "../fixtures/grouper/components/segmented control/*")
        files = Dir.glob(pattern).reject! { |filename| filename =~ /\.min\..*$/ }

        group_result = subject.group(pattern)
        component_result = group_result[Docks.pattern_id(files.first)]

        expect(component_result).to eq files
      end

      it "rejects files not recognized by Docks" do
        pattern = File.join(File.dirname(__FILE__), "../fixtures/grouper/components/form/*")
        files = Dir.glob(pattern).select! { |filename| Docks::Languages.extensions.include?(File.extname(filename)[1..-1]) }

        group_result = subject.group(pattern)
        component_result = group_result[Docks.pattern_id(files.first)]

        expect(component_result).to eq files
      end
    end
  end
end
