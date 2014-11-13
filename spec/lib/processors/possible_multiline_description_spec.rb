require 'spec_helper'

describe Docks::Processors::PossibleMultilineDescription do
  subject { Docks::Processors::PossibleMultilineDescription }
  let(:complex_content) { ['First content', 'Second content', 'Third content'] }

  it 'correctly returns a non-Array argument' do
    result = {not_an_array: true}
    final_result = subject.process(result) { |content| content }
    expect(subject.process(result)).to eq result
  end

  it 'correctly returns the original content if the yielded block did not return a Hash' do
    result = ['Hello!']
    final_result = subject.process(result) { |content| content }
    expect(final_result).to eq result
  end

  it 'correctly returns the original content if no block was passed' do
    result = ['Hello!']
    final_result = subject.process(result)
    expect(final_result).to eq result
  end

  it 'passes the first item in the array to the passed block' do
    subject.process(complex_content) do |content|
      expect(content).to eq complex_content.first
    end
  end

  it 'correctly preserves the hash returned by the block in the end result' do
    key = :name
    value = nil
    result = subject.process(complex_content) do |content|
      intermediate = {}
      intermediate[key] = value = content
      intermediate
    end

    expect(result[:name]).to eq value
  end

  it 'correctly joins the second thru last items of the passed array as the description' do
    key = :name

    result = subject.process(complex_content) do |content|
      intermediate = {}
      intermediate[key] = content
      intermediate
    end

    expect(result[:description]).to eq Docks::Processors::JoinWithSmartLineBreaks.process(['Second content', 'Third content'])
  end

  it 'correctly joins the description portion identified in the block to the rest of the description' do
    key = :name

    result = subject.process(complex_content) do |content|
      content = content.split(' ')
      intermediate = {}
      intermediate[key] = content[0]
      intermediate[:description] = content[1]
      intermediate
    end

    expect(result[:description]).to eq Docks::Processors::JoinWithSmartLineBreaks.process(['content', 'Second content', 'Third content'])
  end
end
