require "spec_helper"

describe Docks::Components do
  subject { Docks::Components }

  describe ".component_for" do
    it "returns the base component when no custom component class exists" do
      expect(subject.component_for(:foo)).to be Docks::Components::Base
    end

    it "returns the custom component class if one exists" do
      expect(subject.component_for(:code_block)).to be Docks::Components::CodeBlock
      expect(subject.component_for("code_block")).to be Docks::Components::CodeBlock
    end
  end

  describe ".template_path" do
    it "returns the path to the component's template" do
      path = subject.template_path(:code_block)
      expect(path).to eq File.join(subject::COMPONENT_TEMPLATES_PATH, "code_block/code_block.erb")
      expect(File.exists?(path)).to be true
    end

    it "returns the path to a nested template" do
      expect(subject.template_path("tablist:tab")).to eq File.join(subject::COMPONENT_TEMPLATES_PATH, "tablist/tablist_tab.erb")
    end
  end
end
