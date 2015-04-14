require "spec_helper"

name = "button"
stub_file_name = "foo/bar/_#{name}.yml"

describe Docks::PostProcessors::AssociateExternalStubFiles do
  subject { Docks::PostProcessors::AssociateExternalStubFiles }

  describe ".post_process" do
    before :each do
      files = {}
      files[Docks::Types::Languages::MARKUP] = []
      files[Docks::Types::Languages::SCRIPT] = []
      files[Docks::Types::Languages::STYLE] = []
      files[Docks::Types::Languages::DESCRIPTION] = []
      files[Docks::Types::Languages::STUB] = ["foo/bar/baz.yml", stub_file_name]

      expect(Docks.config).to receive(:files).at_least(:once).and_return files
    end

    let(:component) do
      {
        name: name,
        symbol_type: Docks::Types::Symbol::COMPONENT,
        stub: nil
      }
    end

    let(:my_stub) do
      { foo: :bar }
    end

    it "associates a stub file matching a component with the stub for that component" do
      expect(Docks::Language).to receive(:load_stub_for).with(stub_file_name).and_return my_stub
      subject.post_process([component])
      expect(component[:stub]).to eq my_stub
    end

    it "does not associate a stub file when none matches the component" do
      component[:name] = "qux"
      expect(Docks::Language).not_to receive(:load_stub_for)
      expect { subject.post_process([component]) }.not_to change { component }
    end

    it "does not associate a stub file when the component already has a stub" do
      component[:stub] = { bar: :baz }
      expect(Docks::Language).not_to receive(:load_stub_for)
      expect { subject.post_process([component]) }.not_to change { component }
    end

    it "only associates stub files with components" do
      component[:symbol_type] = Docks::Types::Symbol::FUNCTION
      expect(Docks::Language).not_to receive(:load_stub_for)
      expect { subject.post_process([component]) }.not_to change { component }
    end
  end
end
