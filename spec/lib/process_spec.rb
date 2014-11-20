require 'spec_helper'

describe Docks::Process do
  subject { Docks::Process }

  before :all do
    Docks::Tags.register_bundled_tags
  end

  describe '.process' do
    it 'parses each tag individually' do
      subject.should_receive(:process_tag).with(:page, 'Page')
      subject.should_receive(:process_tag).with(:subtitle, 'Subtitle')

      subject.process({ page: 'Page', subtitle: 'Subtitle' })
    end
  end

  describe '.process_tag' do
    it 'calls all blocks associated with a one_per_block tag and returns the result' do
      title = 'Title'
      expect(subject.process_tag(:title, [title])).to eq title
    end

    it 'calls all blocks on each element of a multiple_per_block tag (but not multiple_per_line) and returns the mapped result' do
      param_one = '{String} name'
      param_two = '{Number} count'

      result = subject.process_tag(:param, [param_one, param_two])
      expect(result.length).to eq 2
      expect(result[0]).to eq subject.process_tag(:param, [param_one]).first
      expect(result[1]).to eq subject.process_tag(:param, [param_two]).first
    end

    it 'calls all blocks on each element of a multiple_per_line and concatenated each set of results together' do
      set_by_one = ':active'
      set_by_two = ':state (STATE::ACTIVE)'
      set_by_three = ':is_active?'

      result = subject.process_tag(:set_by, [["#{set_by_one}, #{set_by_two}"], [set_by_three]])
      expect(result.length).to eq 3
      expect(result).to include(subject.process_tag(:set_by, [[set_by_one]]).first)
      expect(result).to include(subject.process_tag(:set_by, [[set_by_two]]).first)
      expect(result).to include(subject.process_tag(:set_by, [[set_by_three]]).first)
    end
  end
end
