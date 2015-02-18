require "spec_helper"

describe Docks::Languages::JSON do
  subject { Docks::Languages::JSON.instance }

  describe ".extensions" do
    let(:extensions) { [subject.class.extensions].flatten }

    it "includes .erb as an extension" do
      expect(extensions).to include "json"
    end
  end

  describe "#load_stub" do
    let(:stub_file) { File.expand_path("../../../fixtures/languages/stub.json", __FILE__) }
    let(:expected_stub) do
      { "foo" => "bar" }
    end

    it "loads a stub file" do
      expect(subject.load_stub(stub_file)).to eq expected_stub
    end
  end
end
