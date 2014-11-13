require 'spec_helper'

def content_for_multiline_text_fixture(fixture)
  file = File.join(File.dirname(__FILE__), '..', 'fixtures', 'processors', "#{fixture}.txt")
  File.read(file).split("\n")
end

def paragraph_count(text)
  text.split(/\n+/).length
end

describe Docks::Processors::JoinWithSmartLineBreaks do
  subject { Docks::Processors::JoinWithSmartLineBreaks }

  it 'correctly returns a non-array argument' do
    non_array = "I'm not an array!"
    expect(subject.process(non_array)).to eq non_array
  end

  it 'correctly identifies paragraphs without joins' do
    content = content_for_multiline_text_fixture(:multiline_text_without_joins)
    paragraphs = paragraph_count(subject.process(content))
    expect(paragraphs).to eq 1
  end

  it 'correctly identifies paragraphs with joins' do
    content = content_for_multiline_text_fixture(:multiline_text_with_joins)
    paragraphs = paragraph_count(subject.process(content))
    expect(paragraphs).to eq 2
  end

  it 'correctly identifies paragraphs with mixed joins' do
    content = content_for_multiline_text_fixture(:multiline_text_with_mixed_joins)
    paragraphs = paragraph_count(subject.process(content))
    expect(paragraphs).to eq 4
  end

  it 'correctly identifies paragraphs with leading uncapitalized letters' do
    content = content_for_multiline_text_fixture(:multiline_text_with_uncapitalized_paragraph)
    paragraphs = paragraph_count(subject.process(content))
    expect(paragraphs).to eq 2
  end

  it 'correctly returns nil for an empty array' do
    expect(subject.process([])).to be nil
  end

  it 'correctly returns nil for an array containing only whitespace strings' do
    expect(subject.process([' '])).to be nil
    expect(subject.process([' ', '   '])).to be nil
  end

  describe 'fenced code blocks' do
    let(:text) do
      content = content_for_multiline_text_fixture(:multiline_text_with_code_block)
      subject.process(content)
    end

    let(:code_block) do
      first_code_fence_index = text.index('```')
      second_code_fence_index = text.index('```', first_code_fence_index + 1) + 2

      text[first_code_fence_index..second_code_fence_index]
    end

    it 'correctly creates only a single line break between fenced code blocks' do
      expect(code_block.split("\n").length).to eq 5
    end

    it 'correctly creates paragraphs with an embedded fenced code block' do
      text.sub!(code_block, '')
      paragraphs = paragraph_count(text)
      expect(paragraphs).to eq 3
    end

    it 'correctly creates paragraphs when a code block is followed by an uncapitalized paragraph' do
      content = content_for_multiline_text_fixture(:multiline_text_with_code_block_and_trailing_uncapitalized_paragraph)
      content = subject.process(content)
      content.sub!(/```[^`]*```/, '')
      paragraphs = paragraph_count(subject.process(content))
      expect(paragraphs).to eq 3
    end
  end
end
