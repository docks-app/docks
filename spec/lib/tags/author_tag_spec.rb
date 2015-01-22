require "spec_helper"

describe Docks::Tags::Author do
  subject { Docks::Tags::Author.instance }

  let(:simple_content) { ["Chris Sauve"] }
  let(:email) { "chrismsauve@gmail.com" }
  let(:github) { "lemonmade" }
  let(:complex_content) { ["#{simple_content.first} (#{email}, github: #{github})"] }

  it "correctly creates a :name when there are no other details" do
    result = subject.process(simple_content).first
    expect(result[:name]).to eq simple_content.first
  end

  it "correctly creates a :name when there are other details" do
    result = subject.process(complex_content).first
    expect(result[:name]).to eq simple_content.first
  end

  it "does not create an :email when no parentheses are provided" do
    result = subject.process(simple_content).first
    expect(result[:email]).to be nil
  end

  it "correctly creates details when one is provided without a key" do
    result = subject.process(complex_content).first
    expect(result[:email]).to eq email
    expect(result[:github]).to eq github
  end

  it "correctly creates details when keys are provided for all values" do
    complex_content.first.sub!("(", "(email: ")
    result = subject.process(complex_content).first
    expect(result[:email]).to eq email
    expect(result[:github]).to eq github
  end
end
