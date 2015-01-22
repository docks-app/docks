require 'spec_helper'

describe Docks::Processors::CodeBlockWithLanguage do
  subject { Docks::Processors::CodeBlockWithLanguage }
  let(:language) { 'scss' }
  let(:code) { ['.foo {', "  content: 'bar';", '}'] }

  before :all do
    Docks::Language.register_bundled_languages
  end

  it 'correctly returns an empty hash when a non-array is passed' do
    val = :not_an_array
    expect(subject.process(val)).to eq Hash.new
  end

  it 'defaults to the defualt language when no language is provided' do
    expect(subject.process(code)[:language]).to eq Docks::Language.default_language
  end

  it 'correctly uses the passed language if one is provided' do
    expect(subject.process(code.clone.unshift(language))[:language]).to eq language
  end

  it 'correctly assigns the entire passed content to the code attribute when no language is provided' do
    expect(subject.process(code)[:code]).to eq Docks::Processors::JoinWithLineBreaks.process(code)
  end

  it 'correctly assigns the second thru last array items to the code attribute when a valid language is provided' do
    expect(subject.process(code.clone.unshift(language))[:code]).to eq Docks::Processors::JoinWithLineBreaks.process(code)
  end
end
