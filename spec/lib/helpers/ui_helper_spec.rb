require "spec_helper"

describe Docks::Helpers::UI do
  let(:includer) do
    Class.new { include Docks::Helpers::UI }.new
  end

  describe "#unique_iframe_id" do
    it "generates a unique id each time" do
      ids = (1..100).map { includer.unique_iframe_id }
      expect(ids).to eq ids.uniq
    end
  end

  describe "#docks_icons" do
    it "returns the contents of the icon file" do
      expect(File).to receive(:read).with(Docks::Assets.path_for("images/icons.svg")).and_return("foo")
      expect(includer.docks_icons).to eq "foo"
    end
  end

  describe "#docks_icon" do
    it "creates an SVG icon with the passed name" do
      expect(includer.docks_icon("foo")).to have_tag :svg, with: { class: "icon" }
      expect(includer.docks_icon("foo")).to include "<use xlink:href='#icon--foo'></use>"
    end

    it "creates an SVG icon with the passed size" do
      expect(includer.docks_icon("foo", size: 20)).to have_tag :svg, with: { class: ["icon--20"] }
    end

    it "creates and SVG icon with the passed color" do
      expect(includer.docks_icon("foo", color: :blue)).to have_tag :svg, with: { class: ["icon--blue"] }
      expect(includer.docks_icon("foo", color: :blue_darker)).to have_tag :svg, with: { class: ["icon--blue-darker"] }
    end
  end

  describe "#docks_demo" do
    it "renders the demo template/ layout" do
      expect(includer).to receive(:render).with(Docks::Templates.demo.path, hash_including(layout: Docks::Templates.demo.layout)).and_return "foo"
      expect(includer.docks_demo("<div></div>")).to eq "foo"
    end

    it "passes the passed demo along as the demo local" do
      demo = "foo bar"
      expect(includer).to receive(:render).with(anything, hash_including(locals: hash_including(demo: demo)))
      includer.docks_demo(demo)
    end

    it "passes other locals along to the render call" do
      locals = { foo: "bar", baz: "qux" }
      expect(includer).to receive(:render).with(anything, hash_including(locals: hash_including(locals)))
      includer.docks_demo("foo bar", locals)
    end

    it "defaults the id local to a unique iframe ID" do
      expect(includer).to receive(:unique_iframe_id).and_return 1
      expect(includer).to receive(:render).with(anything, hash_including(locals: hash_including(id: 1)))
      includer.docks_demo("foo bar")
    end
  end
end
