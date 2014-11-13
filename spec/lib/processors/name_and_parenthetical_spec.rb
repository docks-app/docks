require 'spec_helper'

describe Docks::Processors::NameAndParenthetical do
  subject { Docks::Processors::NameAndParenthetical }
  let(:basic_content) { ':checked?' }
  let(:basic_result) { subject.process(basic_content) }
  let(:complex_name) { 'Chris Sauve' }
  let(:complex_details) { 'email: chrismsauve@gmail.com' }
  let(:complex_content) { "#{complex_name}   (#{complex_details})" }

  it 'Should return an array of one hash when a string is passed' do
    expect(basic_result).to be_kind_of(Array)
    expect(basic_result.first).to be_kind_of(Hash)
  end

  it 'Should set the :name of the returned hash to the non-parenthetical part of the passed string if no custom name is passed' do
    expect(basic_result.first[:name]).to eq basic_content
    expect(subject.process(complex_content).first[:name]).to eq complex_name
  end

  it 'Should set the custom name of the returned hash to the passed non-parenthetical string' do
    custom_name = :setter
    processed = subject.process(basic_content, custom_name)
    expect(processed.first[custom_name]).to eq basic_content
  end

  it 'Should process each element of a passed array' do
    content = ['foo', 'bar', 'baz']
    processed = subject.process(content)
    expect(processed.length).to eq content.length
    processed.each_with_index do |processed_item, index|
      expect(processed_item[:name]).to eq content[index]
    end
  end

  it 'Joins the parenthetical results to the name' do
    parenthetical = {
      foo: 'bar',
      bar: 'baz'
    }
    parenthetical_as_string = ''
    parenthetical.to_a.each do |k, v|
      parenthetical_as_string << "#{k} : #{v}, "
    end
    parenthetical_as_string.sub(/,\s$/, '')

    parenthetical[:name] = basic_content

    content = "#{basic_content} (#{parenthetical_as_string})"
    expect(subject.process(content).first).to eq parenthetical
  end

  it 'Properly passes along the default to the parenthetical' do
    default_key, default_val = :value, 'true'
    content = "#{basic_content} (#{default_val})"
    expect(subject.process(content, :name, default_key).first[default_key]).to eq default_val
  end
end
