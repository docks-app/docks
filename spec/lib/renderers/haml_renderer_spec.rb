require "spec_helper"

describe Docks::Renderers::Haml do
  subject { Docks::Renderers::Haml.new }

  after :each do
    subject.instance_variable_set(:@content_blocks, Hash.new)
    subject.send(:clean)
  end

  describe "#render" do
    it "renders Haml" do
      haml_template = "%ul\n  - 5.times do |i|\n    %li Item \#{i + 1}"
      expect(subject.render(inline: haml_template).gsub(/\s/, "")).to eq File.read(File.expand_path("../../../fixtures/renderers/html_output.html", __FILE__)).gsub(/\s/, "")
    end

    it "captures Haml" do
      subject.helpers File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)
      expect(subject.render(inline: "= helper4 do\n  bar").strip).to eq "foo bar!"
    end

    it "captures Haml with arguments" do
      subject.helpers File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)
      expect(subject.render(inline: "= helper6('bar') do |val|\n  foo \#{val}").strip).to eq "foo bar"
    end

    it "renders a template with the passed locals" do
      expect(subject.render(inline: "= foo", locals: { foo: "bar" }).strip).to eq "bar"
    end

    it "renders a template with access to the same helpers as the base template" do
      subject.helpers File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)

      expect(subject.render(inline: "= helper\n= helper3").strip).to eq "foo bar baz\nBAR"
    end

    it "allows helpers to use classes in their scope" do
      subject.helpers File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)

      expect(subject.render(inline: "= helper5").strip).to eq "thing one"
    end

    it "allows helpers to be called from within capture blocks" do
      subject.helpers File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)

      expect(subject.render(inline: "= helper4 do\n  = render(inline: 'foo')").strip).to eq "foo foo!"
    end

    it "doesn't preserve locals between template renders" do
      haml_template = "= foo"

      subject.render(inline: haml_template, locals: { foo: "bar" })
      expect(subject.render(inline: haml_template, locals: { foo: "baz" }).strip).to eq "baz"
      expect(subject.render(inline: haml_template, locals: { foo: "" }).strip).to eq ""
    end

    context "when there's a layout" do
      it "allows setting a layout file that is rendered around the main file" do
        layout = "Foo \#{yield.strip} baz"
        expect(Docks::Templates).to receive(:search_for_template).with(layout, anything).and_return(layout)
        expect(File).to receive(:read).with(layout).and_return(layout)

        expect(subject.render(inline: "bar", layout: layout).strip).to eq "Foo bar baz"
      end

      describe "#content_for" do
        it "allows setting the content for multiple yielded blocks using #content_for" do
          layout = "Foo \#{yield(:first).strip} \#{yield(:second).strip}."
          expect(Docks::Templates).to receive(:search_for_template).with(layout, anything).and_return(layout)
          expect(File).to receive(:read).with(layout).and_return(layout)

          expect(subject.render(inline: "- content_for(:first) do\n  bar\n\n- content_for(:second) do\n  baz", layout: layout).strip).to eq "Foo bar baz."
        end

        it "allows both named and a default content block" do
          layout = "Foo \#{yield(:first).strip} \#{yield.strip}."
          expect(Docks::Templates).to receive(:search_for_template).with(layout, anything).and_return(layout)
          expect(File).to receive(:read).with(layout).and_return(layout)

          expect(subject.render(inline: "- content_for(:first) do\n  bar\n\nbaz", layout: layout).strip).to eq "Foo bar baz."
        end

        it "yields do a given content block when no block is given" do
          layout = "Foo \#{content_for(:first).strip} \#{yield.strip}."
          expect(Docks::Templates).to receive(:search_for_template).with(layout, anything).and_return(layout)
          expect(File).to receive(:read).with(layout).and_return(layout)

          expect(subject.render(inline: "- content_for(:first) do\n  bar\n\nbaz", layout: layout).strip).to eq "Foo bar baz."
        end
      end

      describe "#content_for?" do
        it "identifies whether a block has been given" do
          layout = "first? \#{content_for?(:first).to_s}, second? \#{content_for?(:second).to_s}"
          expect(Docks::Templates).to receive(:search_for_template).with(layout, anything).and_return(layout)
          expect(File).to receive(:read).with(layout).and_return(layout)

          expect(subject.render(inline: "- content_for(:first) do\n  bar", layout: layout).strip).to eq "first? true, second? false"
        end
      end
    end
  end
end
