require 'spec_helper'

tag = :returns
Docks::Tags.register_bundled_tags
processor = Docks::Process

describe tag do
  let(:types) { '{String | Array Object, Number}' }
  let(:description) { 'This is the description' }

  it 'correctly splits apart types when no description is provided' do
    expect(processor.process_tag(tag, [types])[:types]).to eq Docks::Processors::BreakApartTypes.process(types)
  end

  it 'correctly splits apart types when a description is provided' do
    type_results = Docks::Processors::BreakApartTypes.process(types)
    expect(processor.process_tag(tag, ["#{types} #{description}"])[:types]).to eq type_results
    expect(processor.process_tag(tag, ["#{types} -  #{description}"])[:types]).to eq type_results
    expect(processor.process_tag(tag, ["#{types}   -#{description}"])[:types]).to eq type_results
    expect(processor.process_tag(tag, ["#{types}-  #{description}"])[:types]).to eq type_results
  end

  it 'correctly returns a nil description when no description is provided' do
    expect(processor.process_tag(tag, [types])[:description]).to be nil
  end

  it 'correctly assigns a description when one is provided' do
    target_description = Docks::Processors::JoinWithSmartLineBreaks.process(description)
    expect(processor.process_tag(tag, ["#{types} #{description}"])[:description]).to eq target_description
    expect(processor.process_tag(tag, ["#{types} -  #{description}"])[:description]).to eq target_description
    expect(processor.process_tag(tag, ["#{types}   -#{description}"])[:description]).to eq target_description
    expect(processor.process_tag(tag, ["#{types}-  #{description}"])[:description]).to eq target_description
  end

  describe 'synonyms' do
    it 'correctly creates a synonym with :return' do
      target_description = Docks::Processors::JoinWithSmartLineBreaks.process(description)
      result = processor.process_tag(:return, ["#{types} #{description}"])

      expect(result[:types]).to eq Docks::Processors::BreakApartTypes.process(types)
      expect(result[:description]).to eq target_description
    end
  end
end
