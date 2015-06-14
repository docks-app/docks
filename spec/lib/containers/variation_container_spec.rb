require "spec_helper"

describe Docks::Containers::Variation do
  subject { Docks::Containers::Variation.new }

  it "sets appropriate details" do
    expect(subject.active).to be false
    expect(subject.activate_with).to eq []
    expect(subject.precludes).to eq []
    expect(subject.set_by).to eq []
    expect(subject.include_with).to eq []
    expect(subject.demo_type).to eq Docks::Types::Demo::SELECT
  end

  describe "#has_demo?" do
    it "has a demo only when the demo_type is set to Types::Demo::OWN or Types::Demo::JOINT" do
      expect(subject.has_demo?).to be false

      subject.demo_type = Docks::Types::Demo::JOINT
      expect(subject.has_demo?).to be true

      subject.demo_type = Docks::Types::Demo::SELECT
      expect(subject.has_demo?).to be false

      subject.demo_type = Docks::Types::Demo::OWN
      expect(subject.has_demo?).to be true

      subject.demo_type = Docks::Types::Demo::NONE
      expect(subject.has_demo?).to be false

      subject.demo_type = Docks::Types::Demo::HIDDEN
      expect(subject.has_demo?).to be false
    end
  end

  describe "#find" do
    before(:each) do
      subject.for = "foo"
      subject.name = "foo--bar"
    end

    it "finds a variation when the name matches the symbol" do
      expect(subject.find(subject.name)).to be subject
      expect(subject.find("foo--baz")).to be false
    end

    it "finds a variation when any member information matches the variation name and the symbol matches the base class" do
      expect(subject.find("#{subject.for}~#{subject.name}")).to be subject
      expect(subject.find("baz~#{subject.name}")).to be false
    end
  end
end
