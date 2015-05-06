require 'spec_helper'

describe Docks::PostProcessors::JoinParamProperties do
  subject { Docks::PostProcessors::JoinParamProperties }

  let(:base_param) do
    {
      types: ["Object"],
      name: "foo"
    }
  end

  let(:prop_one) do
    {
      types: ["String"],
      name: "foo.bar"
    }
  end

  let(:prop_two) do
    {
      types: ["Number"],
      name: "foo[ 'baz' ]"
    }
  end

  let(:unrelated) do
    { name: "qux" }
  end

  let(:item) do
    { param: [] }
  end

  describe "#post_process" do
    it "leaves a property-less param alone" do
      item[:param] << base_param.dup
      subject.post_process([item])

      expect(item[:param].length).to be 1
      expect(item[:param].first).to eq base_param
    end

    it "joins a property using dot syntax" do
      item[:param] << base_param
      item[:param] << prop_one
      subject.post_process([item])

      expect(item[:param]).to include(base_param)
      expect(item[:param]).not_to include(prop_one)
      expect(item[:param].first[:properties]).to include(prop_one)
      expect(prop_one[:name]).to eq "bar"
    end

    it "joins a property using bracket syntax" do
      item[:param] << base_param
      item[:param] << prop_two
      subject.post_process([item])

      expect(item[:param]).to include(base_param)
      expect(item[:param]).not_to include(prop_two)
      expect(item[:param].first[:properties]).to include(prop_two)
      expect(prop_two[:name]).to eq "baz"
    end

    it "creates a base param when none exists" do
      item[:param] << prop_one
      subject.post_process([item])

      expected_param = {
        name: base_param[:name],
        types: ["Object"],
        properties: [prop_one]
      }

      expect(item[:param]).not_to include(prop_two)
      expect(item[:param]).to include(expected_param)
      expect(prop_one[:name]).to eq "bar"
    end

    it "leaves unrelated base params alone" do
      item[:param] = [base_param, prop_one, prop_two, unrelated.dup]
      subject.post_process([item])
      expect(item[:param].length).to be 2
      expect(item[:param]).to include base_param
      expect(item[:param]).to include unrelated
    end
  end
end
