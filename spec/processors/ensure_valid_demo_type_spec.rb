require 'spec_helper'

describe Docks::Processors::EnsureValidDemoType do
  subject { Docks::Processors::EnsureValidDemoType }

  it 'correctly returns the default type when a non-string is passed' do
    expect(subject.process(:invalid)).to eq Docks::Types::Demo::DEFAULT
  end

  it 'correctly returns a valid demo type' do
    valid_types = Docks::Types::Demo.constants.map { |const| Docks::Types::Demo.const_get(const) }
    valid_types.each do |type|
      expect(subject.process(type)).to eq type
    end
  end

  it 'correctly sets the demo type to the default when an invalid demo type is provided' do
    expect(subject.process('invalid')).to eq Docks::Types::Demo::DEFAULT
  end
end
