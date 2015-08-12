require "spec_helper"

describe Docks::Cache do
  subject { described_class.new }

  let(:name) { "button" }

  let(:pattern) do
    pattern = Docks::Containers::Pattern.new(name: name)
    pattern.add(:script, Docks::Containers::Symbol.new(pattern: name.upcase))
    pattern.modified = Date.new
    pattern
  end

  let(:root) {
    File.expand_path("../../fixtures/cache", __FILE__)
  }

  let(:cache_file) {
    File.expand_path(name, Docks.config.cache_location)
  }

  around do |example|
    Docks.configure { |config| config.root = root }
    example.run
    FileUtils.rm_rf(root)
  end

  describe ".pattern_for" do
    it "sends the cached parse patterns back when it exists" do
      subject << pattern
      subject.dump
      expect(described_class.pattern_for(name)).to eq pattern
    end

    it "throws an error when no such pattern exists" do
      expect { described_class.pattern_for("foo") }.to raise_error Docks::NoPatternError
    end
  end

  describe ".cached?" do
    let(:file) { "#{name}.scss" }

    around do |example|
      File.open(file, "w") { |file| file.write("") }
      example.run
      FileUtils.rm(file)
    end

    it "is false when there is no cached pattern" do
      expect(described_class.cached?(name)).to be false
    end

    it "is false when there is a more-recently modified cache file than the newest source file" do
      subject << pattern
      subject.dump
      expect(File).to receive(:mtime).with(Docks.config.cache_location + name).and_return Time.now + 1000
      expect(File).to receive(:mtime).with(file).and_return Time.now
      expect(described_class.cached?(file)).to be true
    end

    it "is false when there is a more-recently modified source file than the cache" do
      subject << pattern
      subject.dump
      expect(File).to receive(:mtime).with(Docks.config.cache_location + name).and_return Time.now
      expect(File).to receive(:mtime).with(file).and_return Time.now + 1000
      expect(described_class.cached?(file)).to be false
    end

    it "uses the most recently modified file" do
      file_two ="#{name}-2.scss"
      File.open(file_two, "w") { |file| file.write("") }
      subject << pattern
      subject.dump

      expect(File).to receive(:mtime).with(Docks.config.cache_location + name).and_return Time.now
      expect(File).to receive(:mtime).with(file).and_return Time.now + 1000
      expect(File).to receive(:mtime).with(file_two).and_return Time.now - 1000
      expect(described_class.cached?([file, file_two])).to be false

      FileUtils.rm(file_two)
    end
  end

  describe "#initialize" do
    it "leaves the cache alone when the last cache was on the same version" do
      subject << pattern
      subject.dump

      expect_any_instance_of(described_class).to_not receive(:clear)
      second_instance = described_class.new
      second_instance << pattern
      second_instance.dump
    end

    it "clears the cache when a change of version happens" do
      subject << pattern
      subject.dump

      old_version = Docks.send(:remove_const, :VERSION)
      Docks.const_set(:VERSION, "#{old_version}.1")

      expect_any_instance_of(described_class).to receive(:clear)
      second_instance = described_class.new
      second_instance << pattern
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
    it "writes the contents of a parse pattern to the corresponding cache file on dump" do
      subject << pattern
      subject.dump
      expect(Marshal::load(File.read(cache_file))).to eq pattern
    end

    it "doesn't cache a pattern that is invalid" do
      expect(pattern).to receive(:valid?).and_return false
      subject << pattern
      expect(File.exists?(cache_file)).to be false
      subject.dump
      expect(described_class.pattern_library[name]).to be nil
    end
  end

  describe "#dump" do
    it "collects the sumarized details for each pattern added to the cache" do
      expect_any_instance_of(Docks::Containers::PatternLibrary).to receive(:<<).with(pattern).and_call_original
      subject << pattern
    end

    it "calls the final processors on the pattern library" do
      expect(Docks::Process).to receive(:process).with an_instance_of(Docks::Containers::PatternLibrary)
      subject.dump
    end

    it "adds the summarized details to the pattern library" do
      subject << pattern
      subject.dump
      expect(described_class.pattern_library[name]).to eq pattern.summary
    end

    it "removes any cache patterns that are no longer used" do
      subject << pattern
      subject.dump

      second_instance = described_class.new
      second_instance.dump

      expect(File.exists?(cache_file)).to be false
    end

    it "doesn't remove cache patterns that simply had no updates" do
      subject << pattern
      subject.dump

      second_instance = described_class.new
      second_instance.no_update(pattern.name)
      second_instance.dump

      expect(File.exists?(cache_file)).to be true
    end
  end
end
