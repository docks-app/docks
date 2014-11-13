require 'spec_helper'

tag = :param
Docks::Tags.register_bundled_tags
processor = Docks::Process.new

describe tag do
  let(:name) { '_tabList2' }
  let(:types) { 'Array | DOMElement' }
  let(:default) { '[]' }
  let(:description) { 'The list of tabs.' }

  it 'correctly creats the param when only the name is provided' do
    result = processor.process_tag(tag, [name]).first
    expect(result.name).to eq name
    expect(result.types).to eq Array.new
    expect(result.default).to be nil
    expect(result.description).to be nil
  end

  describe 'types provided' do
    let(:processed_types) { Docks::Processors::BreakApartTypes.process(types) }

    it 'correctly creates the param when the name and types are provided' do
      result = processor.process_tag(tag, ["{#{types}} #{name}"]).first
      expect(result.name).to eq name
      expect(result.types).to eq processed_types
      expect(result.default).to be nil
      expect(result.description).to be nil
    end

    it 'correctly creates the param when the name, types, and default are provided' do
      result = processor.process_tag(tag, ["{#{types}} #{name} (#{default})"]).first
      expect(result.name).to eq name
      expect(result.types).to eq processed_types
      expect(result.default).to eq default
      expect(result.description).to be nil
    end

    it 'correctly creates the param when the name, types, and description are provided' do
      result = processor.process_tag(tag, ["{#{types}} #{name} #{description}"]).first
      expect(result.name).to eq name
      expect(result.types).to eq processed_types
      expect(result.default).to be nil
      expect(result.description).to eq description

      result = processor.process_tag(tag, ["{#{types}} #{name} -  #{description}"]).first
      expect(result.name).to eq name
      expect(result.types).to eq processed_types
      expect(result.default).to be nil
      expect(result.description).to eq description
    end

    it 'correctly creates the param when the name, types, default, and description are provided' do
      result = processor.process_tag(tag, ["{#{types}} #{name} (#{default}) #{description}"]).first
      expect(result.name).to eq name
      expect(result.types).to eq processed_types
      expect(result.default).to eq default
      expect(result.description).to eq description

      result = processor.process_tag(tag, ["{#{types}} #{name} (#{default}) -  #{description}"]).first
      expect(result.name).to eq name
      expect(result.types).to eq processed_types
      expect(result.default).to eq default
      expect(result.description).to eq description
    end
  end

  describe 'default provided' do
    it 'correctly creates the param when the name and default are provided' do
      result = processor.process_tag(tag, ["#{name} (#{default})"]).first
      expect(result.name).to eq name
      expect(result.types).to eq Array.new
      expect(result.default).to eq default
      expect(result.description).to be nil
    end

    it 'correctly creates the param when the name, default, and description are provided' do
      result = processor.process_tag(tag, ["#{name} (#{default}) #{description}"]).first
      expect(result.name).to eq name
      expect(result.types).to eq Array.new
      expect(result.default).to eq default
      expect(result.description).to eq description

      result = processor.process_tag(tag, ["#{name} (#{default}) -  #{description}"]).first
      expect(result.name).to eq name
      expect(result.types).to eq Array.new
      expect(result.default).to eq default
      expect(result.description).to eq description
    end
  end

  describe 'description procided' do
    it 'correctly creates the param when the name and description are provided' do
      result = processor.process_tag(tag, ["#{name} #{description}"]).first
      expect(result.name).to eq name
      expect(result.types).to eq Array.new
      expect(result.default).to be nil
      expect(result.description).to eq description

      result = processor.process_tag(tag, ["#{name} -  #{description}"]).first
      expect(result.name).to eq name
      expect(result.types).to eq Array.new
      expect(result.default).to be nil
      expect(result.description).to eq description
    end
  end
end
