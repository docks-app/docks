require "spec_helper"

describe Docks::Tags::Link do
  subject { Docks::Tags::Link.instance }

  let(:simple_content) { ["http://apple.com"] }
  let(:caption) { "chrismsauve@gmail.com" }
  let(:complex_content) { ["#{simple_content.first} (#{caption})"] }

  it "correctly creates a :url when there are no other details" do
    expect(subject.process(simple_content).first[:url]).to eq simple_content.first
  end

  it "correctly creates a :url when there are other details" do
    expect(subject.process(complex_content).first[:url]).to eq simple_content.first
  end

  it "does not create a :caption when no parentheses are provided" do
    expect(subject.process(simple_content).first[:caption]).to be nil
  end

  it "correctly creates a :caption when one is provided without a key" do
    expect(subject.process(complex_content).first[:caption]).to eq caption
  end

  it "correctly creates a :caption when the key is provided" do
    complex_content.first.sub!("(", "(caption: ")
    expect(subject.process(complex_content).first[:caption]).to eq caption
  end
end
