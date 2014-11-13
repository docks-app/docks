require 'spec_helper'

tag = :access
Docks::Tags.register_bundled_tags
processor = Docks::Process.new

describe tag do
  it 'correctly allows one of the included access types' do
    [
      Docks::Types::Access::PUBLIC,
      Docks::Types::Access::PRIVATE
    ].each do |access_type|
      expect(processor.process_tag(tag, access_type)).to eq access_type
    end
  end

  it 'correctly returns nil when none of the included access types are provided' do
    expect(processor.process_tag(tag, 'none of your business')).to be nil
  end
end
