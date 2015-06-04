require "spec_helper"

describe Docks::OpenStruct do
  let(:backing) do
    { foo: "bar" }
  end

  subject { described_class.new(backing) }

  describe "as_json" do
    it "directly returns its table as JSON" do
      expect(subject.to_json).to eq backing.to_json
    end
  end
end
