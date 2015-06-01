require "spec_helper"

describe Docks::Tags::Markup do
  subject { Docks::Tags::Markup.instance }

  it "allows multiline content" do
    expect(subject.multiline?).to be true
  end

  it "only allows one description per block" do
    expect(subject.multiple_allowed?).to be false
  end

  describe "#process" do
    it "connects multiline content with line breaks" do
      markup = ["foo", "bar"]
      symbol = Docks::Containers::Symbol.new(markup: markup.dup)
      subject.process(symbol)
      expect(symbol[subject.name]).to eq markup.join("\n")
    end
  end

  describe "post processing" do
    let(:name) { "foo" }
    let(:markup_file_name) { "pattern_lab/markup/_#{name}.erb" }
    let(:stub_file_name) { "pattern_lab/stubs/#{name}.json" }
    let(:markup) { "<div class='#{name}'>content!</div>" }

    let(:component) { Docks::Containers::Component.new(name: name) }
    let(:pattern) do
      pattern = Docks::Containers::Pattern.new(name)
      pattern.add(:style, component)
      pattern
    end

    before(:each) { Docks::Languages.register_bundled_languages }

    describe "markup association and clean up" do
      let(:name) { "foo" }
      let(:markup_file_name) { "pattern_lab/markup/_#{name}.erb" }
      let(:stub_file_name) { "pattern_lab/stubs/#{name}.json" }
      let(:markup) { "<div class='#{name}'>content!</div>" }

      let(:component) { Docks::Containers::Component.new(name: name) }
      let(:pattern) do
        pattern = Docks::Containers::Pattern.new(name)
        pattern.add(:style, component)
        pattern
      end

      describe "associates external markup files" do
        before :each do
          expect(Docks::Group).to receive(:source_files_of_type).with(Docks::Types::Languages::MARKUP).at_least(:once).and_return ["components/baz.erb", markup_file_name]
          expect(Docks::Group).to receive(:source_files_of_type).with(Docks::Types::Languages::STUB).at_least(:once).and_return []
        end

        it "associates a markup file matching a component with the markup for that component" do
          expect(File).to receive(:read).with(markup_file_name).and_return(markup)
          post_process
          expect(component.markup).to eq markup
        end

        it "does not associate a markup file when none matches the component" do
          component.name = "qux"
          expect(File).not_to receive(:read)
          expect { post_process }.not_to change { component }
        end

        it "does not associate a markup file when the component already has a markup" do
          component.markup = "<div class='bar'></div>"
          expect(File).not_to receive(:read)
          expect { post_process }.not_to change { component }
        end

        it "only associates markup files with components" do
          pattern.remove(component)
          function = Docks::Containers::Function.new(name: name)
          pattern.add(:style, function)
          expect(File).not_to receive(:read)
          expect { post_process }.not_to change { function }
        end
      end

      describe "creates helper functions from a helper method name and external stub file" do
        let(:stub) do
          { foo: "bar", baz: "qux" }
        end
        let(:stub_language) { Docks::Languages::JSON.instance }

        before :each do
          component.helper = "foo"

          expect(Docks::Group).to receive(:source_files_of_type).with(Docks::Types::Languages::MARKUP).at_least(:once).and_return []
          expect(Docks::Group).to receive(:source_files_of_type).with(Docks::Types::Languages::STUB).at_least(:once).and_return ["stubs/baz.yml", stub_file_name]
        end

        it "does not create helper markup if there is regular markup" do
          component.markup = "foo"
          expect { post_process }.not_to change { component }
        end

        it "does not create helper markup when no stubs match the component" do
          component.name = "qux"
          expect { post_process }.not_to change { component }
        end

        it "does not create helper markup there is no helper method" do
          component.helper = nil
          expect { post_process }.not_to change { component }
        end

        it "adds helper markup from ERB by default when there is a helper name and associated stub" do
          helper = "<%= foo bar: :baz %>"
          expect(stub_language).to receive(:load_stub).and_return(stub)
          expect(Docks::Languages::ERB.instance).to receive(:helper_markup_for).with(component.helper, stub).and_return(helper)
          post_process
          expect(component.helper).to eq helper
        end

        it "doesn't add helper markup when the most common markup file type is HTML" do
          expect(Docks::Languages).to receive(:most_common_markup_language).and_return(Docks::Languages::HTML.instance)
          expect { post_process }.not_to change { component }
        end

        it "only associates markup files with components" do
          pattern.remove(component)
          function = Docks::Containers::Function.new(name: name, helper: "foo")
          pattern.add(:style, function)
          expect { post_process }.not_to change { function }
        end
      end

      describe "cleans up the combination of markup and helper" do
        before(:each) do
          expect(Docks::Group).to receive(:source_files_of_type).at_least(:once).and_return []
        end

        it "leaves everything alone when the markup and helper don't overlap" do
          component.helper = component.markup = nil
          expect { post_process }.not_to change { component }

          component.helper = nil
          component.markup = "<div>foo</div>"
          expect { post_process }.not_to change { component }

          component.markup = nil
          component.helper = "<div>foo</div>"
          expect { post_process }.not_to change { component }

          component.helper = "<div>bar</div>"
          component.markup = "<div>foo</div>"
          expect { post_process }.not_to change { component }
        end

        it "overwrites the helper with the markup when the helper name is contained in the markup" do
          markup = "<%= ui_foo bar: 'baz' %>\n  <p>foo bar baz</p>\n<% end %>"
          component.helper = "ui_foo"
          component.markup = markup

          post_process

          expect(component.helper).to eq markup
          expect(component.markup).to be nil
        end
      end

      def post_process
        Docks::Process.process(pattern)
      end
    end

    describe "clean up the markup for variations" do
      let(:state_with_demo) { Docks::Containers::State.new(name: "foo--is-bar") }
      let(:state_without_demo) { Docks::Containers::State.new(name: "foo--is-baz") }
      let(:component) { Docks::Containers::Component.new(name: "foo", states: [state_without_demo, state_with_demo]) }

      let(:pattern) do
        pattern = Docks::Containers::Pattern.new("foo")
        pattern.add(:style, component)
        pattern
      end

      let(:component_markup) { "<div class='fool foo'><div class='foo__qux'></div></div>" }
      let(:component_helper_one) { "<%= docks_foo baz?: false, bar?: false %>" }
      let(:component_helper_two) { "<%= docks_foo type: :baz %>" }
      let(:component_helper_three) { "<%= docks_foo \"type\" => :baz %>" }

      before(:each) do
        expect(state_with_demo).to receive(:has_demo?).and_return true
        expect(state_without_demo).to receive(:has_demo?).and_return false
      end

      it "adds adjusted markup to variations with their own demo" do
        component.markup = component_markup
        post_process

        expect(state_without_demo.markup).to be nil
        expect(state_with_demo.markup).to eq "<div class='fool foo foo--is-bar'><div class='foo__qux'></div></div>"
      end

      it "doesn't add markup when it already exists" do
        state_with_demo.markup = component.markup = component_markup
        expect { post_process }.not_to change { state_with_demo }
      end

      it "doesn't add markup when helper markup already exists" do
        component.markup = component_markup
        state_with_demo.helper = component_helper_two
        state_with_demo.set_by.concat [{setter: "qux"}, {setter: ":type", constant: ":bar"}]
        expect { post_process }.not_to change { state_with_demo }
      end

      it "adds adjusted helper markup with boolean parameters" do
        component.helper = component_helper_one
        state_with_demo.set_by.concat [{setter: ":bar?"}, {setter: "qux"}]
        post_process
        expect(state_without_demo.helper).to be nil
        expect(state_with_demo.helper).to eq "<%= docks_foo baz?: false, bar?: true %>"
      end

      it "adds adjusted helper markup with constant parameters" do
        component.helper = component_helper_two
        state_with_demo.set_by.concat [{setter: "qux"}, {setter: ":type", constant: ":bar"}]
        post_process
        expect(state_without_demo.helper).to be nil
        expect(state_with_demo.helper).to eq "<%= docks_foo type: :bar %>"
      end

      it "adds adjusted helper markup with alternative hash markups" do
        component.helper = component_helper_three
        state_with_demo.set_by.concat [{setter: "qux"}, {setter: "\"type\"", constant: "Foo::BAR"}]
        post_process
        expect(state_without_demo.helper).to be nil
        expect(state_with_demo.helper).to eq "<%= docks_foo \"type\" => Foo::BAR %>"
      end

      it "doesn't add helper markup when it already exists" do
        state_with_demo.helper = component.helper = component_helper_two
        state_with_demo.set_by.concat [{setter: "qux"}, {setter: ":type", constant: ":bar"}]
        expect { post_process }.not_to change { state_with_demo }
      end

      it "doesn't add helper markup when it markup already exists" do
        component.helper = component_helper_two
        state_with_demo.set_by.concat [{setter: "qux"}, {setter: ":type", constant: ":bar"}]
        state_with_demo.markup = component_markup
        expect { post_process }.not_to change { state_with_demo }
      end

      def post_process
        Docks::Process.process(pattern)
      end
    end
  end
end
