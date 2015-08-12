require "spec_helper"

describe Docks::Tags::Require do
  subject { Docks::Tags::Require.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  describe "#process" do
    let(:symbol) { Docks::Containers::Symbol.new }

    it "breaks apart requires on commas, spaces and pipes" do
      requires = "foo | bar, baz qux"
      symbol[subject.name] = requires
      subject.process(symbol)
      expect(symbol[subject.name]).to eq Docks::Processors.split_on_commas_spaces_and_pipes(requires)
    end

    it "joins together multiple lines of requires" do
      requires = ["foo | bar, baz qux", "lux fuz"]
      symbol[subject.name] = requires.dup
      subject.process(symbol)
      expect(symbol[subject.name]).to eq requires.map { |alias_line| Docks::Processors.split_on_commas_spaces_and_pipes(alias_line) }.flatten
    end
  end

  describe "post processing" do
    before(:each) do
      Docks::Tags.register_bundled_tags
    end

    let(:method_one) do
      Docks::Containers::Function.new(name: "foo", method: true)
    end

    let(:method_two) do
      Docks::Containers::Function.new(name: "bar", method: true, static: true)
    end

    let(:klass) do
      Docks::Containers::Klass.new(name: "Baz")
    end

    let(:factory) do
      Docks::Containers::Factory.new(name: "Qux")
    end

    let(:pattern_one) do
      pattern = Docks::Containers::Pattern.new(name: klass.name.downcase)
      pattern.add(:script, [klass, method_one])
      pattern
    end

    let(:pattern_two) do
      pattern = Docks::Containers::Pattern.new(name: factory.name.downcase)
      pattern.add(:script, [factory, method_two])
      pattern
    end

    let(:pattern_library) do
      library = Docks::Containers::PatternLibrary.new
      library << pattern_one
      library << pattern_two
      library
    end

    it "adds used_by associations in the corresponding symbol" do
      requires = "#{pattern_two.name}::#{factory.name}"

      method_one.requires = requires
      process_library

      expect(method_one.requires).to eq [requires]
      expect(factory.used_by).to eq [method_one.to_descriptor]
    end

    it "adds multiple associations to a single symbol" do
      requires = "#{pattern_two.name}::#{factory.name}.#{method_two.name}"

      method_one.requires = requires
      klass.requires = requires

      process_library

      expect(method_one.requires).to eq [requires]
      expect(klass.requires).to eq [requires]

      expect(method_two.used_by).to eq [
        method_one.to_descriptor,
        klass.to_descriptor
      ]
    end

    it "adds a single symbol with multiple requires" do
      pattern_require = pattern_two.name
      method_require = "#{pattern_two.name}::#{factory.name}.#{method_two.name}"

      klass.requires = "#{pattern_require}, #{method_require}"

      process_library

      expect(klass.requires).to eq [pattern_require, method_require]
      expect(pattern_two.used_by).to eq [klass.to_descriptor]
      expect(method_two.used_by).to eq [klass.to_descriptor]
    end

    private

    def process_symbols
      [method_one, method_two, klass, factory].each do |symbol|
        Docks::Process.process(symbol)
      end
    end

    def process_patterns
      process_symbols

      [pattern_one, pattern_two].each do |pattern|
        Docks::Process.process(pattern)
      end
    end

    def process_library
      process_patterns
      Docks::Process.process(pattern_library)
    end
  end
end
