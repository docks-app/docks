require "spec_helper"

describe Docks::Tags::State do
  subject { Docks::Tags::State.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "allows multiple tags per block" do
    expect(subject.multiple_allowed?).to be true
  end

  describe "#process" do
    before :each do
      @default_state_hash = {
        description: nil,
        activate_with: [],
        precludes: [],
        set_by: [],
        include_with: [],
        demo_type: Docks::Types::Demo::DEFAULT,
        active: false,
        javascript_action: nil
      }

      @optional_state_params = [:description, :activate_with, :precludes, :set_by, :include_with, :demo_type, :active, :javascript_action]
    end

    let(:name) { "tab--is-active" }
    let(:description) { "An active tab." }
    let(:activate_with) { "tab--is-important |  tab--is-valid" }
    let(:precludes) { "tab--is-inactive" }
    let(:set_by) { "TabList#activate | :state (Tabs::State::ACTIVE)" }
    let(:include_with) { "tab-list" }
    let(:demo_type) { Docks::Types::Demo::SELECT }
    let(:active) { "true" }
    let(:javascript_action) { "this.activate()" }

    it "creates states as their container" do
      symbol = Docks::Containers::Symbol.new(states: [name])
      subject.process(symbol)
      expect(symbol.states.length).to be 1
      expect(symbol.states.first).to be_a Docks::Containers::State
    end

    it "sets the defaults when parameters are not included" do
      result = subject.send(:break_apart_variation_details, name)
      expect(result[:name]).to eq name

      expect_default_for_optionals_with_exclusions(result)
    end

    it "sets the description when one is provided without an options parenthetical" do
      [
        "#{name} #{description}",
        "#{name} -  #{description}"
      ].each do |str|
        result = subject.send(:break_apart_variation_details, str)
        expect(result[:name]).to eq name
        expect(result[:description]).to eq description
        expect(result[:description]).to eq description

        expect_default_for_optionals_with_exclusions(result, :description)
      end
    end

    it "sets the description when one is provided with an options parenthetical" do
      [
        "#{name} (#{Docks::Types::Demo::NONE}) #{description}",
        "#{name} (#{Docks::Types::Demo::NONE}) -  #{description}"
      ].each do |str|
        result = subject.send(:break_apart_variation_details, str)
        expect(result[:name]).to eq name
        expect(result[:description]).to eq description
        expect(result[:description]).to eq description
        expect(result[:demo_type]).to eq Docks::Types::Demo::NONE

        expect_default_for_optionals_with_exclusions(result, :description, :demo_type)
      end
    end

    it "sets the demo type when it is the only thing provided in the parenthetical" do
      demo_type = Docks::Types::Demo::SELECT
      result = subject.send(:break_apart_variation_details, "#{name} (#{demo_type})")
      expect(result[:demo_type]).to eq demo_type

      expect_default_for_optionals_with_exclusions(result, :demo_type)
    end

    it "sets the demo type when other key-value pairs are provided in the parenthetical" do
      result = subject.send(:break_apart_variation_details, "#{name} (#{demo_type}, activate with: #{activate_with})")
      expect(result[:name]).to eq name
      expect(result[:demo_type]).to eq demo_type
      expect(result[:activate_with]).to eq Docks::Processors.split_on_characters(activate_with, "\s\|")

      expect_default_for_optionals_with_exclusions(result, :demo_type, :activate_with)
    end

    it "sets active parameter" do
      [
        "#{name} (active :  yup)",
        "#{name} (active: true)"
      ].each do |str|
        result = subject.send(:break_apart_variation_details, str)
        expect(result[:name]).to eq name
        expect(result[:active]).to be true
        expect_default_for_optionals_with_exclusions(result, :active)
      end

      [
        "#{name} (active: false)",
        "#{name} (active :    false)"
      ].each do |str|
        result = subject.send(:break_apart_variation_details, str)
        expect(result[:name]).to eq name
        expect(result[:active]).to be false
        expect_default_for_optionals_with_exclusions(result, :active)
      end
    end

    it "sets the include_with parameter" do
      result = subject.send(:break_apart_variation_details, "#{name} (include with :  #{include_with})")
      expect(result[:name]).to eq name
      expect(result[:include_with]).to eq Docks::Processors.split_on_characters(include_with, "\s\|")

      expect_default_for_optionals_with_exclusions(result, :include_with)
    end

    it "sets the activate_with parameter" do
      result = subject.send(:break_apart_variation_details, "#{name} (activate with :  #{activate_with})")
      expect(result[:name]).to eq name
      expect(result[:activate_with]).to eq Docks::Processors.split_on_characters(activate_with, "\s\|")

      expect_default_for_optionals_with_exclusions(result, :activate_with)
    end

    it "sets the precludes parameter" do
      result = subject.send(:break_apart_variation_details, "#{name} (precludes :  #{precludes})")
      expect(result[:name]).to eq name
      expect(result[:precludes]).to eq Docks::Processors.split_on_characters(precludes, "\s\|")

      expect_default_for_optionals_with_exclusions(result, :precludes)
    end

    it "sets the javascript_action parameter" do
      result = subject.send(:break_apart_variation_details, "#{name} (javascript action :  #{javascript_action})")
      expect(result[:name]).to eq name
      expect(result[:javascript_action]).to eq javascript_action

      expect_default_for_optionals_with_exclusions(result, :javascript_action)
    end

    it "sets the set_by parameter" do
      result = subject.send(:break_apart_variation_details, "#{name} (set by :  #{set_by})")
      expected_setters = Docks::Processors.split_on_top_level_parens_commas_and_pipes(set_by).map do |setter|
        Docks::Processors.name_and_parenthetical(setter, :setter, :constant)
      end

      expect(result[:name]).to eq name
      expect(result[:set_by]).to eq expected_setters

      expect_default_for_optionals_with_exclusions(result, :set_by)
    end

    it "sets multiple parameters simultaneously" do
      [
        "#{name} ( #{demo_type},  activate_with  : #{activate_with} , include_with:  #{include_with} , precludes: #{precludes}, active : true, javascript action  : #{javascript_action},  set by :  #{set_by}) #{description}",
        "#{name} (#{demo_type},  activate_with  : #{activate_with} , include_with:  #{include_with} , precludes: #{precludes}, active : true, javascript action  : #{javascript_action},  set by :  #{set_by} ) -  #{description}"
      ].each do |str|
        result = subject.send(:break_apart_variation_details, str)
        expected_setters = Docks::Processors.split_on_top_level_parens_commas_and_pipes(set_by).map do |setter|
          Docks::Processors.name_and_parenthetical(setter, :setter, :constant)
        end

        expect(result[:name]).to eq name
        expect(result[:description]).to eq description
        expect(result[:description]).to eq description
        expect(result[:demo_type]).to eq demo_type
        expect(result[:active]).to be true
        expect(result[:javascript_action]).to eq javascript_action
        [:include_with, :activate_with, :precludes].each do |param|
          expect(result[param]).to eq Docks::Processors.split_on_characters(eval(param.to_s), "\s\|")
        end
        expect(result[:set_by]).to eq expected_setters
      end
    end

    private

    def expect_default_for_optionals_with_exclusions(result, *exclusions)
      exclusions.each { |excl| @optional_state_params.delete(excl) }

      @optional_state_params.each do |param|
        expect(result[param]).to eq @default_state_hash[param]
      end
    end
  end
end
