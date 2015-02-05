require 'spec_helper'

describe Docks::PostProcessors::CleanUpVariantsAndStates do
  subject { Docks::PostProcessors::CleanUpVariantsAndStates }

  it 'sets appropriate defaults' do
    default = {
      demo_type: Docks::Types::Demo::DEFAULT,
      active: 'false',
      description: nil,
      precludes: [],
      set_by: [],
      include_with: [],
      javascript_action: nil
    }

    result_state = subject.post_process([{ name: 'tab', symbol_type: Docks::Types::Symbol::COMPONENT, state: [{ name: 'tab--is-active', symbol_type: Docks::Types::Symbol::STATE }] }]).first[:state].first
    default.each do |k, v|
      expect(result_state[k]).to eq v
    end
  end

  it 'sets sets the base class of the state/ variant' do
    result_state = subject.post_process([{ name: 'tab', symbol_type: Docks::Types::Symbol::COMPONENT, state: [{ name: 'tab--is-active', symbol_type: Docks::Types::Symbol::STATE }] }]).first[:state].first
    expect(result_state[:base_class]).to include('tab')
  end

  it 'sets adds the base class to include_with' do
    result_state = subject.post_process([{ name: 'tab', symbol_type: Docks::Types::Symbol::COMPONENT, state: [{ name: 'tab--is-active', symbol_type: Docks::Types::Symbol::STATE }] }]).first[:state].first
    expect(result_state[:activate_with]).to include('tab')
  end

  it 'prepends the base class to the state/ variant name' do
    result_state = subject.post_process([{ name: 'tab', symbol_type: Docks::Types::Symbol::COMPONENT, state: [{ name: '--is-active', symbol_type: Docks::Types::Symbol::STATE }] }]).first[:state].first
    expect(result_state[:name]).to eq 'tab--is-active'
  end

  it 'prepends the base class to the activate_with, include_with, and precludes details' do
    result_state = subject.post_process([{ name: 'tab', symbol_type: Docks::Types::Symbol::COMPONENT, state: [{ name: '--is-active', symbol_type: Docks::Types::Symbol::STATE, precludes: ['--is-inactive'], activate_with: ['--visible'], include_with: ['--visible'] }] }]).first[:state].first
    expect(result_state[:precludes]).to include('tab--is-inactive')
    expect(result_state[:activate_with]).to include('tab--visible')
    expect(result_state[:include_with]).to include('tab--visible')
  end

  it 'removes non-class content from the start of class names' do
    result_state = subject.post_process([{ name: 'tab', symbol_type: Docks::Types::Symbol::COMPONENT, state: [{ name: '&.tab--is-active', symbol_type: Docks::Types::Symbol::STATE }] }]).first[:state].first
    expect(result_state[:name]).to eq 'tab--is-active'
  end
end
