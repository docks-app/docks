require "spec_helper"

describe Docks::Templates do
  subject { Docks::Templates }

  after :each do
    subject.send(:clean)
  end

  describe ".template_for" do
    context "when no template matches" do
      it "provides the default template when no other template matches" do
        expect(subject.template_for("foo")).to be subject.fallback_template
      end

      it "allows setting a custom default template" do
        template = "custom_default"

        subject.default_template = template
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

    it "returns the demo template when the ID is :demo" do
      expect(subject.template_for(:demo_template)).to eq subject.demo_template
    end
  end

  describe ".default_layout=" do
    it "has the correct default layout" do
      expect(subject.default_template.layout).to eq "application"
    end

    it "uses the passed default layout" do
      layout = "my_layout"
      subject.default_layout = layout
      subject.register("no_layout", matches: /no_layout/)
      subject.register("with_layout", matches: /with_layout/, layout: "custom_layout")

      expect(subject.default_template.layout).to eq layout
      expect(subject.template_for("no_layout").layout).to eq layout
      expect(subject.template_for("with_layout").layout).not_to eq layout
    end
  end

  describe ".demo_template=" do
    it "saves the passed template as the demo template" do
      demo_template = "custom_demo"
      subject.demo_template = demo_template
      expect(subject.demo_template.path).to eq demo_template
    end
  end

  describe ".set_demo_template" do
    it "saves the passed template as the demo template" do
      demo_template = "custom_demo"
      subject.set_demo_template(demo_template)
      expect(subject.demo_template.path).to eq demo_template
    end

    it "uses the default demo layout when none is passed" do
      demo_template = "custom_demo"
      subject.set_demo_template(demo_template)
      expect(subject.demo_template.layout).to eq "demo"
    end

    it "uses the passed demo layout" do
      demo_layout = "custom_demo_layout"
      subject.set_demo_template("custom_demo", layout: demo_layout)
      expect(subject.demo_template.layout).to eq demo_layout
    end
  end

  describe ".search_for_template" do
    it "does nothing when a non-string argument is passed" do
      expect(subject.search_for_template(false)).to be nil
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
