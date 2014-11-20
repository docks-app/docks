require 'spec_helper'

describe Docks::PostProcessors::JoinOrphanedVariantsAndStates do
  subject { Docks::PostProcessors::JoinOrphanedVariantsAndStates }
  let(:orphan_variant) do
    { type: Docks::Types::Symbol::VARIANT,
      name: 'tab--large' }
  end

  let(:orphan_state) do
    { type: Docks::Types::Symbol::STATE,
      name: 'tab--is-active' }
  end

  let(:component) do
    { type: Docks::Types::Symbol::COMPONENT,
      name: 'tab' }
  end

  let(:unrelated_component) do
    { type: Docks::Types::Symbol::COMPONENT,
      name: 'button',
      variants: [],
      states: [] }
  end

  before :each do
    component[:variants] = component[:states] = nil
  end

  it 'joins orphaned states and variants occuring after the component' do
    result = subject.post_process([component, orphan_variant, orphan_state])
    expect(result.length).to eq 1
    expect(component[:variants]).to include(orphan_variant)
    expect(component[:states]).to include(orphan_state)
  end

  it 'joins orphaned states and variants occuring before the component' do
    result = subject.post_process([orphan_variant, orphan_state, component])
    expect(result.length).to eq 1
    expect(component[:variants]).to include(orphan_variant)
    expect(component[:states]).to include(orphan_state)
  end

  it 'joins orphaned states and variants where an unrelated component comes between the base component and them' do
    result = subject.post_process([component, unrelated_component, orphan_variant, orphan_state])
    expect(result.length).to eq 2
    expect(component[:variants]).to include(orphan_variant)
    expect(component[:states]).to include(orphan_state)
  end

  it 'creates a component when none matches the base class of an orphaned state/ variant' do
    result = subject.post_process([orphan_variant, unrelated_component, orphan_state])
    expect(result.length).to eq 2
    tab_component = result.select { |component| component[:name] == 'tab' }.first
    expect(tab_component[:variants]).to include(orphan_variant)
    expect(tab_component[:states]).to include(orphan_state)
  end
end
