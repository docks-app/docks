require "spec_helper"

describe Docks::Tags::Compatibility do
  subject { Docks::Tags::Compatibility.instance }

  let(:simple_content) { ["Chrome"] }
  let(:version) { "latest" }
  let(:complex_content) { ["#{simple_content.first} (#{version})"] }

  it "correctly creates a :name when there are no other details" do
    result = subject.process(simple_content).first
    expect(result[:browser]).to eq simple_content.first
  end

  it "correctly creates a :name when there are other details" do
    result = subject.process(complex_content).first
    expect(result[:browser]).to eq simple_content.first
  end

  it "does not create a :version when no parentheses are provided" do
    result = subject.process(simple_content).first
    expect(result[:version]).to be nil
  end

  it "correctly creates a :version when it is provided without a key" do
    result = subject.process(complex_content).first
    expect(result[:version]).to eq version
  end

  it "correctly creates a :version when provided with a key" do
    complex_content.first.sub!("(", "(version: ")
    result = subject.process(complex_content).first
    expect(result[:version]).to eq version
  end
end
