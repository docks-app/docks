require "spec_helper"

describe Docks::PostProcessors::PrepareVariationMarkup do
  subject { Docks::PostProcessors::PrepareVariationMarkup }

  let(:state_with_own_demo) do
    {
      name: "foo--bar",
      demo_type: Docks::Types::Demo::OWN,
      base_class: "foo"
    }
  end

  let(:state_with_no_demo) do
    {
      name: "foo--baz",
      demo_type: Docks::Types::Demo::SELECT,
      base_class: "foo"
    }
  end

  let(:component_markup) { "<div class='fool foo'><div class='foo__qux'></div></div>" }
  let(:component_helper_one) { "<%= docks_foo baz?: false, bar?: false %>" }
  let(:component_helper_two) { "<%= docks_foo type: :baz %>" }
  let(:component_helper_three) { "<%= docks_foo \"type\" => :baz %>" }

  let(:component) do
    {
      name: "foo",
      symbol_type: Docks::Types::Symbol::COMPONENT,
      state: [state_with_no_demo, state_with_own_demo],
      variant: []
    }
  end

  describe "#post_process" do
    it "adds adjusted markup to variations with their own demo" do
      component[:markup] = component_markup
      subject.post_process([component])
      expect(state_with_no_demo[:markup]).to be nil
      expect(state_with_own_demo[:markup]).to eq "<div class='fool foo foo--bar'><div class='foo__qux'></div></div>"
    end

    it "doesn't add markup when it already exists" do
      state_with_own_demo[:markup] = component[:markup] = component_markup
      expect { subject.post_process([component]) }.not_to change { state_with_own_demo }
    end

    it "doesn't add markup when helper markup already exists" do
      component[:markup] = component_markup
      state_with_own_demo[:helper] = component_helper_two
      state_with_own_demo[:set_by] = [{setter: "qux"}, {setter: ":type", constant: ":bar"}]
      expect { subject.post_process([component]) }.not_to change { state_with_own_demo }
    end

    it "adds adjusted helper markup with boolean parameters" do
      component[:helper] = component_helper_one
      state_with_own_demo[:set_by] = [{setter: ":bar?"}, {setter: "qux"}]
      subject.post_process([component])
      expect(state_with_no_demo[:helper]).to be nil
      expect(state_with_own_demo[:helper]).to eq "<%= docks_foo baz?: false, bar?: true %>"
    end

    it "adds adjusted helper markup with constant parameters" do
      component[:helper] = component_helper_two
      state_with_own_demo[:set_by] = [{setter: "qux"}, {setter: ":type", constant: ":bar"}]
      subject.post_process([component])
      expect(state_with_no_demo[:helper]).to be nil
      expect(state_with_own_demo[:helper]).to eq "<%= docks_foo type: :bar %>"
    end

    it "adds adjusted helper markup with alternative hash markups" do
      component[:helper] = component_helper_three
      state_with_own_demo[:set_by] = [{setter: "qux"}, {setter: "\"type\"", constant: "Foo::BAR"}]
      subject.post_process([component])
      expect(state_with_no_demo[:helper]).to be nil
      expect(state_with_own_demo[:helper]).to eq "<%= docks_foo \"type\" => Foo::BAR %>"
    end

    it "doesn't add helper markup when it already exists" do
      state_with_own_demo[:helper] = component[:helper] = component_helper_two
      state_with_own_demo[:set_by] = [{setter: "qux"}, {setter: ":type", constant: ":bar"}]
      expect { subject.post_process([component]) }.not_to change { state_with_own_demo }
    end

    it "doesn't add helper markup when it markup already exists" do
      component[:helper] = component_helper_two
      state_with_own_demo[:set_by] = [{setter: "qux"}, {setter: ":type", constant: ":bar"}]
      state_with_own_demo[:markup] = component_markup
      expect { subject.post_process([component]) }.not_to change { state_with_own_demo }
    end
  end
end
