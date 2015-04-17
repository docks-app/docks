require "spec_helper"

describe Docks::Renderers::Haml do
  subject { Docks::Renderers::Haml.instance }

  describe "#render" do
    it "renders Haml" do
      haml_template = "%ul\n  - 5.times do |i|\n    %li Item \#{i + 1}"
      expect(subject.render(inline: haml_template).gsub(/\s/, "")).to eq File.read(File.expand_path("../../../fixtures/renderers/html_output.html", __FILE__)).gsub(/\s/, "")
    end

    it "captures Haml" do
      subject.helper_files = [File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)]
      expect(subject.render(inline: "= helper4 do\n  bar").strip).to eq "foo bar!"
    end

    it "renders a template with the passed locals" do
      expect(subject.render(inline: "= foo", locals: { foo: "bar" }).strip).to eq "bar"
    end

    it "renders a template with access to the same helpers as the base template" do
      subject.helper_files = [File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)]

      expect(subject.render(inline: "= helper\n= helper3").strip).to eq "foo bar baz\nBAR"
    end

    it "allows helpers to use classes in their scope" do
      subject.helper_files = [
        File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)
      ]

      expect(subject.render(inline: "= helper5").strip).to eq "thing one"
    end

    it "doesn't preserve locals between template renders" do
      haml_template = "= foo"

      subject.render(inline: haml_template, locals: { foo: "bar" })
      expect(subject.render(inline: haml_template, locals: { foo: "baz" }).strip).to eq "baz"
      expect(subject.render(inline: haml_template).strip).to eq ""
    end
  end
end
