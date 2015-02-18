require "spec_helper"

name = "button"
markup_file_name = "foo/bar/_#{name}.html"

describe Docks::PostProcessors::AssociateExternalMarkupFiles do
  subject { Docks::PostProcessors::AssociateExternalMarkupFiles }

  describe ".post_process" do
    before :each do
      files = {}
      files[Docks::Types::Languages::MARKUP] = ["foo/bar/baz.html", markup_file_name]
      files[Docks::Types::Languages::SCRIPT] = []
      files[Docks::Types::Languages::STYLE] = []
      files[Docks::Types::Languages::DESCRIPTION] = []
      files[Docks::Types::Languages::STUB] = []

      expect(Docks.configuration).to receive(:files).at_least(:once).and_return files
    end

    let(:component) do
      {
        name: name,
        symbol_type: Docks::Types::Symbol::COMPONENT,
        markup: nil
      }
    end

    let(:markup) { "<div class='foo'></div>" }

    it "associates a markup file matching a component with the markup for that component" do
      expect(File).to receive(:read).with(markup_file_name).and_return markup
      subject.post_process([component])
      expect(component[:markup]).to eq markup
    end

    it "does not associate a markup file when none matches the component" do
      component[:name] = "qux"
      expect(File).not_to receive(:read)
      expect { subject.post_process([component]) }.not_to change { component }
    end

    it "does not associate a markup file when the component already has a markup" do
      component[:markup] = "<div class='bar'></div>"
      expect(File).not_to receive(:read)
      expect { subject.post_process([component]) }.not_to change { component }
    end

    it "only associates markup files with components" do
      component[:symbol_type] = Docks::Types::Symbol::FUNCTION
      expect(File).not_to receive(:read)
      expect { subject.post_process([component]) }.not_to change { component }
    end
  end
end
