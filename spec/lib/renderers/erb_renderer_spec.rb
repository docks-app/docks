require "spec_helper"

describe Docks::Renderers::ERB do
  subject { Docks::Renderers::ERB.instance }

  describe "#render" do
    it "renders ERB" do
      erb_template = <<-HTML
        <ul>
          <% 5.times do |i| %>
            <li>Item <%= i + 1 %></li>
          <% end %>
        </ul>
      HTML

      expect(subject.render(inline: erb_template).gsub(/\s/, "")).to eq File.read(File.expand_path("../../../fixtures/renderers/html_output.html", __FILE__)).gsub(/\s/, "")
    end

    it "captures ERB" do
      subject.helper_files = [File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)]

      erb_template = <<-HTML
        <% helper4 do %>
          bar
        <% end %>
      HTML

      expect(subject.render(inline: erb_template).strip).to eq "foo bar!"
    end

    it "renders a template with the passed locals" do
      expect(subject.render(inline: "<%= foo %>", locals: { foo: "bar" }).strip).to eq "bar"
    end

    it "renders a template with access to the same helpers as the base template" do
      subject.helper_files = [File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)]

      expect(subject.render(inline: "<%= helper %>\n<%= helper3 %>").strip).to eq "foo bar baz\nBAR"
    end

    it "allows helpers to use classes in their scope" do
      subject.helper_files = [
        File.expand_path("../../../fixtures/renderers/helpers.rb", __FILE__)
      ]

      expect(subject.render(inline: "<%= helper5 %>").strip).to eq "thing one"
    end

    it "doesn't preserve locals between template renders" do
      erb_template = "<%= foo %>"

      subject.render(inline: erb_template, locals: { foo: "bar" })
      expect(subject.render(inline: erb_template, locals: { foo: "baz" }).strip).to eq "baz"
      expect(subject.render(inline: erb_template).strip).to eq ""
    end
  end
end
