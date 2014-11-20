require 'spec_helper'

tag = :author
Docks::Tags.register_bundled_tags
processor = Docks::Process

describe tag do
  let(:simple_content) { ['Chris Sauve'] }
  let(:email) { 'chrismsauve@gmail.com' }
  let(:github) { 'lemonmade' }
  let(:complex_content) { ["#{simple_content.first} (#{email}, github: #{github})"] }

  it 'correctly creates a :name when there are no other details' do
    result = processor.process_tag(tag, simple_content).first
    expect(result.name).to eq simple_content.first
  end

  it 'correctly creates a :name when there are other details' do
    result = processor.process_tag(tag, complex_content).first
    expect(result.name).to eq simple_content.first
  end

  it 'does not create an :email when no parentheses are provided' do
    result = processor.process_tag(tag, simple_content).first
    expect(result.email).to be nil
  end

  it 'correctly creates details when one is provided without a key' do
    result = processor.process_tag(tag, complex_content).first
    expect(result.email).to eq email
    expect(result.github).to eq github
  end

  it 'correctly creates details when keys are provided for all values' do
    complex_content.first.sub!('(', '(email: ')
    result = processor.process_tag(tag, complex_content).first
    expect(result.email).to eq email
    expect(result.github).to eq github
  end

  describe 'synonyms' do
    it 'correctly creates a synonym with :authors' do
      result = processor.process_tag(:authors, complex_content).first
      expect(result.name).to eq simple_content.first
      expect(result.email).to eq email
      expect(result.github).to eq github
    end
  end
end
