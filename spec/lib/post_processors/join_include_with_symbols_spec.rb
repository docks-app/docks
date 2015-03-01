require "spec_helper"

describe Docks::PostProcessors::JoinIncludeWithSymbols do
  subject { Docks::PostProcessors::JoinIncludeWithSymbols }

  let(:component) do
    {
      name: "foo",
      symbol_type: Docks::Types::Symbol::COMPONENT,
      state: [],
      variant: []
    }
  end

  let(:included_component) do
    {
      name: "bar",
      symbol_type: Docks::Types::Symbol::COMPONENT,
      state: [],
      variant: [],
      include_with: ["foo"]
    }
  end

  let(:included_state) do
    OpenStruct.new(name: "baz", include_with: ["foo"])
  end

  describe "#post_process" do
    it "joins included components" do
      subject.post_process([component, included_component])
      expect(component[:included_symbols]).to be_an Array
      expect(component[:included_symbols].length).to be 1
      expect(component[:included_symbols]).to include included_component
    end

    it "joins included variations" do
      included_component[:include_with] = nil
      included_component[:state] << included_state

      subject.post_process([component, included_component])
      expect(component[:included_symbols]).to be_an Array
      expect(component[:included_symbols].length).to be 1
      expect(component[:included_symbols]).to include included_state
    end
  end
end
