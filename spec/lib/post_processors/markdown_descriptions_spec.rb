# TODO
require "spec_helper"

describe Docks::PostProcessors::MarkdownDescriptions do
  let(:name) { "button" }

  it "doesn't mess up standard links" do
    description = "[`Apple`](http://apple.com)"
    expect(described_class.post_process([{ description: description }]).first[:description]).to eq Redcarpet::Markdown.new(Redcarpet::Render::HTML).render(description)
  end

  it "preserves @link declarations" do
    result = described_class.post_process([{ description: "[#{name}](@link #{name})"}]).first
    expect(result[:description]).to have_tag "a", with: { href: "@link #{name}" }
  end

  it "uses the text from the link for a bare @link declaration" do
    result = described_class.post_process([{ description: "[#{name}](@link)"}]).first
    expect(result[:description]).to have_tag "a", with: { href: "@link #{name}" }
  end

  it "removes excess tags from the content for bare @link declarations" do
    result = described_class.post_process([{ description: "[`#{name}`](@link)"}]).first
    expect(result[:description]).to have_tag "a", with: { href: "@link #{name}" }
  end

  it "adds a span around content without any wrapping HTML tags" do
    result = described_class.post_process([{ description: "[#{name}](@link)"}]).first
    expect(result[:description]).to have_tag "span", text: name
  end

  it "doesn't add a span when it doesn't need to" do
    result = described_class.post_process([{ description: "[`#{name}`](@link)"}]).first
    expect(result[:description]).to_not have_tag "span"
  end
end
