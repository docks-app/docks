require "spec_helper"

describe Docks::Process do
  subject { Docks::Process }

  before(:each) { Docks::Tags.register_bundled_tags }

  describe ".process" do
    context "when the argument is a symbol" do
      let(:symbol) { Docks::Containers::Symbol.new(name: "bar", private: "true") }

      it "returns the processed symbol" do
        expect(subject.process(symbol)).to be symbol
      end

      it "runs the process method for every tag in the symbol" do
        expect(symbol).to receive(:tags).and_call_original
        expect(Docks::Tags::Name.instance).to receive(:process).with(symbol)
        expect(Docks::Tags::Private.instance).to receive(:process).with(symbol)
        subject.process(symbol)
      end
    end

    context "when the argument is a pattern" do
      let(:pattern) { Docks::Containers::Pattern.new("foo") }

      it "returns the processed pattern" do
        expect(subject.process(pattern)).to be pattern
      end

      it "calls a registered pattern processor with the pattern as the only argument" do
        arg = nil
        subject.register_pattern_processor { |pattern| arg = pattern }
        subject.process(pattern)
        expect(arg).to be pattern
      end

      it "calls processors for a given hook in the order they were registered" do
        positions = []
        subject.register_pattern_processor { positions << 1 }
        subject.register_pattern_processor { positions << 2 }
        subject.process(pattern)
        expect(positions).to eq [1, 2]
      end

      it "calls processors in the early hook, then the middle hook, then the late hook" do
        positions = []
        subject.register_pattern_processor(:late) { positions << 1 }
        subject.register_pattern_processor(:middle) { positions << 2 }
        subject.register_pattern_processor(:early) { positions << 3 }
        subject.process(pattern)
        expect(positions).to eq [3, 2, 1]
      end
    end

    context "when the argument is a pattern library" do
      let(:pattern_library) { Docks::Containers::PatternLibrary.new }

      it "returns the processed pattern_library" do
        expect(subject.process(pattern_library)).to be pattern_library
      end

      it "calls a registered pattern_library processor with the pattern_library as the only argument" do
        arg = nil
        subject.register_pattern_library_processor { |pattern_library| arg = pattern_library }
        subject.process(pattern_library)
        expect(arg).to be pattern_library
      end

      it "calls processors for a given hook in the order they were registered" do
        positions = []
        subject.register_pattern_library_processor { positions << 1 }
        subject.register_pattern_library_processor { positions << 2 }
        subject.process(pattern_library)
        expect(positions).to eq [1, 2]
      end

      it "calls processors in the early hook, then the middle hook, then the late hook" do
        positions = []
        subject.register_pattern_library_processor(:late) { positions << 1 }
        subject.register_pattern_library_processor(:middle) { positions << 2 }
        subject.register_pattern_library_processor(:early) { positions << 3 }
        subject.process(pattern_library)
        expect(positions).to eq [3, 2, 1]
      end
    end
  end
end
