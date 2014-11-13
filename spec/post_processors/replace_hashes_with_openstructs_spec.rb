require 'spec_helper'

describe Docks::PostProcessors::ReplaceHashesWithOpenStructs do
  subject { Docks::PostProcessors::ReplaceHashesWithOpenStructs }
  let(:simple_hash) { { foo: 'bar', bar: 'baz', baz: 'foo' } }
  let(:complex_hash) do
    { foo: simple_hash,
      bar: [simple_hash, simple_hash],
      baz: 'foo',
       }
  end
  let(:simple_array) { %w(foo bar baz) }
  let(:complex_array) { [simple_hash, complex_hash, simple_array, 'bar'] }

  let(:content) do
    { non_array_hash: "I'm a string!",
      simple_hash: simple_hash,
      complex_hash: complex_hash,
      simple_array: simple_array,
      complex_array: complex_array }
  end

  let(:expected_simple_hash_result) { OpenStruct.new(content[:simple_hash]) }
  let(:expected_complex_hash_result) do
    OpenStruct.new({
      foo: expected_simple_hash_result,
      bar: [expected_simple_hash_result, expected_simple_hash_result],
      baz: 'foo'
    })
  end

  let(:result) do
    result = {}
    content.each do |key, value|
      result[key] = subject.process(key, value)
    end

    result
  end

  it 'correctly handles simple arrays' do
    expect(result[:simple_array]).to eq content[:simple_array]
  end

  it 'correctly handles complex arrays (containing hashes and other arrays)' do
    expected_result = [
      OpenStruct.new(simple_hash),
      expected_complex_hash_result,
      simple_array,
      'bar'
    ]
    expect(result[:complex_array]).to eq expected_result
  end

  it 'correctly handles simple hashes' do
    expect(result[:simple_hash]).to eq expected_simple_hash_result
  end

  it 'correctly handles complex hashes (containing arrays and other hashes)' do
    expect(result[:complex_hash]).to eq expected_complex_hash_result
  end
end
