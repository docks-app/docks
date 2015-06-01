require "spec_helper"

describe Docks::Containers::Base do
  before(:each) { Docks::Tags.register_bundled_tags }

  let(:hash) do
    { name: "baz", param: Hash.new, title: "bar" }
  end

  let(:container) { Docks::Containers::Base.new(hash) }

  describe "#method_missing" do
    context "when the method ends with `=`" do
      it "normalizes the passed tag name" do
        expect(Docks::Tags).to receive(:base_tag_name).with(:title).at_least(:once).and_call_original
        container.title = :bar
      end

      it "sends the base tag of unrecognized symbols to the initialization hash" do
        expect(container.instance_variable_get(:@details)).to receive(:[]=).with(:title, :bar)
        container.title = :bar
      end

      it "does the default method missing when the method is not a recognized tag" do
        expect { container.foo = :bar }.to raise_error
      end
    end

    context "when the method is a plural of a recognized tag" do
      it "normalizes the singular version of the hash name" do
        expect(Docks::Tags).to receive(:base_tag_name).with(:param).at_least(:once).and_call_original
        container.params
      end

      it "returns the tag contents as an array" do
        params = container.params
        expect(params).to be_an Array
        expect(params.length).to be 1
        expect(params.first).to eq hash[:param]
      end

      it "does the default method missing when the method is not a recognized tag" do
        expect { container.foos }.to raise_error
      end
    end

    context "when the method ends with anything other than `=` and it's a recognized tag" do
      it "normalizes the passed tag name" do
        expect(Docks::Tags).to receive(:base_tag_name).with(:title).at_least(:once).and_call_original
        container.title
      end

      it "sends the base tag of unrecognized symbols to the initialization hash" do
        expect(container.instance_variable_get(:@details)).to receive(:fetch).with(:title, nil)
        container.title
      end

      it "does the default method missing when the method is not a recognized tag" do
        expect { container.foo }.to raise_error
      end
    end
  end

  describe "#[]" do
    it "normalizes the passed tag name" do
      expect(Docks::Tags).to receive(:base_tag_name).with(:title).and_call_original
      container[:title]
    end

    it "accesses the item in the contained hash" do
      expect(container[:title]).to eq hash[:title]
    end

    it "returns nil when there is no such key" do
      expect(container[:pattern]).to be nil
    end
  end

  describe "#[]=" do
    it "normalizes the passed tag name" do
      expect(Docks::Tags).to receive(:base_tag_name).with(:title).and_call_original
      container[:title] = :bar
    end

    it "sets the item in the contained hash" do
      expect(container.instance_variable_get(:@details)).to receive(:[]=).with(:title, :bar).and_call_original
      container[:title] = :bar
      expect(container[:title]).to eq :bar
    end

    it "doesn't set the value for a non-registered tag" do
      expect(container.instance_variable_get(:@details)).to_not receive(:[]=)
      container[:foo] = :bar
    end
  end

  describe "#update" do
    it "normalizes the passed tag name" do
      expect(Docks::Tags).to receive(:base_tag_name).at_least(:once).with(:title).and_call_original
      container.update(:title) {}
    end

    it "yields the current value of the tag" do
      value = nil
      expected = container.title

      container.update(:title) { |val| value = val }
      expect(value).to eq expected
    end

    it "updates the tag with the value returned from the block" do
      value = "qux"
      container.update(:title) { value }
      expect(container.title).to eq value
    end
  end

  describe "#delete" do
    it "normalizes the passed tag name" do
      expect(Docks::Tags).to receive(:base_tag_name).with(:title).and_call_original
      container.delete(:title)
    end

    it "deletes the item in the contained hash" do
      original = hash[:title]
      expect(container.instance_variable_get(:@details)).to receive(:delete).with(:title).and_call_original
      expect(container.delete(:title)).to eq original
    end
  end

  describe "#fetch" do
    it "normalizes the passed tag name" do
      expect(Docks::Tags).to receive(:base_tag_name).with(:title).and_call_original
      container.fetch(:title, :bar)
    end

    it "passes the fetch method along to the contained hash" do
      expect(container.instance_variable_get(:@details)).to receive(:fetch).with(:title, :bar).and_call_original
      container.fetch(:title, :bar)
    end
  end

  describe "#to_h" do
    it "returns the backing hash" do
      expect(container.to_h).to eq hash
    end

    it "is aliased to #to_hash" do
      expect(container.to_hash).to eq container.to_h
    end
  end

  describe "#summary" do
    it "produces a summary that preserves the name of the original item" do
      expect(container.summary.name).to eq container.name
    end
  end

  describe "tags" do
    around do |example|
      Docks::Tags.register_bundled_tags
      example.run
      Docks::Tags.send(:clean)
    end

    it "returns an array with all tags in the item" do
      container = Docks::Containers::Base.new
      expect(container.tags).to be_empty

      container[Docks::Tags::Title] = "foo"
      expect(container.tags).to be_an Array
      expect(container.tags.length).to be 1
      expect(container.tags.first).to be Docks::Tags::Title.instance

      container.name = "bar"
      expect(container.tags.length).to be 2
      expect(container.tags).to include Docks::Tags::Title.instance
      expect(container.tags).to include Docks::Tags::Name.instance

      container.delete(:name)
      expect(container.tags.length).to be 1
      expect(container.tags.first).to be Docks::Tags::Title.instance
    end
  end

  describe "forwarded to hash" do
    %w(to_s inspect to_json each).each do |forwarded_method|
      it "forwards #{forwarded_method} to the backing hash" do
        forwarded_method = forwarded_method.to_sym
        expect(container.instance_variable_get(:@details)).to receive(forwarded_method).at_least(:once)
        container.send(forwarded_method)
      end
    end
  end
end
