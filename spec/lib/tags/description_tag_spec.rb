require "spec_helper"

describe Docks::Tags::Description do
  subject { Docks::Tags::Description.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "only allows one description per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "connects multiline content with smart line breaks" do
      description = ["foo", "bar"]
      symbol = Docks::Containers::Symbol.new(description: description.dup)
      expect(subject.process(symbol)).to eq Docks::Processors.join_with_smart_line_breaks(description)
    end
  end

  describe "post process" do
    before(:each) do
      Docks::Languages.register_bundled_languages
    end

    describe "associating external description files" do
      let(:name) { "button" }
      let(:pattern) { Docks::Containers::Pattern.new(name) }
      let(:component) { Docks::Containers::Component.new(name: name) }
      let(:second_component) { Docks::Containers::Component.new(name: "segmented-button") }

      before(:each) do
        allow_any_instance_of(Redcarpet::Markdown).to receive(:render) { |renderer, code| code }
      end

      context "when there is only a pattern symbol" do
        let(:description_file) { "pattern-lab/descriptions/_#{name}.md" }
        let(:description) { "Foo\n\nBar." }

        before(:each) { pattern.files = [description_file] }

        it "associates a description file matching a pattern with the description for that pattern" do
          expect(File).to receive(:read).with(description_file).and_return description
          process_pattern
          expect(pattern.description).to eq description
        end

        it "does not associate a description file when the pattern already has a description" do
          pattern.description = "foo"
          expect(File).to receive(:read).with(description_file).and_return description
          expect { process_pattern }.not_to change { pattern }
        end
      end

      context "when there are other symbols" do
        let(:description_file) { File.expand_path("../../../fixtures/post_processors/associate_external_description_files/button.md", __FILE__) }
        let(:description_file_contents) { File.read(description_file) }

        before(:each) do
          pattern.add(:style, [component, second_component])
          pattern.files = [description_file]
        end

        it "associates the description with components based on headings and removes these from the pattern's description" do
          process_pattern
          expect(component.description).to eq Regexp.new("^# #{component.name}\\n(.*?)^# ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
          expect(second_component.description).to eq Regexp.new("^## #{second_component.name}\\n(.*)", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
          expect(pattern.description).to eq description_file_contents.sub(/#.*/m, "").strip
        end

        it "doesn't associate a description with a component with no matching heading" do
          component.name = "foo"
          process_pattern
          expect(component.description).to be nil
        end

        it "doesn't blow up when there is no pattern to take the rest of the description" do
          expect { process_pattern }.not_to raise_error
          expect(component.description).to eq Regexp.new("^# #{component.name}\\n(.*?)^# ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
        end
      end

      context "when there are components" do
        let(:description_file) { File.expand_path("../../../fixtures/post_processors/associate_external_description_files/component.md", __FILE__) }
        let(:description_file_contents) { File.read(description_file) }

        before(:each) do
          pattern.files = [description_file]
          pattern.add(:style, component)
        end

        let(:state) { Docks::Containers::State.new(name: "#{name}--is-active") }
        let(:variant) { Docks::Containers::State.new(name: "#{name}--large") }

        it "does the description association for states" do
          component.states << state
          process_pattern

          expect(state.description).to eq Regexp.new("^## #{state.name}\\n(.*?)^## ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
          expect(component.description).to eq description_file_contents.sub(/[^#]*#.*/, "").sub(/##.*/m, "").strip
        end

        it "does the description association for variants" do
          component.variants << variant
          process_pattern

          expect(variant.description).to eq Regexp.new("^## #{variant.name}\\n(.*?)^# ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
          expect(component.description).to eq description_file_contents.sub(/[^#]*#.*/, "").sub(Regexp.new("## #{variant.name}.*", Regexp::MULTILINE), "").strip
        end

        it "doesn't do a description association for a state with an existing description" do
          state.description = "foo"
          component.states << state
          process_pattern

          expect(state.description).to eq "foo"
          expect(component.description).to eq description_file_contents.sub(/.*?^# [^\n]*\n\n/m, "").sub(/^# .*/m, "").strip
        end
      end

      context "when there are classes and factories" do
        let(:description_file) { File.expand_path("../../../fixtures/post_processors/associate_external_description_files/class.md", __FILE__) }
        let(:description_file_contents) { File.read(description_file) }

        let(:method) { Docks::Containers::Function.new(name: "toggle") }
        let(:property) { Docks::Containers::Variable.new(name: "is_active") }
        let(:klass) { Docks::Containers::Klass.new(name: name.capitalize, methods: [method], properties: [property]) }

        before(:each) do
          pattern.files = [description_file]
          pattern.add(:script, klass)
        end

        it "does the description association for methods" do
          process_pattern

          expect(method.description).to eq Regexp.new("^## #{method.name}\\n(.*?)^# ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
          expect(klass.description).to eq description_file_contents.sub(/[^#]*#[^#]*#.*?$/m, "").sub(/##.*/m, "").strip
        end

        it "does the description association for properties" do
          process_pattern

          expect(property.description).to eq Regexp.new("^## #{property.name}\\n(.*?)^## ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
          expect(klass.description).to eq description_file_contents.sub(/[^#]*#[^#]*#.*?$/m, "").sub(Regexp.new("## #{property.name}.*", Regexp::MULTILINE), "").strip
        end

        it "doesn't do a description association for a method with an existing description" do
          method.description = "foo"
          process_pattern

          expect(method.description).to eq "foo"
          expect(klass.description).to eq description_file_contents.sub(/(.*?^# [^\n]*\n\n){2}/m, "").sub(/^## .*/m, "").strip
        end
      end

      context "when there are functions" do
        let(:description_file) { File.expand_path("../../../fixtures/post_processors/associate_external_description_files/function.md", __FILE__) }
        let(:description_file_contents) { File.read(description_file) }

        let(:param) { OpenStruct.new(name: "options") }
        let(:function) { Docks::Containers::Function.new(name: "toggle", params: [param]) }

        before(:each) do
          pattern.files = [description_file]
          pattern.add(:script, function)
        end

        it "does the description association for parameters" do
          process_pattern

          expect(param.description).to eq Regexp.new("^### #{param.name}\\n(.*?)^# ", Regexp::MULTILINE).match(description_file_contents).captures.first.strip
          expect(function.description).to eq description_file_contents.sub(/(.*?^## [^\n]*\n\n){2}/m, "").sub(/^### .*/m, "").strip
        end

        it "doesn't do a description association for a parameter with an existing description" do
          param.description = "foo"
          process_pattern

          expect(param.description).to eq "foo"
          expect(function.description).to eq description_file_contents.sub(/(.*?^## [^\n]*\n\n){2}/m, "").sub(/^# .*/m, "").strip
        end
      end

      private

      def process_pattern
        Docks::Process.process(pattern)
      end
    end

    describe "rendering markdown descriptions" do
      let(:param) { OpenStruct.new(name: "options", description: nil) }
      let(:method) { Docks::Containers::Function.new(name: "toggle", static: true, params: [param]) }
      let(:factory) { Docks::Containers::Factory.new(name: "Foo", methods: [method]) }
      let(:pattern) do
        pattern = Docks::Containers::Pattern.new("foo")
        pattern.add(:script, factory)
        pattern
      end

      it "uses the custom markdown renderer" do
        expect(subject.instance_variable_get(:@markdown).renderer).to be_an_instance_of Docks::Markdown::Renderer
      end

      it "nils out empty, all-whitespace, and nil descriptions" do
        param.description = "   \n "
        method.description = ""
        factory.description = "  "
        process_pattern

        expect(param.description).to be nil
        expect(method.description).to be nil
        expect(factory.description).to be nil
        expect(pattern.description).to be nil
      end

      it "calls the markdown renderer recursively for all items that need descriptions" do
        factory_description = "This is a pattern"
        factory.description = factory_description
        param_description = "This is a parameter"
        param.description = param_description

        expect_any_instance_of(Redcarpet::Markdown).to receive(:render).with(factory_description).and_call_original
        expect_any_instance_of(Redcarpet::Markdown).to receive(:render).with(param_description).and_call_original

        process_pattern
      end

      private

      def process_pattern
        Docks::Process.process(pattern)
      end
    end
  end
end
