require "spec_helper"

describe Docks::PostProcessors::AddFriendlyPresentations do
  subject { Docks::PostProcessors::AddFriendlyPresentations }

  let(:symbol) do
    { name: "foo" }
  end

  let(:symbol_with_friendly) do
    { name: "bar", friendly_presenter: "bar" }
  end

  before(:each) do
    Docks.current_file = "foo.scss"
    Docks.current_language = Docks::Languages::SCSS.instance
  end

  it "asks the current language for the friendly name of the symbol" do
    expect(Docks.current_language).to receive(:friendly_presentation).with(symbol)
    subject.post_process([symbol])
  end

  it "assigns the friendly presentation to the symbol" do
    subject.post_process([symbol])
    expect(symbol[:friendly_presenter]).to eq Docks.current_language.friendly_presentation(symbol)
  end

  it "does not overwrite an existing friendly presentation" do
    before = symbol_with_friendly[:friendly_presenter]
    subject.post_process([symbol_with_friendly])
    expect(symbol_with_friendly[:friendly_presenter]).to eq before
  end
end
