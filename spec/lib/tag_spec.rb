require "spec_helper"

class Example1 < Docks::Tags::Base
  def initialize
    @name = :name
    @synonyms = [:nom, :nome]
    @post_processors = %w(foo bar)
  end
end

class Example2 < Docks::Tags::Base
  def initialize
    @name = :title
    @synonyms = [:titre]
  end
end

describe Docks::Tag do
  subject { Docks::Tag }

  let(:example) { Example1.instance }

  before :each do
    subject.send(:clear_tags)
  end

  describe ".register_bundled_tags" do
    it "registers all bundled language extensions" do
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

  describe ".has_tag?" do
    it "correctly indicates that no tag exists when not previously registered" do
      expect(subject.has_tag?(example.name)).to be false
    end
  end

  describe ".register" do
    it "correctly registers a tag" do
      subject.register(Example1)

      expect(subject.has_tag?(example.name)).to be true
      expect(subject.supported_tags).to include example.name
    end

    it "correctly registers synonyms" do
      subject.register(Example1)

      example.synonyms.each do |synonym|
        expect(subject.has_tag?(synonym)).to be true
        expect(subject.supported_tags).to include synonym
      end
    end

    it "correctly registers synonyms to their respective base tag" do
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

    it "correctly adds post processors included on the tag" do
      expect(Docks::Process).to receive(:add_post_processors).with(*example.post_processors)
      subject.register(Example1)
    end
  end
end
