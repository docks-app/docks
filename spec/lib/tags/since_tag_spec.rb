require 'spec_helper'

tag = :since
Docks::Tags.register_bundled_tags
processor = Docks::Process

describe tag do
  let(:version) { '1.5.0-beta003' }
  let(:description) { 'This is the description' }

  it 'correctly sets the version when no description is provided' do
    expect(processor.process_tag(tag, [version]).version).to eq version
  end

  it 'correctly sets the version when a description is provided' do
    expect(processor.process_tag(tag, ["#{version} #{description}"]).version).to eq version
    expect(processor.process_tag(tag, ["#{version} -  #{description}"]).version).to eq version
    expect(processor.process_tag(tag, ["#{version}   -#{description}"]).version).to eq version
  end

  it 'correctly returns a nil description when no description is provided' do
    expect(processor.process_tag(tag, [version]).description).to be nil
  end

  it 'correctly assigns a description when one is provided' do
    target_description = Docks::Processors::JoinWithSmartLineBreaks.process(description)
    expect(processor.process_tag(tag, ["#{version} #{description}"]).description).to eq target_description
    expect(processor.process_tag(tag, ["#{version} -  #{description}"]).description).to eq target_description
    expect(processor.process_tag(tag, ["#{version}   -#{description}"]).description).to eq target_description
  end

  describe 'synonyms' do
    it 'correctly creates a synonym with :introduced_in' do
      target_description = Docks::Processors::JoinWithSmartLineBreaks.process(description)
      result = processor.process_tag(:introduced_in, ["#{version} #{description}"])

      expect(result.version).to eq version
      expect(result.description).to eq target_description
    end
  end
end
