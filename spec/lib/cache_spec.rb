require "spec_helper"

example_file = "button"

describe Docks::Cache do
  subject { described_class.new }

  let(:result) do
    parse_result = { name: example_file, now: Date.new.to_s, pattern: { foo: "Bar", description: "foo" } }
    Docks::Cache::PARSE_RESULT_TYPES.each { |type| parse_result[type] = Array.new }
    parse_result
  end

  let(:cache_file) { File.expand_path(example_file, Docks.config.cache_location) }

  before :each do
    Docks.configure do |config|
      config.root = File.expand_path("../../fixtures/cache", __FILE__)
    end
  end

  after :each do
    FileUtils.rm_rf(Dir[Docks.config.cache_location + "*"])
  end

  after :all do
    FileUtils.rm_rf(Docks.config.cache_location)
  end

  describe ".pattern_for" do
    it "sends the cached parse results back when it exists" do
      expect(subject).to receive(:group_details).and_return Hash.new

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

  describe ".pattern_groups" do
    it "returns a list of pattern details, grouped by their group attribute" do
      subject << result
      subject.dump

      details = YAML::load_file(described_class.send(:group_cache_file))[example_file]
      group = details.delete(:group)

      pattern_groups = described_class.pattern_groups
      expect(pattern_groups).to be_a Hash
      expect(pattern_groups[group]).to be_an Array
      expect(pattern_groups[group]).to include details
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
      File.open(cache_file, "w") { |file| file.write("") }

      expect(Dir[Docks.config.cache_location + "*"]).to_not be_empty
      subject.clear
      expect(Dir[Docks.config.cache_location + "*"]).to be_empty
    end
  end

  describe "#<<" do
    it "writes the contents of a parse result to the corresponding cache file" do
      expect(subject).to receive(:group_details).and_return Hash.new
      subject << result
      expect(YAML::load_file(cache_file)).to eq result
    end

    it "doesn't cache a file that has no parse results" do
      FileUtils.rm(cache_file) if File.exists?(cache_file)
      result[:pattern] = Hash.new
      subject << result
      expect(File.exists?(cache_file)).to be false
      subject.dump
      expect(YAML::load_file(described_class.send(:group_cache_file))[example_file]).to be nil
    end
  end

  describe "#dump" do
    it "collects the parse result details for each result added to the cache" do
      expect(subject).to receive(:group_details).with(result).and_return Hash.new
      subject << result
    end

    it "dumps the parse result details" do
      details = { name: example_file, title: example_file.capitalize, group: "Component" }
      expect(subject).to receive(:group_details).with(result).and_return details
      subject << result
      subject.dump

      expect(YAML::load_file(described_class.send(:group_cache_file))[example_file]).to eq details
    end

    it "provides sensible group details" do
      subject << result
      subject.dump

      cached_groups = YAML::load_file(described_class.send(:group_cache_file))[example_file]
      expect(cached_groups[:group]).to eq Docks::Types::Symbol::COMPONENT.capitalize
      expect(cached_groups[:title]).to eq example_file.capitalize
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
