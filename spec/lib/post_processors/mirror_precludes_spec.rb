require 'spec_helper'

describe Docks::PostProcessors::MirrorPrecludes do
  subject { Docks::PostProcessors::MirrorPrecludes }

  let(:state_one_name) { 'tab--is-active' }
  let(:state_two_name) { 'tab--is-inactive' }
  let(:state_three_name) { 'tab--super-active' }

  let(:state_one) do
    {
      name: state_one_name,
      precludes: [state_two_name]
    }
  end

  let(:state_two) do
    {
      name: state_two_name,
      precludes: []
    }
  end

  let(:state_three) do
    {
      name: state_three_name,
      precludes: []
    }
  end

  let(:component) do
    {
      type: Docks::Types::Symbol::COMPONENT,
      name: 'tab',
      states: [state_one, state_two],
      variants: []
    }
  end

  it 'Mirrors a single preclusion to the precluded state/ variant' do
    resulting_component = subject.post_process([component]).first
    expect(resulting_component[:states].last[:precludes]).to include(state_one_name)
  end

  it 'Does not mirror a preclusion if the class is already included' do
    state_two[:precludes] = [state_one_name]
    resulting_component = subject.post_process([component]).first
    expect(resulting_component[:states].last[:precludes]).to include(state_one_name)
    expect(resulting_component[:states].last[:precludes].length).to eq 1
  end

  it 'Mirrors preclusions to multiple states/ variants' do
    state_two[:precludes] = []
    state_one[:precludes] << state_three_name

    component[:variants] << state_three

    resulting_component = subject.post_process([component]).first
    expect(resulting_component[:states].last[:precludes]).to include(state_one_name)
    expect(resulting_component[:variants].last[:precludes]).to include(state_one_name)
  end

  it 'Mirrors preclusions to states/ variants processed earlier in the method' do
    state_two[:precludes] = []
    state_three[:precludes] = [state_one_name]

    component[:variants] << state_three

    resulting_component = subject.post_process([component]).first
    expect(resulting_component[:states].first[:precludes]).to include(state_three_name)
  end
end
