require "spec_helper"

example_file = "button"

describe Docks::Cache do
  let(:result) do
    { name: example_file, now: Date.new.to_s }
  end

  let(:cache) { Docks::Cache.new }
  let(:cache_file) { File.expand_path(example_file, Docks.configuration.cache_dir) }
  let(:group_cache_file) { File.expand_path(Docks::GROUP_CACHE_FILE, Docks.configuration.cache_dir) }

  before :all do
    Docks.configure do |config|
      config.root = File.expand_path("../../fixtures/cache", __FILE__)
      config.cache_dir = File.expand_path("cache", config.root)
    end
  end

  after :each do
    File.open(group_cache_file, "w") { |file| file.write("") }
    File.open(cache_file, "w") { |file| file.write("") }
  end

  describe ".pattern_for" do
    it "sends the cached parse results back when it exists" do
      expect(cache).to receive(:pattern_is_valid?).and_return true
      expect(cache).to receive(:group_details).and_return Hash.new

      cache << result

      pattern = Hash.new
      expect(Docks::Containers::Pattern).to receive(:new).with(result).and_return(pattern)
      pattern_returned = cache.class.pattern_for(example_file)
      expect(pattern_returned).to be pattern
    end

    it "throws an error when no such pattern exists" do
      expect { cache.class.pattern_for("foo") }.to raise_error Docks::NoPatternError
    end
  end

  describe ".pattern_groups" do
    it "returns a list of pattern details, grouped by their group attribute" do
      expect(cache).to receive(:pattern_is_valid?).and_return true

      result[:pattern] = Hash.new
      cache << result
      cache.dump

      details = YAML::load_file(group_cache_file)[example_file]
      group = details.delete(:group)

      pattern_groups = cache.class.pattern_groups
      expect(pattern_groups).to be_a Hash
      expect(pattern_groups[group]).to be_an Array
      expect(pattern_groups[group]).to include details
    end
  end

  describe "<<" do
    it "writes the contents of a parse result to the corresponding cache file" do
      expect(cache).to receive(:pattern_is_valid?).and_return true
      expect(cache).to receive(:group_details).and_return Hash.new

      cache << result

      expect(YAML::load_file(cache_file)).to eq result
    end
  end

  describe "dump" do
    before :each do
      expect(cache).to receive(:pattern_is_valid?).and_return true
    end

    it "collects the parse result details for each result added to the cache" do
      expect(cache).to receive(:group_details).with(result).and_return Hash.new
      cache << result
    end

    it "dumps the parse result details" do
      details = { name: example_file, title: example_file.capitalize, group: "Component" }
      expect(cache).to receive(:group_details).with(result).and_return details
      cache << result
      cache.dump

      expect(YAML::load_file(group_cache_file)[example_file]).to eq details
    end

    it "provides sensible group details" do
      result[:pattern] = Hash.new

      cache << result
      cache.dump

      cached_groups = YAML::load_file(group_cache_file)[example_file]
      expect(cached_groups[:group]).to eq Docks::Types::Symbol::COMPONENT.capitalize
      expect(cached_groups[:title]).to eq example_file.capitalize
    end
  end
end
