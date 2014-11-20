require 'spec_helper'

def expect_default_for_optionals_with_exclusions(result, *exclusions)
  exclusions.each { |excl| @optional_state_params.delete(excl) }

  @optional_state_params.each do |param|
    expect(result[param]).to eq @default_state_hash[param]
  end
end

describe Docks::Processors::BreakApartStatesAndVariants do
  before :each do
    @default_state_hash = {
      description: nil,
      activate_with: [],
      precludes: [],
      set_by: [],
      include_with: [],
      demo_type: Docks::Types::Demo::NONE,
      active: false,
      javascript_action: nil
    }

    @optional_state_params = [:description, :activate_with, :precludes, :set_by, :include_with, :demo_type, :active, :javascript_action]
  end

  subject { Docks::Processors::BreakApartStatesAndVariants }
  let(:name) { 'tab--is-active' }
  let(:description) { 'An active tab.' }
  let(:activate_with) { 'tab--is-important |  tab--is-valid' }
  let(:precludes) { 'tab--is-inactive' }
  let(:set_by) { 'TabList#activate | :state (Tabs::State::ACTIVE)' }
  let(:include_with) { 'tab-list' }
  let(:demo_type) { Docks::Types::Demo::SELECT }
  let(:active) { 'true' }
  let(:javascript_action) { 'this.activate()' }

  it 'correctly sets the defaults when parameters are not included' do
    result = subject.process(name)
    expect(result[:name]).to eq name

    expect_default_for_optionals_with_exclusions(result)
  end

  it 'correctly sets the description when one is provided without an options parenthetical' do
    [
      "#{name} #{description}",
      "#{name} -  #{description}"
    ].each do |str|
      result = subject.process(str)
      expect(result[:name]).to eq name
      expect(result[:description]).to eq description
      expect(result[:description]).to eq description

      expect_default_for_optionals_with_exclusions(result, :description)
    end
  end

  it 'correctly sets the description when one is provided with an options parenthetical' do
    [
      "#{name} (#{Docks::Types::Demo::NONE}) #{description}",
      "#{name} (#{Docks::Types::Demo::NONE}) -  #{description}"
    ].each do |str|
      result = subject.process(str)
      expect(result[:name]).to eq name
      expect(result[:description]).to eq description
      expect(result[:description]).to eq description
      expect(result[:demo_type]).to eq Docks::Types::Demo::NONE

      expect_default_for_optionals_with_exclusions(result, :description, :demo_type)
    end
  end

  it 'correctly sets the demo type when it is the only thing provided in the parenthetical' do
    demo_type = Docks::Types::Demo::SELECT
    result = subject.process("#{name} (#{demo_type})")
    expect(result[:demo_type]).to eq demo_type

    expect_default_for_optionals_with_exclusions(result, :demo_type)
  end

  it 'correctly sets the demo type when other key-value pairs are provided in the parenthetical' do
    result = subject.process("#{name} (#{demo_type}, activate with: #{activate_with})")
    expect(result[:name]).to eq name
    expect(result[:demo_type]).to eq demo_type
    expect(result[:activate_with]).to eq Docks::Processors::BreakApartOnCharacters.process(activate_with, "\s\|")

    expect_default_for_optionals_with_exclusions(result, :demo_type, :activate_with)
  end

  it 'correctly sets active parameter' do
    [
      "#{name} (active :  yup)",
      "#{name} (active: true)"
    ].each do |str|
      result = subject.process(str)
      expect(result[:name]).to eq name
      expect(result[:active]).to be true
      expect_default_for_optionals_with_exclusions(result, :active)
    end

    [
      "#{name} (active: false)",
      "#{name} (active :    false)"
    ].each do |str|
      result = subject.process(str)
      expect(result[:name]).to eq name
      expect(result[:active]).to be false
      expect_default_for_optionals_with_exclusions(result, :active)
    end
  end

  it 'correctly sets the include_with parameter' do
    result = subject.process("#{name} (include with :  #{include_with})")
    expect(result[:name]).to eq name
    expect(result[:include_with]).to eq Docks::Processors::BreakApartOnCharacters.process(include_with, "\s\|")

    expect_default_for_optionals_with_exclusions(result, :include_with)
  end

  it 'correctly sets the activate_with parameter' do
    result = subject.process("#{name} (activate with :  #{activate_with})")
    expect(result[:name]).to eq name
    expect(result[:activate_with]).to eq Docks::Processors::BreakApartOnCharacters.process(activate_with, "\s\|")

    expect_default_for_optionals_with_exclusions(result, :activate_with)
  end

  it 'correctly sets the precludes parameter' do
    result = subject.process("#{name} (precludes :  #{precludes})")
    expect(result[:name]).to eq name
    expect(result[:precludes]).to eq Docks::Processors::BreakApartOnCharacters.process(precludes, "\s\|")

    expect_default_for_optionals_with_exclusions(result, :precludes)
  end

  it 'correctly sets the javascript_action parameter' do
    result = subject.process("#{name} (javascript action :  #{javascript_action})")
    expect(result[:name]).to eq name
    expect(result[:javascript_action]).to eq javascript_action

    expect_default_for_optionals_with_exclusions(result, :javascript_action)
  end

  it 'correctly sets the set_by parameter' do
    result = subject.process("#{name} (set by :  #{set_by})")
    expect(result[:name]).to eq name
    expect(result[:set_by]).to eq Docks::Processors::NameAndParenthetical.process(Docks::Processors::BreakApartOnCharacters.process(set_by, "\|"), :setter, :constant)

    expect_default_for_optionals_with_exclusions(result, :set_by)
  end

  it 'correctly sets multiple parameters simultaneously' do
    [
      "#{name} ( #{demo_type},  activate_with  : #{activate_with} , include_with:  #{include_with} , precludes: #{precludes}, active : true, javascript action  : #{javascript_action},  set by :  #{set_by}) #{description}",
      "#{name} (#{demo_type},  activate_with  : #{activate_with} , include_with:  #{include_with} , precludes: #{precludes}, active : true, javascript action  : #{javascript_action},  set by :  #{set_by} ) -  #{description}"
    ].each do |str|
      result = subject.process(str)
      expect(result[:name]).to eq name
      expect(result[:description]).to eq description
      expect(result[:description]).to eq description
      expect(result[:demo_type]).to eq demo_type
      expect(result[:active]).to be true
      expect(result[:javascript_action]).to eq javascript_action
      [:include_with, :activate_with, :precludes].each do |param|
        expect(result[param]).to eq Docks::Processors::BreakApartOnCharacters.process(eval(param.to_s), "\s\|")
      end
      expect(result[:set_by]).to eq Docks::Processors::NameAndParenthetical.process(Docks::Processors::BreakApartOnCharacters.process(set_by, "\|"), :setter, :constant)
    end
  end
end
