require "spec_helper"

name = "button"
description_file_name = "foo/bar/_#{name}.md"

describe Docks::PostProcessors::AssociateExternalDescriptionFiles do
  subject { Docks::PostProcessors::AssociateExternalDescriptionFiles }

  describe ".post_process" do
    let(:pattern) do
      {
        name: name.capitalize,
        symbol_type: Docks::Types::Symbol::PATTERN,
        description: nil
      }
    end

    let(:component) do
      {
        name: name,
        symbol_type: Docks::Types::Symbol::COMPONENT,
        description: nil
      }
    end

    let(:second_component) do
      {
        name: "segmented-button",
        symbol_type: Docks::Types::Symbol::COMPONENT,
        description: nil
      }
    end

    before :each do
      Docks.current_pattern = name
    end

    context "when there is only a pattern symbol" do
      before :each do
        expect(Docks::Group).to receive(:source_files_of_type).at_least(:once).with(Docks::Types::Languages::DESCRIPTION).and_return ["foo/bar/baz.md", description_file_name]
      end

      let(:description) { "Foo\n\nBar." }

      it "associates a description file matching a pattern with the description for that pattern" do
        expect(File).to receive(:read).with(description_file_name).and_return description
        subject.post_process([pattern])
        expect(pattern[:description]).to eq description
      end

      it "does not associate a description file when none matches the pattern" do
        Docks.current_pattern = "foo"
        expect(File).not_to receive(:read)
        expect { subject.post_process([pattern]) }.not_to change { pattern }
      end

      it "does not associate a description file when the pattern already has a description" do
        pattern[:description] = "foo"
        expect(File).to receive(:read).and_return description
        expect { subject.post_process([pattern]) }.not_to change { pattern }
      end
    end

    context "when there are other symbols" do
      description_file = File.expand_path("../../../fixtures/post_processors/associate_external_description_files/button.md", __FILE__)

      before :each do
        expect(Docks::Group).to receive(:source_files_of_type).at_least(:once).with(Docks::Types::Languages::DESCRIPTION).and_return [description_file]
      end

      let(:description_file_contents) { File.read(description_file) }

      it "associates the description with components based on headings and removes these from the pattern's description" do
        subject.post_process([pattern, component, second_component])
        expect(component[:description]).to eq Regexp.new("^# #{component[:name]}\\n(.*?)^# ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
        expect(second_component[:description]).to eq Regexp.new("^## #{second_component[:name]}\\n(.*)", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
        expect(pattern[:description]).to eq description_file_contents.sub(/#.*/m, "").strip
      end

      it "doesn't associate a description with a component with no matching heading" do
        component[:name] = "foo"
        subject.post_process([pattern, component])
        expect(component[:description]).to be nil
      end

      it "doesn't blow up when there is no pattern to take the rest of the description" do
        expect { subject.post_process([component]) }.not_to raise_error
        expect(component[:description]).to eq Regexp.new("^# #{component[:name]}\\n(.*?)^# ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
      end
    end

    context "when there are components" do
      description_file = File.expand_path("../../../fixtures/post_processors/associate_external_description_files/component.md", __FILE__)

      before :each do
        expect(Docks::Group).to receive(:source_files_of_type).at_least(:once).with(Docks::Types::Languages::DESCRIPTION).and_return [description_file]
        expect(Docks::Group).to receive(:group_identifier).with(description_file).and_return name
      end

      let(:description_file_contents) { File.read(description_file) }

      let(:state) do
        {
          name: "#{name}--is-active",
          symbol_type: Docks::Types::Symbol::STATE,
          description: nil
        }
      end

      let(:variant) do
        {
          name: "#{name}--large",
          symbol_type: Docks::Types::Symbol::VARIANT,
          description: nil
        }
      end

      it "does the description association for states" do
        component[:states] = [state]
        subject.post_process([component])

        expect(state[:description]).to eq Regexp.new("^## #{state[:name]}\\n(.*?)^## ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
        expect(component[:description]).to eq description_file_contents.sub(/[^#]*#.*/, "").sub(/##.*/m, "").strip
      end

      it "does the description association for variants" do
        component[:variants] = [variant]
        subject.post_process([component])

        expect(variant[:description]).to eq Regexp.new("^## #{variant[:name]}\\n(.*?)^# ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
        expect(component[:description]).to eq description_file_contents.sub(/[^#]*#.*/, "").sub(Regexp.new("## #{variant[:name]}.*", Regexp::MULTILINE), "").strip
      end

      it "doesn't do a description association for a state with an existing description" do
        state[:description] = "foo"
        component[:states] = [state]
        subject.post_process([component])

        expect(state[:description]).to eq "foo"
        expect(component[:description]).to eq description_file_contents.sub(/.*?^# [^\n]*\n\n/m, "").sub(/^# .*/m, "").strip
      end
    end

    context "when there are classes and factories" do
      description_file = File.expand_path("../../../fixtures/post_processors/associate_external_description_files/class.md", __FILE__)

      before :each do
        expect(Docks::Group).to receive(:source_files_of_type).at_least(:once).with(Docks::Types::Languages::DESCRIPTION).and_return [description_file]
        expect(Docks::Group).to receive(:group_identifier).with(description_file).and_return name
      end

      let(:description_file_contents) { File.read(description_file) }

      let(:method) do
        {
          name: "toggle",
          symbol_type: Docks::Types::Symbol::FUNCTION,
          description: nil
        }
      end

      let(:property) do
        {
          name: "is_active",
          symbol_type: Docks::Types::Symbol::VARIABLE,
          description: nil
        }
      end

      let(:klass) do
        {
          name: name.capitalize,
          symbol_type: Docks::Types::Symbol::CLASS,
          methods: [method],
          properties: [property],
          description: nil
        }
      end

      it "does the description association for methods" do
        subject.post_process([klass])

        expect(method[:description]).to eq Regexp.new("^## #{method[:name]}\\n(.*?)^# ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
        expect(klass[:description]).to eq description_file_contents.sub(/[^#]*#[^#]*#.*?$/m, "").sub(/##.*/m, "").strip
      end

      it "does the description association for properties" do
        subject.post_process([klass])

        expect(property[:description]).to eq Regexp.new("^## #{property[:name]}\\n(.*?)^## ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
        expect(klass[:description]).to eq description_file_contents.sub(/[^#]*#[^#]*#.*?$/m, "").sub(Regexp.new("## #{property[:name]}.*", Regexp::MULTILINE), "").strip
      end

      it "doesn't do a description association for a method with an existing description" do
        method[:description] = "foo"
        subject.post_process([klass])

        expect(method[:description]).to eq "foo"
        expect(klass[:description]).to eq description_file_contents.sub(/(.*?^# [^\n]*\n\n){2}/m, "").sub(/^## .*/m, "").strip
      end
    end

    context "when there are functions" do
      description_file = File.expand_path("../../../fixtures/post_processors/associate_external_description_files/function.md", __FILE__)

      before :each do
        expect(Docks::Group).to receive(:source_files_of_type).at_least(:once).with(Docks::Types::Languages::DESCRIPTION).and_return [description_file]
        expect(Docks::Group).to receive(:group_identifier).with(description_file).and_return name
      end

      let(:description_file_contents) { File.read(description_file) }

      let(:param) do
        {
          name: "options",
          description: nil
        }
      end

      let(:function) do
        {
          name: "toggle",
          symbol_type: Docks::Types::Symbol::FUNCTION,
          description: nil,
          param: [param]
        }
      end

      it "does the description association for parameters" do
        subject.post_process([function])

        expect(param[:description]).to eq Regexp.new("^### #{param[:name]}\\n(.*?)^# ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
        expect(function[:description]).to eq description_file_contents.sub(/(.*?^## [^\n]*\n\n){2}/m, "").sub(/^### .*/m, "").strip
      end

      it "doesn't do a description association for a method with an existing description" do
        param[:description] = "foo"
        subject.post_process([function])

        expect(param[:description]).to eq "foo"
        expect(function[:description]).to eq description_file_contents.sub(/(.*?^## [^\n]*\n\n){2}/m, "").sub(/^# .*/m, "").strip
      end
    end
  end
end
