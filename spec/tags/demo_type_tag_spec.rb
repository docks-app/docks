require 'spec_helper'

tag = :demo_type
Docks::Tags.register_bundled_tags
processor = Docks::Process.new

describe tag do
  it 'correctly allows one of the included demo types' do
    [
      Docks::Types::Demo::SELECT,
      Docks::Types::Demo::JOINT,
      Docks::Types::Demo::OWN,
      Docks::Types::Demo::NONE
    ].each do |access_type|
      expect(processor.process_tag(tag, access_type)).to eq access_type
    end
  end

  it 'correctly returns the "none" type when none of the included demo types are provided' do
    expect(processor.process_tag(tag, 'none of your business')).to be Docks::Types::Demo::NONE
  end
end
