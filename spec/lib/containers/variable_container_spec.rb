require "spec_helper"

describe Docks::Containers::Variable do
  subject { Docks::Containers::Variable }

  describe "#private" do
    it "identifies a private variable based on its access type" do
      variable_one = subject.new(access: Docks::Types::Access::PRIVATE)
      variable_two = subject.new(access: Docks::Types::Access::PUBLIC)
      variable_three = subject.new(Hash.new)
      expect(variable_one.private).to be true
      expect(variable_two.private).to be false
      expect(variable_three.private).to be false
    end
  end

  describe "#public" do
    it "identifies a public variable based on its access type" do
      variable_one = subject.new(access: Docks::Types::Access::PRIVATE)
      variable_two = subject.new(access: Docks::Types::Access::PUBLIC)
      variable_three = subject.new(Hash.new)
      expect(variable_one.public).to be false
      expect(variable_two.public).to be true
      expect(variable_three.public).to be true
    end
  end
end
