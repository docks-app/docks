require 'spec_helper'

describe Docks::Grouper do
  subject { Docks::Grouper }

  before :all do
    Docks::Languages.register_bundled_languages
  end

  it 'returns an empty Hash when no paths are provided' do
    expect(subject.group([])).to eq Hash.new
  end

  it 'returns an empty Hash when the passed glob does not match any files' do
    pattern = File.join(File.dirname(__FILE__), '../fixtures/grouper/components/non-existent-thing/*')
    expect(subject.group(pattern)).to eq Hash.new
  end

  it 'returns a nil identifier when a non-string is passed' do
    expect(subject.group_identifier(:nothing_to_see_here)).to be nil
  end

  it 'correctly groups together files of the same name that match the passed globbing patterns in an Array' do
    pattern = File.join(File.dirname(__FILE__), '../fixtures/grouper/components/button/*')
    files = Dir.glob(pattern)

    group_result = subject.group(pattern)
    button_result = group_result[subject.group_identifier(files.first)]

    expect(button_result).to eq files
  end

  it 'correctly groups together files of the same name when some of them have leading underscores' do
    pattern = File.join(File.dirname(__FILE__), '../fixtures/grouper/components/checkbox/*')
    files = Dir.glob(pattern)

    group_result = subject.group(pattern)
    result = group_result[subject.group_identifier(files.first)]

    expect(result).to eq files
  end

  it 'correctly groups together files of the same name when some of them have underscores instead of dashes' do
    pattern = File.join(File.dirname(__FILE__), '../fixtures/grouper/components/next-expanding-textarea/*')
    files = Dir.glob(pattern)

    group_result = subject.group(pattern)
    result = group_result[subject.group_identifier(files.first)]

    expect(result).to eq files
  end

  it 'correctly groups together files of the same name that match the passed globbing patterns with multiple globbing patterns, some of which do not reference actual files' do
    button_pattern = File.join(File.dirname(__FILE__), '../fixtures/grouper/components/button/*')
    button_files = Dir.glob(button_pattern)
    pattern_non_match = File.join(File.dirname(__FILE__), '../fixtures/grouper/components/non-existent-thing/*')

    group_result = subject.group([button_pattern, pattern_non_match])
    button_result = group_result[subject.group_identifier(button_files.first)]

    expect(button_result).to eq button_files
  end

  it 'correctly groups together files of the same name that match the passed globbing patterns with multiple globbing patterns that match' do
    button_pattern = File.join(File.dirname(__FILE__), '../fixtures/grouper/components/button/*')
    button_files = Dir.glob(button_pattern)

    tab_pattern = File.join(File.dirname(__FILE__), '../fixtures/grouper/components/next-tab/*')
    tab_files = Dir.glob(tab_pattern)

    group_result = subject.group([button_pattern, tab_pattern])
    button_result = group_result[subject.group_identifier(button_files.first)]
    tab_result = group_result[subject.group_identifier(tab_files.first)]

    expect(button_result).to eq button_files
    expect(tab_result).to eq tab_files
  end

  describe 'components spread across folders' do
    let(:globs) {
      [
        File.join(File.dirname(__FILE__), '../fixtures/grouper/markup/**/*.haml'),
        File.join(File.dirname(__FILE__), '../fixtures/grouper/scripts/**/*.coffee'),
        File.join(File.dirname(__FILE__), '../fixtures/grouper/style/**/*.scss')
      ]
    }

    let(:result) { subject.group(globs) }
    let(:expected_results) {
      {
        resizable: 2,
        list_view: 2,
        toggle: 3
      }
    }

    it 'correctly groups together files in dedicated scripts/ markup/ style folders' do
      expected_results.each do |group, file_count|
        expect(result[group].length).to eq file_count
      end
    end

    it 'correctly groups together files in dedicated scripts/ markup/ style folders and in component folders' do
      globs << File.join(File.dirname(__FILE__), '../fixtures/grouper/components/button/*')
      globs << File.join(File.dirname(__FILE__), '../fixtures/grouper/components/checkbox/*')
      expected_results[:button] = 3
      expected_results[:checkbox] = 3

      result = subject.group(globs)

      expected_results.each do |group, file_count|
        expect(result[group].length).to eq file_count
      end
    end
  end

  describe 'acceptance criteria' do
    it 'correctly rejects minified files' do
      pattern = File.join(File.dirname(__FILE__), '../fixtures/grouper/components/segmented control/*')
      files = Dir.glob(pattern).reject! { |filename| filename =~ /\.min\..*$/ }

      group_result = subject.group(pattern)
      component_result = group_result[subject.group_identifier(files.first)]

      expect(component_result).to eq files
    end

    it 'correctly rejects files not recognized by Docks' do
      pattern = File.join(File.dirname(__FILE__), '../fixtures/grouper/components/form/*')
      files = Dir.glob(pattern).select! { |filename| Docks::Languages.extensions.include?(File.extname(filename)[1..-1]) }

      group_result = subject.group(pattern)
      component_result = group_result[subject.group_identifier(files.first)]

      expect(component_result).to eq files
    end
  end

  it 'allows the identification method to be redefined' do
    built_in_group_identifier = subject.class_variable_get(:@@group_identifier)
    subject.group_identifier = lambda { |filename| :foo }
    expect(subject.group_identifier('bar')).to eq :foo
    subject.group_identifier = built_in_group_identifier
  end
end
