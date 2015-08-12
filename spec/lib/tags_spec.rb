require "spec_helper"

class Example1 < Docks::Tags::Base
  def initialize
    @name = :name
    @synonyms = [:nom, :nome]
    @multiple_allowed = true
  end
end

class Example2 < Docks::Tags::Base
  def initialize
    @name = :title
    @synonyms = [:titre]
  end
end

class Example3 < Docks::Tags::Base
  def initialize
    @name = :group
    @parseable = false
  end
end

describe Docks::Tags do
  subject { Docks::Tags }

  let(:example) { Example1.instance }

  before :each do
    subject.send(:clean)
  end

  describe ".tag_for" do
    before :each do
      subject.register(Example1)
    end

    it "returns an instance of the tag class in response to the base tag name" do
      expect(subject.tag_for(example.name)).to be_an Example1
    end

    it "returns an instance of the tag class in response to a synonym" do
      example.synonyms.each do |synonym|
        expect(subject.tag_for(synonym)).to be_an Example1
      end
    end

    it "returns nil in response to an unregistered tag name" do
      expect(subject.tag_for(:foo)).to be nil
    end
  end

  describe ".base_tag_name" do
    before :each do
      subject.register(Example1)
      subject.register(Example2)
    end

    it "returns the passed name if it is a base tag name" do
      expect(subject.base_tag_name(example.name)).to be example.name
    end

    it "returns the base tag name for a synonym" do
      expect(subject.base_tag_name(example.synonyms.first)).to be example.name
    end

    it "returns nil if the tag is not registered" do
      expect(subject.base_tag_name(:foo)).to be nil
    end

    it "returns the name if the tag class is passed" do
      expect(subject.base_tag_name(example)).to be example.name
    end

    it "returns the singularized name if the tag allows multiple" do
      expect(subject.base_tag_name(example)).to be example.name
    end

    it "returns nil for a pluralized name with multiples prevented" do
      expect(subject.base_tag_name(Example2.instance.name.to_s.pluralize)).to be nil
    end

    it "returns the singularized name of a pluralized synonym" do
      expect(subject.base_tag_name(example.synonyms.first.to_s.pluralize)).to be example.name
    end

    it "doesn't return anything for the pluralized name of a synonym for a tag that has no multiples" do
      expect(subject.base_tag_name(Example2.instance.synonyms.first.to_s.pluralize)).to be nil
    end
  end

  describe ".supported_tags" do
    it "lists all supported tags, including synonyms and plurals" do
      expect(subject.supported_tags).to eq []

      tags = [Example1, Example2, Example3]
      tags.each { |tag| subject.register(tag) }

      supported_tags = subject.supported_tags

      tags.each do |tag|
        tag = tag.instance
        expect(supported_tags).to include tag.name
        expect(supported_tags.include?(tag.name.to_s.pluralize.to_sym)).to be tag.multiple_allowed?

        tag.synonyms.each do |synonym|
          expect(supported_tags).to include synonym
          expect(supported_tags.include?(synonym.to_s.pluralize.to_sym)).to be tag.multiple_allowed?
        end
      end
    end
  end

  describe ".supported_parseable_tags" do
    it "lists only tags that are parseable" do
      expect(subject.supported_parseable_tags).to eq []

      [Example1, Example2, Example3].each { |tag| subject.register(tag) }

      supported_tags = subject.supported_parseable_tags

      [Example1, Example2].each do |tag|
        tag = tag.instance
        expect(supported_tags).to include tag.name
        expect(supported_tags.include?(tag.name.to_s.pluralize.to_sym)).to be tag.multiple_allowed?

        tag.synonyms.each do |synonym|
          expect(supported_tags).to include synonym
          expect(supported_tags.include?(synonym.to_s.pluralize.to_sym)).to be tag.multiple_allowed?
        end
      end

      tag = Example3.instance

      expect(supported_tags).not_to include tag.name
      expect(supported_tags).not_to include tag.name.to_s.pluralize.to_sym

      tag.synonyms.each do |synonym|
        expect(supported_tags).not_to include synonym.name
        expect(supported_tags).not_to include synonym.name.to_s.pluralize.to_sym
      end
    end
  end

  describe ".register_bundled_tags" do
    it "registers all bundled tags" do
      subject.register_bundled_tags
      supported_tags = subject.supported_tags

      bundled = Docks::Tags.constants.select do |const|
        klass = Docks::Tags.const_get(const)
        Class === klass && !(klass.eql?(Docks::Tags::Base))
      end

      bundled.each do |bundled_tag|
        bundled_tag = Docks::Tags.const_get(bundled_tag).instance
        [bundled_tag.name, bundled_tag.synonyms].flatten.each do |name|
          expect(supported_tags).to include bundled_tag.name
        end
      end
    end
  end

  describe ".join_synonymous_tags" do
    let(:value) { "foo" }
    let(:example_hash) { Hash.new }
    let(:target_hash) { Hash.new }

    before :each do
      subject.register(Example1)
    end

    it "leaves hashes with keys based on the base tag name alone" do
      example_hash[example.name] = value
      expect(subject.join_synonymous_tags(example_hash)).to eq example_hash
    end

    it "renames a synonym hash with its base tag name" do
      example_hash[example.synonyms.first] = value
      target_hash[example.name] = value
      expect(subject.join_synonymous_tags(example_hash)).to eq target_hash
    end

    it "renames a pluralized tag to its base tag name" do
      example_hash[example.name.to_s.pluralize.to_sym] = value
      target_hash[example.name] = value
      expect(subject.join_synonymous_tags(example_hash)).to eq target_hash
    end

    it "joins together results of a synonym with results of the base tag name" do
      example_hash[example.name] = [-1]
      example.synonyms.each_with_index do |synonym, index|
        example_hash[synonym] = [index]
      end

      target_hash[example.name] = (-1...example.synonyms.length).to_a
      expect(subject.join_synonymous_tags(example_hash)).to eq target_hash
    end

    it "removes results for unrecognized tags" do
      example_hash[:foo] = "bar"
      expect(subject.join_synonymous_tags(example_hash)).to eq Hash.new
    end
  end

  describe ".has_tag?" do
    it "indicates that no tag exists when not previously registered" do
      expect(subject.has_tag?(example.name)).to be false
    end

    it "indicates the presence of a tag that has been registered by its name" do
      subject.register(Example1)
      expect(subject.has_tag?(example.name)).to be true
    end

    it "indicates the presence of a tag that has been registered by its class" do
      subject.register(Example1)
      expect(subject.has_tag?(Example1)).to be true
    end
  end

  describe ".register" do
    it "registers a tag" do
      subject.register(Example1)

      expect(subject.has_tag?(example.name)).to be true
      expect(subject.supported_tags).to include example.name
    end

    it "registers synonyms" do
      subject.register(Example1)

      example.synonyms.each do |synonym|
        expect(subject.has_tag?(synonym)).to be true
        expect(subject.supported_tags).to include synonym
      end
    end

    it "registers synonyms to their respective base tag" do
      subject.register(Example1)
      subject.register(Example2)

      example.synonyms.each do |synonym|
        expect(subject.tag_for(synonym)).to be example
      end

      example2 = Example2.instance
      example2.synonyms.each do |synonym|
        expect(subject.tag_for(synonym)).to be example2
      end
    end

    it "allows the tag to setup its post processing" do
      expect(Example1.instance).to receive(:setup_post_processors)
      subject.register(Example1)
    end

    it "is aliased to <<" do
      expect(subject).to receive(:register).with Example1
      subject << Example1
    end
  end
end
