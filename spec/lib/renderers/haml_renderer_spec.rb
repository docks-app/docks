require "spec_helper"

describe Docks::Renderers::Haml do
  fixture_dir = File.expand_path("../../../fixtures/renderers/haml", __FILE__)

  subject { Docks::Renderers::Haml.instance }

  before :each do
    Docks.configure do |config|
      config.root = fixture_dir
      config.library_assets = ""
    end
  end

  describe "#render" do
    it "renders Haml correctly" do
      expect(subject.render("template").gsub(/\s/, "")).to eq File.read(File.join(fixture_dir, "..", "html_output.html")).gsub(/\s/, "")
    end

    it "renders a template with the passed locals" do
      expect(subject.render("with_locals", foo: "bar").strip).to eq "bar"
    end

    it "renders a template with access to the same helpers as the base template" do
      subject.helper_files = [
        File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)
      ]

      expect(subject.render("with_helpers").strip).to eq "foo bar baz\nbar"
    end

    it "doesn't preserve locals between template renders" do
      subject.render("with_locals", locals: { foo: "bar" })
      expect(subject.render("with_locals", foo: "baz").strip).to eq "baz"
      expect(subject.render("with_locals").strip).to eq ""
    end
  end
end