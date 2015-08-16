require "spec_helper"

describe Docks::Templates do
  subject { Docks::Templates }

  after :each do
    subject.send(:clean)
  end

  describe ".register" do
    let(:templates) do
      { "foo" => "bar", "bar" => "baz" }
    end

    it "calls the private hash registering method when the first argument is a hash" do
      expect(subject).to receive(:register_from_hash).with(templates)
      subject.register(templates)
    end

    it "registers each template for a pattern matching the passed key" do
      templates.each do |match, template|
        expect(subject).to receive(:register).with(template, for: Regexp.new(match.to_s))
      end
      subject.send(:register_from_hash, templates)
    end

    it "registers a template with the fallback or default key as the fallback template" do
      templates["default"] = "default"
      expect(subject).to receive(:fallback=).with(templates["default"])
      expect(subject).not_to receive(:register).with(templates["default"], for: Regexp.new("default"))
      subject.send(:register_from_hash, templates)

      templates["fallback"] = "default"
      expect(subject).to receive(:fallback=).with(templates["fallback"])
      subject.send(:register_from_hash, templates)
    end

    it "registers a template with the :demo key as the demo template" do
      templates["demo"] = "my-custom-demo"
      expect(subject).to receive(:demo=).with(templates["demo"])
      expect(subject).not_to receive(:register).with(templates["demo"], for: Regexp.new("demo"))
      subject.send(:register_from_hash, templates)
    end
  end

  describe ".template_for" do
    context "when no template matches" do
      it "provides the default template when no other template matches" do
        expect(subject.template_for("foo")).to be subject.fallback
      end

      it "allows setting a custom default template" do
        template = "custom_default"

        subject.fallback = template
        expect(subject.template_for("foo").path).to eq template
      end
    end

    it "returns a template whose :matches matches the passed ID" do
      template = "custom_template"
      subject.register(template, matches: /foo/)
      expect(subject.template_for("foo").path).to eq template
    end

    it "returns a template whose :for matches the passed ID" do
      template = "custom_template"
      subject.register(template, for: /bar/)
      expect(subject.template_for("bar").path).to eq template
    end

    it "returns a template matching the name of a passed pattern" do
      template = "custom_template"
      subject.register(template, for: /bar/)
      expect(subject.template_for(Docks::Containers::Pattern.new(name: "bar")).path).to eq template
    end

    it "returns the last template matching the passed ID" do
      subject.register("template_1", for: /bar/)
      subject.register("template_2", for: /bar/)
      expect(subject.template_for("bar").path).to eq "template_2"
    end

    it "throws an error when no template matches the path" do
      expect { subject.search_for_template("fuzz") }.to raise_error Docks::NoTemplateError
    end

    it "throws an error with customized messaging for partials, layouts, and normal templates" do
      expect { subject.search_for_template("fuzz") }.to raise_error %r{No template matching}
      expect { subject.search_for_template("fuzz", must_be: :layout) }.to raise_error %r{No layout matching}
      expect { subject.search_for_template("fuzz", must_be: :partial) }.to raise_error %r{No partial matching}
    end
  end

  describe ".default_layout=" do
    it "has the correct default layout" do
      expect(subject.fallback.layout).to eq "pattern"
    end

    it "uses the passed default layout" do
      layout = "my_layout"
      subject.default_layout = layout
      subject.register("no_layout", matches: /no_layout/)
      subject.register("with_layout", matches: /with_layout/, layout: "custom_layout")

      expect(subject.fallback.layout).to eq layout
      expect(subject.template_for("no_layout").layout).to eq layout
      expect(subject.template_for("with_layout").layout).not_to eq layout
    end
  end

  describe ".demo=" do
    it "saves the passed template as the demo template" do
      demo = "custom_demo"
      subject.demo = demo
      expect(subject.demo.path).to eq demo
    end

    it "uses the default demo layout when none is passed" do
      demo = "custom_demo"
      subject.demo = demo
      expect(subject.demo.layout).to eq "demo"
    end

    it "uses the passed demo layout" do
      demo_layout = "custom_demo_layout"
      subject.demo = Docks::Templates::Template.new("custom_demo", layout: demo_layout)
      expect(subject.demo.layout).to eq demo_layout
    end
  end

  describe ".search_for_template" do
    it "does nothing when a non-string argument is passed" do
      expect(subject.search_for_template(false)).to be nil
    end
  end

  describe ".last_template_update" do
    before(:each) do
      Docks.configure_with(root: File.expand_path("../../fixtures/renderers", __FILE__), templates: "templates")
    end

    it "returns the date of the most recently modified template" do
      templates = Dir[Docks.config.templates + "**/*.*"]
      FileUtils.touch(templates.first)
      expect(subject.last_template_update).to eq File.mtime(templates.first)
    end
  end
end

describe Docks::Templates::Template do
  subject { Docks::Templates::Template }

  describe "#path" do
    it "uses the passed template as the path" do
      path = "path/to/template"
      expect(subject.new(path).path).to eq path
    end
  end

  describe "#layout" do
    it "uses the layout from the constructor as the layout" do
      layout = "my_layout"
      expect(subject.new("path", layout: layout).layout).to eq layout
    end

    it "uses the default layout when none is provided in the constructor" do
      expect(subject.new("path").layout).to eq Docks::Templates.default_layout
    end
  end

  describe "#matches?" do
    it "uses the :matches key from the passed option" do
      template = subject.new("path", matches: /foo/)
      expect(template.matches?("foo")).to be true
      expect(template.matches?("bar")).to be false
    end

    it "uses the :for key from the passed option" do
      template = subject.new("path", for: /foo/)
      expect(template.matches?("foo")).to be true
      expect(template.matches?("bar")).to be false
    end
  end
end
