require "spec_helper"

describe Docks::Processors::CodeBlockWithLanguageAndDescription do
  subject { Docks::Processors::CodeBlockWithLanguageAndDescription }

  let(:description) { "The description." }
  let(:language) { "scss" }
  let(:code) { [".foo {", "  content: 'bar';", "}"] }

  before :all do
    Docks::Languages.register_bundled_languages
  end

  it "uses the passed language if one is provided" do
    expect(subject.process(code.unshift(language))[:language]).to eq language
  end

  it "has a nil description when only the language is provided" do
    expect(subject.process(code.unshift(language))[:description]).to be nil
  end

  it "uses the description and language when provided" do
    result = subject.process(code.unshift("#{language} - #{description}"))
    expect(result[:description]).to eq description
    expect(result[:language]).to eq language
  end

  it "assigns the entire passed content to the code attribute when no language is provided" do
    expect(subject.process(code)[:code]).to eq Docks::Processors::JoinWithLineBreaks.process(code)
  end

  it "assigns the second thru last array items to the code attribute when a valid language is provided" do
    expect(subject.process(code.unshift(language))[:code]).to eq Docks::Processors::JoinWithLineBreaks.process(code)
  end

  it "assigns the second thru last array items to the code attribute when a valid language and description is provided" do
    result = subject.process(code.unshift("#{language} - #{description}"))
    expect(result[:code]).to eq Docks::Processors::JoinWithLineBreaks.process(code)
  end
end
