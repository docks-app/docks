require "spec_helper"

describe Docks::Helpers do
  describe ".add_helpers_to" do
    let(:renderer) { Docks::Renderers::ERB.new }

    it "adds all bundled helpers" do
      helpers = []
      allow(renderer).to receive(:helpers) do |*args|
        helpers = helpers.concat(args)
      end

      described_class.add_helpers_to(renderer)

      described_class.constants.each do |const|
        expect(helpers).to include described_class.const_get(const)
      end
    end

    it "adds any user-configured helpers" do
      Docks.configure_with helpers: ["foo.txt", "bar.txt"]

      helpers = []
      allow(renderer).to receive(:helpers) do |*args|
        helpers = helpers.concat(args)
      end

      described_class.add_helpers_to(renderer)

      Docks.config.helpers.each do |helper|
        expect(helpers).to include helper
      end
    end
  end
end
