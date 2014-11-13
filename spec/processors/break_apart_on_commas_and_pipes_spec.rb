require 'spec_helper'

describe Docks::Processors::BreakApartOnCommasAndPipes do
  subject { Docks::Processors::BreakApartOnCommasAndPipes }

  it 'correctly returns the original argument if a non-String and non-Array was passed' do
    content = { foo: :bar }
    expect(subject.process(content)).to eq content
  end

  it 'correctly splits breaks apart commas' do
    target_array = %w(Array String)

    expect(subject.process('Array, String')).to eq target_array
    expect(subject.process('Array ,String')).to eq target_array
    expect(subject.process('Array , String')).to eq target_array
    expect(subject.process('Array ,, String')).to eq target_array
  end

  it 'correctly splits breaks apart pipes' do
    target_array = %w(Array String)

    expect(subject.process('Array| String')).to eq target_array
    expect(subject.process('Array |String')).to eq target_array
    expect(subject.process('Array | String')).to eq target_array
    expect(subject.process('Array || String')).to eq target_array
  end

  it 'correctly leaves internal spaces as a single item' do
    target_array = ['Item 1', 'Item 2']

    expect(subject.process(' Item 1 , Item 2  ')).to eq target_array
  end

  it 'correctly joins together results of a passed array' do
    target_array = %w(Array Object String Hash)
    expect(subject.process(['Array, Object', 'String | Hash'])).to eq target_array
  end
end
