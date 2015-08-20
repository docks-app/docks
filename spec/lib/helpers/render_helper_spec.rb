require "spec_helper"

describe Docks::Helpers::Render do
  subject do
    Class.new { include Docks::Helpers::Render }.new
  end

  describe "#render_everything" do
    let(:pattern) { Docks::Containers::Pattern.new(name: "foo") }
    let(:component) { Docks::Containers::Component.new(name: "foo") }
    before(:each) { subject.instance_variable_set(:@pattern, pattern) }

    describe "markup" do
      let(:markup) { "<% 5.times do %>foo<% end %>" }
      let(:output) { "foo" * 5 }
      before(:each) { pattern.add(:style, component) }

      it "does nothing for non-symbols" do
        pattern.param = OpenStruct.new(markup: markup)
        expect(subject).to_not receive(:render)
        subject.render_everything
      end

      it "does nothing for symbols without helper or markup" do
        expect(subject).to_not receive(:render)
        subject.render_everything
      end

      it "renders markup on the component" do
        component.markup = markup
        expect(subject).to receive(:render).with(inline: markup, layout: false).and_return(output)
        subject.render_everything
        expect(component.markup).to eq output
      end

      it "renders helper on the component" do
        component.helper = markup
        expect(subject).to receive(:render).with(inline: markup, layout: false).and_return(output)
        subject.render_everything
        expect(component.markup).to eq output
      end

      it "renders markup on nested variations" do
        state = Docks::Containers::State.new(name: "foo--bar", markup: markup)
        component.states << state
        expect(subject).to receive(:render).with(inline: markup, layout: false).and_return(output)
        subject.render_everything
        expect(state.markup).to eq output
      end

      it "renders helpers on nested variations" do
        state = Docks::Containers::State.new(name: "foo--bar", helper: markup)
        component.states << state
        expect(subject).to receive(:render).with(inline: markup, layout: false).and_return(output)
        subject.render_everything
        expect(state.markup).to eq output
      end
    end

    describe "description" do
      let(:description) { "<% %w(foo bar baz).each do |a| %><%= a %> <% end %>" }
      let(:output) { "foo bar baz" }

      it "renders the pattern description" do
        pattern.description = description
        expect(subject).to receive(:render).with(inline: description, layout: false).and_return(output)
        subject.render_everything
        expect(pattern.description).to eq output
      end

      it "renders the description on symbols" do
        component.description = description
        pattern.add(:style, component)
        expect(subject).to receive(:render).with(inline: description, layout: false).and_return(output)
        subject.render_everything
        expect(component.description).to eq output
      end

      it "renders the description on nested objects" do
        param = Docks::OpenStruct.new(description: description)
        component.params = [param]
        pattern.add(:style, component)
        expect(subject).to receive(:render).with(inline: description, layout: false).and_return(output)
        subject.render_everything
        expect(param.description).to eq output
      end

      it "doesn't kill the kind of object a nested object originally was" do
        param = Docks::OpenStruct.new(description: description)
        component.params = [param]
        pattern.add(:style, component)
        expect(subject).to receive(:render).with(inline: description, layout: false).and_return(output)
        subject.render_everything
        expect(component.params.first).to be param
      end

      it "renders @link declarations" do
        allow(subject).to receive(:render) { |opts| opts[:inline] }
        pattern.description = "foo bar <a href='@link Baz'>baz</a>"
        expect(subject).to receive(:docks_path).with("Baz", hash_including(:language)).and_return("/pattern-library/baz")
        subject.render_everything
        expect(pattern.description).to eq "foo bar <a href='/pattern-library/baz'>baz</a>"
      end

      it "calls the theme's render description helper" do
        allow(subject).to receive(:render) { |opts| opts[:inline] }
        pattern.description = "foo bar"
        expect(subject).to receive(:render_description_with_theme).with("foo bar", hash_including(:language)).and_return("baz qux")
        subject.render_everything
        expect(pattern.description).to eq "baz qux"
      end
    end
  end
end
