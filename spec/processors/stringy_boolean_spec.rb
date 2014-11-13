require 'spec_helper'

describe Docks::Processors::StringyBoolean do
  subject { Docks::Processors::StringyBoolean }

  it 'correctly returns a non-string argument' do
    value = :not_a_string
    expect(subject.process(value)).to eq value
  end

  it 'correctly defaults to true for an empty string' do
    expect(subject.process('')).to be true
  end

  it 'correctly defaults to true for a nil argument' do
    expect(subject.process(nil)).to be true
  end

  it 'correctly defaults to true a non-/false/ string' do
    expect(subject.process('Anything!')).to be true
    expect(subject.process('true')).to be true
    expect(subject.process('We are the knights...')).to be true
  end

  it 'correctly defaults to false for a string matching /false/' do
    expect(subject.process('false')).to be false
    expect(subject.process('  false')).to be false
    expect(subject.process('false    ')).to be false
    expect(subject.process('  false   ')).to be false
  end
end
