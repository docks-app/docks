require "spec_helper"

describe Docks::Parsers::Less do
  subject { Docks::Parsers::Less.instance }

  describe "#parse_result_details" do
    it "identifies a mixin" do
      target_name = "full-size"
      name, type = subject.parse_result_details("  .#{target_name}($height, $width) {")
      expect(type).to eq Docks::Types::Symbol::MIXIN
      expect(name).to eq target_name
    end

    it "identifies a variable" do
      target_name = "message-width"
      name, type = subject.parse_result_details(" @#{target_name}: 40rem;")
      expect(type).to eq Docks::Types::Symbol::VARIABLE
      expect(name).to eq target_name
    end

    describe "states" do
      it "identifies a state as a class starting with `is-`" do
        target_name = "is-active"
        name, type = subject.parse_result_details("#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `&.is-`" do
        target_name = "is-active"
        name, type = subject.parse_result_details("&.#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class containing `--is-`" do
        target_name = "tab-list__tab--is-active"
        name, type = subject.parse_result_details(".#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `&--is-`" do
        target_name = "--is-active"
        name, type = subject.parse_result_details("&#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `js-`" do
        target_name = "js-active"
        name, type = subject.parse_result_details(".#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `&.js-`" do
        target_name = "js-active"
        name, type = subject.parse_result_details("&.#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class containing `--js-`" do
        target_name = "tab-list__tab--js-active"
        name, type = subject.parse_result_details(".#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end

      it "identifies a state as a class starting with `&--js-`" do
        target_name = "--js-active"
        name, type = subject.parse_result_details("&#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::STATE
        expect(name).to eq target_name
      end
    end

    describe "variants" do
      it "identifies a variant as a class containing `--`" do
        target_name = "tab-list__tab--large"
        name, type = subject.parse_result_details(".#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::VARIANT
        expect(name).to eq target_name
      end

      it "identifies a variant as a class starting with `&--`" do
        target_name = "--large"
        name, type = subject.parse_result_details("&#{target_name} {")
        expect(type).to eq Docks::Types::Symbol::VARIANT
        expect(name).to eq target_name
      end
    end

    describe "component" do
      it "identifies a component as any class not matching state/ variant" do
        target_name = "tab-list__tab"
        name, type = subject.parse_result_details(".#{target_name} { flex: 1 1 0; }")
        expect(type).to eq Docks::Types::Symbol::COMPONENT
        expect(name).to eq target_name
      end

      it "identifies a component as a class starting with `&__`" do
        target_name = "__tab"
        name, type = subject.parse_result_details("&#{target_name} { flex: 1 1 0; }")
        expect(type).to eq Docks::Types::Symbol::COMPONENT
        expect(name).to eq target_name
      end
    end
  end
end
