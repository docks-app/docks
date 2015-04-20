require "spec_helper"

describe Docks::PostProcessors::BuildClasses do
  subject { Docks::PostProcessors::BuildClasses }

  let(:class_result) do
    {
      name: "Foo",
      class: true
    }
  end

  let(:second_class_result) do
    {
      name: "Baz",
      class: true
    }
  end

  let(:method) do
    {
      name: "bar",
      method: true
    }
  end

  describe ".post_process" do
    it "adds a methods array to a class, even when no methods are added" do
      subject.post_process([class_result])
      expect(class_result[:methods]).to eq []
    end

    it "adds methods following the class to the class's methods array" do
      result = subject.post_process([class_result, method])
      expect(result.length).to be 1
      expect(result).to include class_result
      expect(class_result[:methods].length).to be 1
      expect(class_result[:methods]).to include method
    end

    it "only adds methods to the most recently parsed class" do
      result = subject.post_process([class_result, second_class_result, method])
      expect(result.length).to be 2
      expect(result).to include class_result
      expect(result).to include second_class_result
      expect(class_result[:methods]).to be_empty
      expect(second_class_result[:methods].length).to be 1
      expect(second_class_result[:methods]).to include method
    end
  end
end
