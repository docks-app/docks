require 'spec_helper'

describe Docks::Processors::ReplaceHashWithOpenStruct do
  subject { Docks::Processors::ReplaceHashWithOpenStruct }

  it 'Correctly returns non-Array and non-Hash arguments' do
    content = :non_hash_array
    expect(subject.process(content)).to eq content
  end

  it 'Correctly OpenStruct-s a Hash' do
    content = { foo: :bar }
    expect(subject.process(content)).to eq OpenStruct.new(content)
  end

  it 'Correctly OpenStruct-s an Array of Hashes' do
    hash_one = { foo: :bar }
    hash_two = { bar: :baz }
    expect(subject.process([hash_one, hash_two])).to eq [OpenStruct.new(hash_one), OpenStruct.new(hash_two)]
  end

  it 'Correctly ignores non-Hash elements of a passed Array' do
    thing_one = { foo: :bar }
    thing_two = :non_hash
    expect(subject.process([thing_one, thing_two])).to eq [OpenStruct.new(thing_one), thing_two]
  end
end
