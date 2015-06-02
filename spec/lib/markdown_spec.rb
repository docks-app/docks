require "spec_helper"

describe Docks::Markdown::Renderer do
  subject { Redcarpet::Markdown.new(described_class, fenced_code_blocks: true) }

  describe "#block_code" do
    let(:code) { "<div>\n  <p>Hi!</p>\n</div>" }
    let(:language) { "html" }
    let(:code_block) { "```#{language}\n#{code}\n```" }

    it "wraps the content of the code block in a fake element for view-side processing" do
      result = subject.render(code_block)
      expect(result).to have_tag "fenced_code_block", content: code
      expect(result).to_not have_tag "pre"
      expect(result).to_not have_tag "code"
    end

    it "adds a data property with the language" do
      result = subject.render(code_block)
      expect(result).to have_tag "fenced_code_block", with: { "data-language" => language }
    end

    it "adds a data property to include a demo if the language has _demo in it, and strips this from the language" do
      code_block.sub!(language, "#{language}_demo")
      result = subject.render(code_block)
      expect(result).to have_tag "fenced_code_block", with: { "data-language" => language, "data-has-demo" => "true" }
    end
  end

  describe "#link" do
    let(:name) { "button" }

    it "doesn't mess up standard links" do
      description = "[`Apple`](http://apple.com)"
      expect(subject.render(description)).to eq Redcarpet::Markdown.new(Redcarpet::Render::HTML).render(description)
    end

    it "preserves @link declarations" do
      result = subject.render("[#{name}](@link #{name})")
      expect(result).to have_tag "a", with: { href: "@link #{name}" }
    end

    it "uses the text from the link for a bare @link declaration" do
      result = subject.render("[#{name}](@link)")
      expect(result).to have_tag "a", with: { href: "@link #{name}" }
    end

    it "removes excess tags from the content for bare @link declarations" do
      result = subject.render("[`#{name}`](@link)")
      expect(result).to have_tag "a", with: { href: "@link #{name}" }
    end

    it "adds a span around content without any wrapping HTML tags" do
      result = subject.render("[#{name}](@link)")
      expect(result).to have_tag "span", text: name
    end

    it "doesn't add a span when it doesn't need to" do
      result = subject.render("[`#{name}`](@link)")
      expect(result).to_not have_tag "span"
    end
  end
end
