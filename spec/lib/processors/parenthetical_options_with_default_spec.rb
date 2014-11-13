require 'spec_helper'

describe Docks::Processors::ParentheticalOptionsWithDefault do
  subject { Docks::Processors::ParentheticalOptionsWithDefault }
  let(:default) { :foo }
  let(:value) { 'bar' }
  let(:simple_result) {
    result = {}
    result[default] = value
    result
  }

  it 'correctly associates a default value when no key-value pairs are found' do
    expect(subject.process(value, default)).to eq simple_result
  end

  it 'correctly creates a non-default key even if it is the only one provided' do
    non_default = :bar
    non_default_value = 'baz'
    non_default_result = {}
    non_default_result[non_default] = non_default_value
    expect(subject.process("(#{non_default}: #{non_default_value})", default)).to eq non_default_result
  end

  it 'correctly creates a single key value pair' do
    expect(subject.process("#{default}: #{value}")).to eq simple_result
    expect(subject.process("#{default}:   #{value}")).to eq simple_result
    expect(subject.process("#{default} : #{value}")).to eq simple_result
    expect(subject.process("#{default}   :  #{value}")).to eq simple_result
  end

  it 'correctly creates multiple key value pairs' do
    key_2 = :bar
    val_2 = 'baz'
    pair_1 = "#{default}: #{value}"
    pair_2 = "#{key_2}: #{val_2}"
    simple_result[key_2] = val_2

    expect(subject.process("#{pair_1}, #{pair_2}")).to eq simple_result
    expect(subject.process("#{pair_1},   #{pair_2}")).to eq simple_result
    expect(subject.process("#{pair_1} ,#{pair_2}")).to eq simple_result
    expect(subject.process("#{pair_1}   ,#{pair_2}")).to eq simple_result
    expect(subject.process("#{pair_1} , #{pair_2}")).to eq simple_result
    expect(subject.process("#{pair_1}   ,  #{pair_2}")).to eq simple_result
  end

  describe 'multi-word keys' do
    let(:key_string) { 'Activate with' }
    let(:key) { key_string.downcase.gsub(/\s+/, '_').to_sym }
    let(:result) {
      result = {}
      result[key] = key_string
      result
    }

    it 'correctly creates key-value pairs by symbolizing spaced keys' do
      expect(subject.process("#{key_string}: #{key_string}")).to eq result
    end

    it 'correctly creates multiple key-value pairs that include multi-word keys' do
      result.merge!(simple_result)
      expect(subject.process("#{default}: #{value}  , #{key_string} : #{key_string}")).to eq result
    end
  end

  it 'correctly creates a default key when a non-default key-value pair is also provided' do
    key_2 = :bar
    val_2 = 'baz'
    simple_result[key_2] = val_2
    content = "#{value}, #{key_2}: #{val_2}"

    expect(subject.process(content, default)).to eq simple_result
  end
end
