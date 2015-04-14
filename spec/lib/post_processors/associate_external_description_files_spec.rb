require "spec_helper"

name = "button"
description_file_name = "foo/bar/_#{name}.md"

describe Docks::PostProcessors::AssociateExternalDescriptionFiles do
  subject { Docks::PostProcessors::AssociateExternalDescriptionFiles }

  describe ".post_process" do
    before :each do
      files = {}
      files[Docks::Types::Languages::MARKUP] = []
      files[Docks::Types::Languages::SCRIPT] = []
      files[Docks::Types::Languages::STYLE] = []
      files[Docks::Types::Languages::DESCRIPTION] = ["foo/bar/baz.md", description_file_name]
      files[Docks::Types::Languages::STUB] = []

      expect(Docks.config).to receive(:files).at_least(:once).and_return files
    end

    let(:component) do
      {
        name: name,
        symbol_type: Docks::Types::Symbol::COMPONENT,
        description: nil
      }
    end

    let(:description) { "Foo\n\nBar." }

    it "associates a description file matching a component with the description for that component" do
      expect(File).to receive(:read).with(description_file_name).and_return description
      subject.post_process([component])
      expect(component[:description]).to eq description
    end

    it "does not associate a description file when none matches the component" do
      component[:name] = "qux"
      expect(File).not_to receive(:read)
      expect { subject.post_process([component]) }.not_to change { component }
    end

    it "does not associate a description file when the component already has a description" do
      component[:description] = "foo"
      expect(File).not_to receive(:read)
      expect { subject.post_process([component]) }.not_to change { component }
    end

    it "only associates description files with components" do
      component[:symbol_type] = Docks::Types::Symbol::FUNCTION
      expect(File).not_to receive(:read)
      expect { subject.post_process([component]) }.not_to change { component }
    end
  end
end
