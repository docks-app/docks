require "spec_helper"

describe Docks::Languages::Slim do
  subject { Docks::Languages::Slim.instance }

  describe ".extensions" do
    let(:extensions) { [subject.class.extensions].flatten }

    it "includes .slim as an extension" do
      expect(extensions).to include "slim"
    end
  end

  describe "#helper_markup_for" do
    let(:mixed_arguments) { ["hello", 10, false, :goodbye, { bar: "baz", "baz" => :qux }] }
    let(:mixed_arguments_output) { "\"hello\", 10, false, :goodbye, bar: \"baz\",\n#{" " * 37}\"baz\" => :qux" }
    let(:argumentless_hash) { { "baz" => :qux } }
    let(:argumentless_hash_output) { "\"baz\" => :qux" }

    it "converts an array of arguments into the corresponding function" do
      expect(subject.helper_markup_for("foo", mixed_arguments)).to eq "== foo #{mixed_arguments_output}"
    end

    it "converts a hash with an arguments key into the corresponding function" do
      expect(subject.helper_markup_for("foo", arguments: mixed_arguments)).to eq "== foo #{mixed_arguments_output}"
    end

    it "converts a hash without an array key into a function with the hash as the only param" do
      expect(subject.helper_markup_for("foo", argumentless_hash)).to eq "== foo #{argumentless_hash_output}"
    end
  end
end
