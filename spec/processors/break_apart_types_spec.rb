require 'spec_helper'

describe Docks::Processors::BreakApartTypes do
  subject { Docks::Processors::BreakApartTypes }
  let(:target_array) { %w(Array String) }

  it 'correctly returns an array for non-String and non-Array value' do
    value_one = :not_valid
    value_two = nil
    expect(subject.process(value_one)).to eq Array.new
    expect(subject.process(value_two)).to eq Array.new
  end

  it 'correctly breaks apart commas' do
    expect(subject.process('{Array, String}')).to eq target_array
    expect(subject.process('{Array ,String}')).to eq target_array
    expect(subject.process('{Array , String}')).to eq target_array
    expect(subject.process('{Array ,, ,String}')).to eq target_array
  end

  it 'correctly breaks apart pipes' do
    expect(subject.process('{Array| String}')).to eq target_array
    expect(subject.process('{Array |String}')).to eq target_array
    expect(subject.process('{Array | String}')).to eq target_array
    expect(subject.process('{Array || |String}')).to eq target_array
  end

  it 'correctly breaks apart spaces alone' do
    expect(subject.process('{Array String}')).to eq target_array
    expect(subject.process('{Array  String}')).to eq target_array
  end

  it 'correctly joins together results of a passed array' do
    expect(subject.process(['{Array}', '{String}'])).to eq target_array
  end
end
