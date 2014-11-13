require 'spec_helper'

describe Docks::Processors::BreakApartOnCharacters do
  subject { Docks::Processors::BreakApartOnCharacters }

  it 'correctly returns the original argument if a non-String was passed' do
    content = { foo: :bar }
    expect(subject.process(content)).to eq content
  end

  it 'correctly returns the original content if a non-Array and non-String was passed as the `split_on` argument' do
    content = 'String content'
    split_on = { but: 'non-string split_on' }

    expect(subject.process(content, split_on)).to eq content
  end

  it 'correctly splits on a single character' do
    target_array = %w(one two three)
    expect(subject.process('one,two,three', ',')).to eq target_array
  end

  it 'correctly splits on multiple characters' do
    target_array = %w(one two three)
    expect(subject.process('one,two|three', ',|')).to eq target_array
  end

  it 'correctly splits on an array of characters' do
    target_array = %w(one two three)
    expect(subject.process('one,two|three', [',', '|'])).to eq target_array
  end

  it 'correctly removes empty strings where they would otherwise be included' do
    target_array = %w(one two three)
    expect(subject.process('one,,two,three', ',')).to eq target_array
  end
end
