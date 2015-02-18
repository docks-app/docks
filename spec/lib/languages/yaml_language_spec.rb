require "spec_helper"

describe Docks::Languages::YAML do
  subject { Docks::Languages::YAML.instance }

  describe ".extensions" do
    let(:extensions) { [subject.class.extensions].flatten }

    it "includes .erb as an extension" do
      expect(extensions).to include "yml"
    end
  end

  describe "#load_stub" do
    let(:stub_file) { File.expand_path("../../../fixtures/languages/stub.yml", __FILE__) }
    let(:expected_stub) do
      { "foo" => "bar" }
    end

    it "loads a stub file" do
      expect(subject.load_stub(stub_file)).to eq expected_stub
    end
  end
end
