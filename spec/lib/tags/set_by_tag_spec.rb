require 'spec_helper'

tag = :set_by
Docks::Tags.register_bundled_tags
processor = Docks::Process

describe tag do
  let(:simple_content) { [':checked?'] }
  let(:complex_setter) { ':size' }
  let(:complex_constant) { 'SIZE::LARGE' }
  let(:complex_content) { ["#{complex_setter} (#{complex_constant})"] }

  it 'correctly creates a :setter when there is no constant' do
    result = processor.process_tag(tag, simple_content).first
    expect(result[:setter]).to eq simple_content.first
  end

  it 'correctly creates a :setter when there is a constant' do
    result = processor.process_tag(tag, complex_content).first
    expect(result[:setter]).to eq complex_setter
  end

  it 'does not create a constant when no parentheses are provided' do
    result = processor.process_tag(tag, simple_content).first
    expect(result[:constant]).to be nil
  end

  it 'correctly creates a constant when one is provided without a key' do
    result = processor.process_tag(tag, complex_content).first
    expect(result[:constant]).to eq complex_constant
  end

  it 'correctly creates a constant when one is provided with the :constant key' do
    complex_content.first.sub!('(', '(constant: ')
    result = processor.process_tag(tag, complex_content).first
    expect(result[:constant]).to eq complex_constant
  end

  describe 'mutliple :set_by per line' do
    let(:setter_two) { ':state' }
    let(:constant_two) { 'STATE::CHECKED' }
    let(:content_two) { "#{setter_two}  (#{constant_two})" }

    it 'correctly creates multiple :set_by when they are separated by a comma' do
      [
        "#{complex_content.first}, #{content_two}, #{simple_content.first}",
        "#{complex_content.first} ,#{content_two} ,#{simple_content.first}",
        "#{complex_content.first}  ,   #{content_two}   , #{simple_content.first}"
      ].each do |test|
        result = processor.process_tag(tag, [test])
        expect(result.length).to eq 3

        expect(result[0][:setter]).to eq complex_setter
        expect(result[0][:constant]).to eq complex_constant
        expect(result[1][:setter]).to eq setter_two
        expect(result[1][:constant]).to eq constant_two
        expect(result[2][:setter]).to eq simple_content.first
        expect(result[2][:constant]).to be nil
      end
    end

    it 'correctly creates multiple :set_by when they are separated by a pipe' do
      [
        "#{complex_content.first}| #{content_two}| #{simple_content.first}",
        "#{complex_content.first} |#{content_two} |#{simple_content.first}",
        "#{complex_content.first}  |   #{content_two}   | #{simple_content.first}"
      ].each do |test|
        result = processor.process_tag(tag, [test])
        expect(result.length).to eq 3

        expect(result[0][:setter]).to eq complex_setter
        expect(result[0][:constant]).to eq complex_constant
        expect(result[1][:setter]).to eq setter_two
        expect(result[1][:constant]).to eq constant_two
        expect(result[2][:setter]).to eq simple_content.first
        expect(result[2][:constant]).to be nil
      end
    end

    it 'correctly creates multiple :set_by when there are multiple per line AND multiple per block' do
      [
        "#{complex_content.first}, #{content_two}",
        "#{complex_content.first} ,#{content_two}",
        "#{complex_content.first}  ,   #{content_two}"
      ].each do |test|
        result = processor.process_tag(tag, [test, simple_content.first])
        expect(result.length).to eq 3

        expect(result[0][:setter]).to eq complex_setter
        expect(result[0][:constant]).to eq complex_constant
        expect(result[1][:setter]).to eq setter_two
        expect(result[1][:constant]).to eq constant_two
        expect(result[2][:setter]).to eq simple_content.first
        expect(result[2][:constant]).to be nil
      end
    end
  end
end
