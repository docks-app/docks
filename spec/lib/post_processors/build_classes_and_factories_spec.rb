require "spec_helper"

describe Docks::PostProcessors::BuildClassesAndFactories do
  subject { Docks::PostProcessors::BuildClassesAndFactories }

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

  let(:factory_result) do
    {
      name: "Qux",
      factory: true
    }
  end

  let(:method) do
    {
      name: "bar",
      method: true
    }
  end

  let(:property) do
    {
      name: "qux",
      property: true
    }
  end

  describe ".post_process" do
    it "adds a methods array to a class, even when no methods are added" do
      subject.post_process([class_result])
      expect(class_result[:methods]).to eq []
    end

    it "adds a properties array to a class, even when no methods are added" do
      subject.post_process([class_result])
      expect(class_result[:properties]).to eq []
    end

    it "adds methods following the class to the class's methods array" do
      result = subject.post_process([class_result, method])
      expect(result.length).to be 1
      expect(result).to include class_result
      expect(class_result[:methods].length).to be 1
      expect(class_result[:methods]).to include method
    end

    it "adds properties following the class to its array of properties" do
      result = subject.post_process([class_result, property])
      expect(result.length).to be 1
      expect(result).to include class_result
      expect(class_result[:properties].length).to be 1
      expect(class_result[:properties]).to include property
    end

    it "adds a methods array to a factory, even when no methods are added" do
      subject.post_process([factory_result])
      expect(factory_result[:methods]).to eq []
    end

    it "adds a properties array to a factory, even when no methods are added" do
      subject.post_process([factory_result])
      expect(factory_result[:properties]).to eq []
    end

    it "adds methods following the factory to the factory's methods array" do
      result = subject.post_process([factory_result, method])
      expect(result.length).to be 1
      expect(result).to include factory_result
      expect(factory_result[:methods].length).to be 1
      expect(factory_result[:methods]).to include method
    end

    it "adds properties following the factory to its array of properties" do
      result = subject.post_process([factory_result, property])
      expect(result.length).to be 1
      expect(result).to include factory_result
      expect(factory_result[:properties].length).to be 1
      expect(factory_result[:properties]).to include property
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

    it "only adds properties to the most recently parsed class" do
      result = subject.post_process([class_result, second_class_result, property])
      expect(result.length).to be 2
      expect(result).to include class_result
      expect(result).to include second_class_result
      expect(class_result[:properties]).to be_empty
      expect(second_class_result[:properties].length).to be 1
      expect(second_class_result[:properties]).to include property
    end

    it "only adds properties and methods to the most recent class or factory result" do
      result = subject.post_process([class_result, factory_result, property, method])
      expect(result.length).to be 2
      expect(result).to include class_result
      expect(result).to include factory_result

      expect(class_result[:properties]).to be_empty
      expect(factory_result[:properties].length).to be 1
      expect(factory_result[:properties]).to include property

      expect(class_result[:methods]).to be_empty
      expect(factory_result[:methods].length).to be 1
      expect(factory_result[:methods]).to include method
    end
  end
end
