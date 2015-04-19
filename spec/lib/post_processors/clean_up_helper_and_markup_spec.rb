require "spec_helper"

describe Docks::PostProcessors::CleanUpHelperAndMarkup do
  subject { Docks::PostProcessors::CleanUpHelperAndMarkup }

  before :all do
    Docks::Languages.register_bundled_languages
  end

  describe ".post_process" do
    let(:dedicated_markup) { "<div class='foo'></div>" }
    let(:markup_as_helper) { "<%= ui_foo(bar: :baz) %>" }
    let(:helper_name) { "ui_foo" }
    let(:alternate_helper_name) { "ui_bar" }
    let(:basic_stub) do
      { bar: :baz }
    end

    let(:complex_stub) do
      {
        "arguments" => [
          "bar",
          "baz",
          { qux: "foo", foo: "qux" }
        ]
      }
    end

    let(:component) do
      {
        name: "button",
        symbol_type: Docks::Types::Symbol::COMPONENT,
        language: "erb",
        helper: nil,
        markup: nil,
        stub: nil
      }
    end

    describe "basic scenarios" do
      it "does nothing when there is no helper or markup" do
        expect { subject.post_process([component]) }.not_to change { component }
      end

      it "does nothing when there is dedicated markup present" do
        component[:markup] = dedicated_markup
        expect { subject.post_process([component]) }.not_to change { component }
      end
    end

    describe "markup as helper" do
      it "reassigns the markup to helper when the markup contains the helper name" do
        component[:markup] = markup_as_helper
        component[:helper] = helper_name
        subject.post_process([component])
        expect(component[:markup]).to be nil
        expect(component[:helper]).to eq markup_as_helper
      end

      it "does not reassign the markup when it there isn't a helper" do
        component[:markup] = markup_as_helper
        subject.post_process([component])
        expect(component[:markup]).to be markup_as_helper
        expect(component[:helper]).to eq nil
      end

      it "does not reassign the markup when it the helper name is not present in it" do
        component[:markup] = markup_as_helper
        component[:helper] = alternate_helper_name
        subject.post_process([component])
        expect(component[:markup]).to be markup_as_helper
        expect(component[:helper]).to eq alternate_helper_name
      end
    end

    describe "helper name only" do
      it "does nothing when there is a helper, no markup, and no stub" do
        component[:helper] = markup_as_helper
        expect { subject.post_process([component]) }.not_to change { component }
      end

      it "functionizes the helper when there is a stub file" do
        component[:helper] = helper_name
        component[:stub] = complex_stub
        expect(Docks::Languages).to receive(:language_for).with(component[:language]).and_return(Docks::Languages::ERB.instance)
        subject.post_process([component])
        expect(component[:helper]).to eq Docks::Languages::ERB.instance.helper_markup_for(helper_name, complex_stub["arguments"])
      end

      it "cleans up the stub attribute" do
        component[:helper] = helper_name
        component[:stub] = complex_stub
        subject.post_process([component])
        expect(component[:stub]).to be nil
      end
    end
  end
end
