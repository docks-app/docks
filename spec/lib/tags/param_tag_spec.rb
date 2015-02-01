require "spec_helper"

describe Docks::Tags::Param do
  subject { Docks::Tags::Param.instance }

  let(:name) { "_tab_list2" }
  let(:types) { "Array | DOMElement" }
  let(:default) { "[]" }
  let(:description) { "The list of tabs." }

  it "correctly creats the param when only the name is provided" do
    result = subject.process([name])
    expect(result[:name]).to eq name
    expect(result[:types]).to eq Array.new
    expect(result[:default]).to be nil
    expect(result[:description]).to be nil
  end

  describe "types provided" do
    let(:processed_types) { Docks::Processors::BreakApartTypes.process(types) }

    it "correctly creates the param when the name and types are provided" do
      result = subject.process(["{#{types}} #{name}"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq processed_types
      expect(result[:default]).to be nil
      expect(result[:description]).to be nil
    end

    it "correctly creates the param when the name, types, and default are provided" do
      result = subject.process(["{#{types}} #{name} (#{default})"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq processed_types
      expect(result[:default]).to eq default
      expect(result[:description]).to be nil
    end

    it "correctly creates the param when the name, types, and description are provided" do
      result = subject.process(["{#{types}} #{name} #{description}"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq processed_types
      expect(result[:default]).to be nil
      expect(result[:description]).to eq description

      result = subject.process(["{#{types}} #{name} -  #{description}"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq processed_types
      expect(result[:default]).to be nil
      expect(result[:description]).to eq description
    end

    it "correctly creates the param when the name, types, default, and description are provided" do
      result = subject.process(["{#{types}} #{name} (#{default}) #{description}"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq processed_types
      expect(result[:default]).to eq default
      expect(result[:description]).to eq description

      result = subject.process(["{#{types}} #{name} (#{default}) -  #{description}"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq processed_types
      expect(result[:default]).to eq default
      expect(result[:description]).to eq description
    end
  end

  describe "default provided" do
    it "correctly creates the param when the name and default are provided" do
      result = subject.process(["#{name} (#{default})"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq Array.new
      expect(result[:default]).to eq default
      expect(result[:description]).to be nil
    end

    it "correctly creates the param when the name, default, and description are provided" do
      result = subject.process(["#{name} (#{default}) #{description}"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq Array.new
      expect(result[:default]).to eq default
      expect(result[:description]).to eq description

      result = subject.process(["#{name} (#{default}) -  #{description}"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq Array.new
      expect(result[:default]).to eq default
      expect(result[:description]).to eq description
    end

    it "correctly creates the param when special characters exist in the name" do
      result = subject.process(["_with_underscore"])
      expect(result[:name]).to eq "_with_underscore"

      result = subject.process(["$$with-dollars"])
      expect(result[:name]).to eq "$$with-dollars"
    end
  end

  describe "description provided" do
    it "correctly creates the param when the name and description are provided" do
      result = subject.process(["#{name} #{description}"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq Array.new
      expect(result[:default]).to be nil
      expect(result[:description]).to eq description

      result = subject.process(["#{name} -  #{description}"])
      expect(result[:name]).to eq name
      expect(result[:types]).to eq Array.new
      expect(result[:default]).to be nil
      expect(result[:description]).to eq description
    end
  end
end
