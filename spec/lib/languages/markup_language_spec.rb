require "spec_helper"

class MarkupLanguageTester
  include Docks::Languages::MarkupLanguage
end

describe Docks::Languages::MarkupLanguage do
  subject { MarkupLanguageTester.new }

  let(:mixed_arguments) { ["hello", 10, false, :goodbye, { bar: "baz", "baz" => :qux }] }
  let(:mixed_arguments_output) { "\"hello\", 10, false, :goodbye, bar: \"baz\",\n#{" " * 34}\"baz\" => :qux" }
  let(:argumentless_hash) { { "baz" => :qux } }
  let(:argumentless_hash_output) { "\"baz\" => :qux" }

  describe "#functionize_helper" do
    it "converts an array of arguments into the corresponding function" do
      expect(subject.send(:functionize_helper, "foo", mixed_arguments)).to eq "foo #{mixed_arguments_output}"
    end

    it "converts a hash with an arguments key into the corresponding function" do
      expect(subject.send(:functionize_helper, "foo", arguments: mixed_arguments)).to eq "foo #{mixed_arguments_output}"
    end

    it "converts a hash without an array key into a function with the hash as the only param" do
      expect(subject.send(:functionize_helper, "foo", argumentless_hash)).to eq "foo #{argumentless_hash_output}"
    end

    it "does not strip symbols from contained hashes when a hash is the last argument" do
      argumentless_hash["baz"] = argumentless_hash[:qux] = argumentless_hash.clone
      expected_output = "\"baz\" => { #{argumentless_hash_output} },\n    qux: { #{argumentless_hash_output} }"
      expect(subject.send(:functionize_helper, "foo", argumentless_hash)).to eq "foo #{expected_output}"
    end
  end

  describe "#normalize_arguments" do
    it "assumes a passed array is the array of arguments" do
      array = ["foo"]
      expect(subject.send(:normalize_arguments, array)).to eq array
    end

    it "assumes the passed object is the only argument if it has no arguments key" do
      hash = { foo: "bar" }
      expect(subject.send(:normalize_arguments, hash)).to eq [hash]
    end

    it "sets the arguments to the contents of the arguments attribute" do
      hash_one = { arguments: ["foo"] }
      hash_two = { "arguments" => ["bar"] }

      expect(subject.send(:normalize_arguments, hash_one)).to eq ["foo"]
      expect(subject.send(:normalize_arguments, hash_two)).to eq ["bar"]
    end

    it "sets the arguments to the contents of the arguments attribute in an array" do
      hash_one = { foo: "bar" }
      hash_two = { arguments: hash_one }

      expect(subject.send(:normalize_arguments, hash_two)).to eq [hash_one]
    end
  end

  describe "#stringfy_val" do
    it "stringifies strings" do
      expect(subject.send(:stringify_val, "foo")).to eq "\"foo\""
    end

    it "stringies numbers" do
      expect(subject.send(:stringify_val, 10)).to eq "10"
      expect(subject.send(:stringify_val, 0)).to eq "0"
      expect(subject.send(:stringify_val, -10)).to eq "-10"
      expect(subject.send(:stringify_val, 10_000)).to eq "10_000"
    end

    it "stringies booleans" do
      expect(subject.send(:stringify_val, false)).to eq "false"
      expect(subject.send(:stringify_val, true)).to eq "true"
    end

    it "stringifes symbols" do
      expect(subject.send(:stringify_val, :foo)).to eq ":foo"
      expect(subject.send(:stringify_val, :"foo bar baz")).to eq ":\"foo bar baz\""
    end

    it "stringifies arrays" do
      expect(subject.send(:stringify_val, mixed_arguments)).to eq "[#{mixed_arguments.map { |arg| subject.send(:stringify_val, arg) }.join(", ")}]"
    end

    it "stringifies hashes" do
      expect(subject.send(:stringify_val, foo: :bar, baz: :qux)).to eq "{ foo: :bar, baz: :qux }"
      expect(subject.send(:stringify_val, "foo" => "bar")).to eq "{ \"foo\" => \"bar\" }"
      expect(subject.send(:stringify_val, "foo" => "bar", baz: :qux)).to eq "{ \"foo\" => \"bar\", baz: :qux }"
    end
  end
end

