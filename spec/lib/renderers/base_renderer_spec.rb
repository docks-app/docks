require "spec_helper"

describe Docks::Renderers::Base do
  let(:fixture_dir) { File.expand_path("../../../fixtures/renderers", __FILE__) }
  let(:template_dir) { File.join(fixture_dir, Docks.config.asset_folders.templates) }
  let(:partials_dir) { File.join(template_dir, "partials") }
  let(:layouts_dir) { File.join(template_dir, "layouts") }

  subject { Docks::Renderers::Base.new }

  around do |example|
    Docks.configure do |config|
      config.root = fixture_dir
      config.library_assets = ""
    end

    example.run

    subject.send(:clean)
  end

  describe "#normalize_content_and_locals" do
    it "looks for a template if the full path is given" do
      file = File.join(template_dir, "template.html.erb")
      expect(subject.send(:normalize_content_and_locals, file).first).to eq File.read(file)
    end

    it "looks for a template in the root directory first" do
      expect(subject.send(:normalize_content_and_locals, "template").first).to eq File.read(File.join(template_dir, "template.html.erb"))
    end

    it "looks for a template in a subdirectory of root" do
      expect(subject.send(:normalize_content_and_locals, "partials/template").first).to eq File.read(File.join(partials_dir, "template.html.erb"))
    end

    it "looks for a template in the root directory if the template key is used" do
      expect(subject.send(:normalize_content_and_locals, template: "template").first).to eq File.read(File.join(template_dir, "template.html.erb"))
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

    it "finds a layout file in a layout directory" do
      expect(subject.send(:normalize_content_and_locals, template: "template", layout: "application")[1]).to eq File.read(File.join(layouts_dir, "application.html.erb"))
    end

    it "finds a layout file in a subdirectory of the layout directory" do
      expect(subject.send(:normalize_content_and_locals, template: "template", layout: "more/subdirectory")[1]).to eq File.read(File.join(layouts_dir, "more/subdirectory.html.erb"))
    end

    it "returns inline content" do
      inline_content = "<p><%= foo %></p>"
      expect(subject.send(:normalize_content_and_locals, inline: inline_content).first).to eq inline_content
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

    it "throws an error when no matching template is found" do
      expect { subject.send(:normalize_content_and_locals, "foo") }.to raise_error(Docks::NoTemplateError)
    end

    it "throws an error when no matching layout is found" do
      expect { subject.send(:normalize_content_and_locals, template: "template", layout: "foo") }.to raise_error(Docks::NoTemplateError)
    end

    it "uses no layout when the layout argument is false" do
      expect(subject.send(:normalize_content_and_locals, template: "template", layout: false)[1]).to be nil
    end
  end

  describe "#ivars=" do
    it "creates an instance variable for each of the passed hash keys" do
      ivars = { foo: "bar", baz: "qux" }
      subject.ivars = ivars

      ivars.each do |ivar, value|
        expect(subject.instance_variable_get("@#{ivar}".to_sym)).to eq value
      end
    end
  end
end
