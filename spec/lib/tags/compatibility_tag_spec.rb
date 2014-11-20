require 'spec_helper'

tag = :compatibility
Docks::Tags.register_bundled_tags
processor = Docks::Process

describe tag do
  let(:simple_content) { ['Chrome'] }
  let(:version) { 'latest' }
  let(:complex_content) { ["#{simple_content.first} (#{version})"] }

  it 'correctly creates a :name when there are no other details' do
    result = processor.process_tag(tag, simple_content).first
    expect(result[:browser]).to eq simple_content.first
  end

  it 'correctly creates a :name when there are other details' do
    result = processor.process_tag(tag, complex_content).first
    expect(result[:browser]).to eq simple_content.first
  end

  it 'does not create a :version when no parentheses are provided' do
    result = processor.process_tag(tag, simple_content).first
    expect(result[:version]).to be nil
  end

  it 'correctly creates a :version when it is provided without a key' do
    result = processor.process_tag(tag, complex_content).first
    expect(result[:version]).to eq version
  end

  it 'correctly creates a :version when provided with a key' do
    complex_content.first.sub!('(', '(version: ')
    result = processor.process_tag(tag, complex_content).first
    expect(result[:version]).to eq version
  end

  describe 'synonyms' do
    it 'correctly creates a synonym with :compatible_with' do
      result = processor.process_tag(:compatible_with, complex_content).first
      expect(result[:browser]).to eq simple_content.first
      expect(result[:version]).to eq version
    end
  end
end
