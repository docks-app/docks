require "spec_helper"

describe Docks::Renderers::Base do
  fixture_dir = File.expand_path("../../../fixtures/renderers", __FILE__)
  partials_dir = File.join(fixture_dir, "partials")

  subject { Docks::Renderers::Base.instance }

  before :all do
    Docks.configure do |config|
      config.partials_dir = partials_dir
      config.root = fixture_dir
    end
  end

  after :each do
    subject.send(:clean)
  end

  describe "#normalize_content_and_locals" do
    it "looks for a template if the full path is given" do
      file = File.join(fixture_dir, "template.html.erb")
      expect(subject.send(:normalize_content_and_locals, file).first).to eq File.read(file)
    end

    it "looks for a template in the root directory first" do
      expect(subject.send(:normalize_content_and_locals, "template").first).to eq File.read(File.join(fixture_dir, "template.html.erb"))
    end

    it "looks for a template in a subdirectory of root" do
      expect(subject.send(:normalize_content_and_locals, "partials/template").first).to eq File.read(File.join(partials_dir, "template.html.erb"))
    end

    it "looks for a template in the partials directory if none exists in the root directory" do
      expect(subject.send(:normalize_content_and_locals, "partial").first).to eq File.read(File.join(partials_dir, "partial.html.erb"))
    end

    it "looks for a template in the partials directory if the partial key is used" do
      expect(subject.send(:normalize_content_and_locals, partial: "template").first).to eq File.read(File.join(partials_dir, "template.html.erb"))
    end

    it "renders a template with a leading underscore" do
      expect(subject.send(:normalize_content_and_locals, "leading_underscore").first).to eq File.read(File.join(partials_dir, "_leading_underscore.html.erb"))
    end

    it "renders a template in a subdirectory of partial" do
      expect(subject.send(:normalize_content_and_locals, partial: "more/subdirectory").first).to eq File.read(File.join(partials_dir, "more/_subdirectory.html.erb"))
      expect(subject.send(:normalize_content_and_locals, "more/subdirectory").first).to eq File.read(File.join(partials_dir, "more/_subdirectory.html.erb"))
    end

    it "returns inline content" do
      inline_content = "<p><%= foo %></p>"
      expect(subject.send(:normalize_content_and_locals, inline: inline_content).first).to eq inline_content
    end

    it "returns nil when no matching templates are found" do
      expect(subject.send(:normalize_content_and_locals, "subdirectory")).to eq nil
    end

    it "caches the content of template files" do
      template = "template"
      expect(File).to receive(:read).once.and_call_original
      subject.send(:normalize_content_and_locals, template)
      subject.send(:normalize_content_and_locals, template)
    end

    it "provides an empty hash as locals when none are provided" do
      expect(subject.send(:normalize_content_and_locals, "template").last).to eq Hash.new
      expect(subject.send(:normalize_content_and_locals, partial: "template").last).to eq Hash.new
    end

    it "provides the second argument as locals" do
      locals = { foo: "bar" }
      expect(subject.send(:normalize_content_and_locals, "template", locals).last).to eq locals
    end

    it "provides the locals key of the first argument as locals" do
      locals = { foo: "bar" }
      expect(subject.send(:normalize_content_and_locals, partial: "template", locals: locals).last).to eq locals
    end
  end
end
