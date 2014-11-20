require 'spec_helper'

tag = :markup
Docks::Tags.register_bundled_tags
processor = Docks::Process

array = [
  "<div class='thing__outer'>",
  "  <div class='thing__inner></div>",
  "</div>"
]

describe tag do
  it 'correctly adds line breaks between markup' do
    expect(processor.process_tag(tag, array)).to eq array.join("\n")
  end

  it 'correctly strips trailing and leading line breaks' do
    target = array.join("\n")
    array = array.unshift("\n").push("\n")
    expect(processor.process_tag(tag, array)).to eq array.join("\n")
  end
end
