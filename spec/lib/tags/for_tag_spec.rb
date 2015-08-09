require "spec_helper"

describe Docks::Tags::For do
  subject { Docks::Tags::For.instance }

  it "does not allow multiline content" do
    expect(subject.multiline?).to be false
  end

  it "only allows one tag per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "post process" do
    let(:pattern) { Docks::Containers::Pattern.new(name: "foo") }

    context "when there are components with variations" do
      let(:variant) { Docks::Containers::Variant.new(name: "foo--bar") }
      let(:state) { Docks::Containers::State.new(name: "foo--is-bar") }
      let(:component) { Docks::Containers::Component.new(name: "foo", states: [state], variants: [variant]) }

      before(:each) { pattern.add(:style, component) }

      it "adds the component name for states and variants" do
        post_process

        expect(variant.for).to eq component.name
        expect(state.for).to eq component.name
      end

      it "adds the for attribute on states and variants in subcomponents" do
        sub_state = Docks::Containers::State.new(name: "foo__bar--is-baz")
        subcomponent = Docks::Containers::Component.new(name: "foo__bar", states: [sub_state])
        component.subcomponents << subcomponent
        post_process

        expect(sub_state.for).to eq subcomponent.name
      end
    end

    def post_process
      Docks::Process.process(pattern)
    end
  end
end
