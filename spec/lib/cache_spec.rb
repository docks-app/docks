require "spec_helper"

example_file = "button"

describe Docks::Cache do
  subject { described_class.new }

  let(:result) do
    parse_result = {
      name: example_file,
      now: Date.new.to_s,
      pattern: { foo: "Bar", description: "foo" }
    }

    described_class::PARSE_RESULT_TYPES.each { |type| parse_result[type] = Array.new }
    parse_result
  end

  let(:root) {
    File.expand_path("../../fixtures/cache", __FILE__)
  }

  let(:cache_file) {
    File.expand_path(example_file, Docks.config.cache_location)
  }

  around do |example|

    Docks.configure do |config|
      config.root = root
    end

    example.run

    FileUtils.rm_rf(root)
  end

  describe ".pattern_for" do
    it "sends the cached parse results back when it exists" do
      subject << result

      pattern = Hash.new
      expect(Docks::Containers::Pattern).to receive(:new).with(result).and_return(pattern)
      pattern_returned = described_class.pattern_for(example_file)
      expect(pattern_returned).to be pattern
    end

    it "throws an error when no such pattern exists" do
      expect { described_class.pattern_for("foo") }.to raise_error Docks::NoPatternError
    end
  end

  describe "#initialize" do
    it "leaves the cache alone when the last cache was on the same version" do
      subject << result
      subject.dump

      expect_any_instance_of(described_class).to_not receive(:clear)
      second_instance = described_class.new
      second_instance << result
      second_instance.dump
    end

    it "clears the cache when a change of version happens" do
      subject << result
      subject.dump

      old_version = Docks.send(:remove_const, :VERSION)
      Docks.const_set(:VERSION, "#{old_version}.1")

      expect_any_instance_of(described_class).to receive(:clear)
      second_instance = described_class.new
      second_instance << result
      second_instance.dump
    end
  end

  describe "#clear" do
    it "removes all cache files" do
      FileUtils.mkdir_p Docks.config.cache_location
      File.open(cache_file, "w") { |file| file.write("") }

      expect(Dir[Docks.config.cache_location + "*"]).to_not be_empty
      subject.clear
      expect(Dir[Docks.config.cache_location + "*"]).to be_empty
    end
  end

  describe "#<<" do
    it "writes the contents of a parse result to the corresponding cache file" do
      subject << result
      expect(Marshal::load(File.read(cache_file))).to eq result
    end

    it "doesn't cache a file that has no parse results" do
      FileUtils.rm(cache_file) if File.exists?(cache_file)
      result[:pattern] = Hash.new
      subject << result
      expect(File.exists?(cache_file)).to be false
      subject.dump
      expect(described_class.pattern_library[example_file]).to be nil
    end
  end

  describe "#dump" do
    it "collects the sumarized symbol details for each result added to the cache" do
      expect(Docks::Containers::Pattern).to receive(:summarize).with(result).and_call_original
      subject << result
    end

    it "dumps the parse result details" do
      subject << result
      subject.dump

      expect(described_class.pattern_library[example_file]).to eq Docks::Containers::Pattern.summarize(result)
    end

    it "removes any cache results that are no longer used" do
      subject << result
      subject.dump

      second_instance = described_class.new
      second_instance.dump

      expect(File.exists?(cache_file)).to be false
    end

    it "doesn't remove cache results that simply had no updates" do
      subject << result
      subject.dump

      second_instance = described_class.new
      second_instance.no_update(result[:name])
      second_instance.dump

      expect(File.exists?(cache_file)).to be true
    end
  end
end
