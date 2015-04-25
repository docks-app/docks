require "spec_helper"

describe Docks::PostProcessors::CleanUpAccess do
  subject { Docks::PostProcessors::CleanUpAccess }

  let(:function) do
    { name: "foo" }
  end

  describe ".post_process" do
    it "marks a symbol with no privacy attribute to be public" do
      subject.post_process([function])
      expect(function[:access]).to eq Docks::Types::Access::PUBLIC
    end

    it "marks a symbol that is explicitly public to an access of public" do
      function[:public] = true
      subject.post_process([function])
      expect(function[:access]).to eq Docks::Types::Access::PUBLIC
      expect(function[:public]).to be nil
    end

    it "marks a symbol that is explicitly private to an access of private" do
      function[:private] = true
      subject.post_process([function])
      expect(function[:access]).to eq Docks::Types::Access::PRIVATE
      expect(function[:private]).to be nil
    end
  end
end
