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
        expect(subject).to receive(:docks_path_to).with("Baz", hash_including(:language)).and_return("/pattern-library/baz")
        subject.render_everything
        expect(pattern.description).to eq "foo bar <a href='/pattern-library/baz'>baz</a>"
      end

      context "when there is a code block" do
        before(:each) do
          allow(subject).to receive(:render) { |opts| opts[:inline] }
        end

        let(:code_block) { "<div>\n  Foo\n</div>" }
        let(:language) { "html" }
        let(:markdown) { Redcarpet::Markdown.new(Docks::Markdown::Renderer, fenced_code_blocks: true) }

        it "renders a code block" do
          pattern.description = markdown.render(markdown_code_block)
          expect(subject).to receive(:docks_code_block) do |options|
            expect(options[:hideable?]).to be false
            expect(options[:demo?]).to be false

            code = options[:code]
            expect(code.length).to be 1
            expect(code.first[:code].strip).to eq code_block
            expect(code.first[:language]).to eq language
          end

          subject.render_everything
        end

        it "renders a code block with the a demo" do
          pattern.description = markdown.render(markdown_code_block(with_demo: true))
          expect(subject).to receive(:docks_code_block) do |options|
            expect(options[:hideable?]).to be true
            expect(options[:demo?]).to be true
          end

          subject.render_everything
        end

        it "adds a unique ID to each demo" do
          pattern.description = markdown.render(markdown_code_block * 2)

          ids = []
          expect(subject).to receive(:docks_code_block).twice do |options|
            ids.push(options[:id])
          end

          subject.render_everything
          expect(ids).to eq ids.uniq
        end

        private

        def markdown_code_block(options = {})
          options.fetch(:with_demo, false) ? "```#{language}_demo\n#{code_block}\n```" : "```#{language}\n#{code_block}\n```\n"
        end
      end
    end
  end
end
