require "spec_helper"

describe Docks::Containers::Function do
  subject { Docks::Containers::Function }

  describe "#private" do
    it "identifies a private function based on its access type" do
      function_one = subject.new(access: Docks::Types::Access::PRIVATE)
      function_two = subject.new(access: Docks::Types::Access::PUBLIC)
      function_three = subject.new(Hash.new)
      expect(function_one.private).to be true
      expect(function_two.private).to be false
      expect(function_three.private).to be false
    end
  end

  describe "#public" do
    it "identifies a public function based on its access type" do
      function_one = subject.new(access: Docks::Types::Access::PRIVATE)
      function_two = subject.new(access: Docks::Types::Access::PUBLIC)
      function_three = subject.new(Hash.new)
      expect(function_one.public).to be false
      expect(function_two.public).to be true
      expect(function_three.public).to be true
    end
  end
end
