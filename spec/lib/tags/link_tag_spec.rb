require 'spec_helper'

tag = :link
Docks::Tags.register_bundled_tags
processor = Docks::Process.new

describe tag do
  let(:simple_content) { ['http://apple.com'] }
  let(:caption) { 'chrismsauve@gmail.com' }
  let(:complex_content) { ["#{simple_content.first} (#{caption})"] }

  it 'correctly creates a :url when there are no other details' do
    result = processor.process_tag(tag, simple_content).first
    expect(result.first.url).to eq simple_content.first
  end

  it 'correctly creates a :url when there are other details' do
    result = processor.process_tag(tag, complex_content).first
    expect(result.first.url).to eq simple_content.first
  end

  it 'does not create a :caption when no parentheses are provided' do
    result = processor.process_tag(tag, simple_content).first
    expect(result.first.caption).to be nil
  end

  it 'correctly creates a :caption when one is provided without a key' do
    result = processor.process_tag(tag, complex_content).first
    expect(result.first.caption).to eq caption
  end

  it 'correctly creates a :caption when the key is provided' do
    complex_content.first.sub!('(', '(caption: ')
    result = processor.process_tag(tag, complex_content).first
    expect(result.first.caption).to eq caption
  end

  describe 'synonyms' do
    it 'correctly creates a synonym with :links' do
      result = processor.process_tag(:links, complex_content).first
      expect(result.first.url).to eq simple_content.first
      expect(result.first.caption).to eq caption
    end

    it 'correctly creates a synonym with :see' do
      result = processor.process_tag(:see, complex_content).first
      expect(result.first.url).to eq simple_content.first
      expect(result.first.caption).to eq caption
    end
  end
end
