require "spec_helper"

describe Docks::Process do
  subject { Docks::Process }

  before :all do
    Docks::Tag.register_bundled_tags
  end

  describe ".process" do
    it "parses each tag individually" do
      subject.should_receive(:process_tag).with(:page, "Page")
      subject.should_receive(:process_tag).with(:subtitle, "Subtitle")

      subject.process({ page: "Page", subtitle: "Subtitle" })
    end
  end

  describe ".process_tag" do
    it "calls all blocks associated with a one_per_block tag and returns the result" do
      title = "Title"
      expect(subject.process_tag(:title, [title])).to eq title
    end

    it "calls all blocks on each element of a multiple_per_block tag (but not multiple_per_line) and returns the mapped result" do
      param_one = "{String} name"
      param_two = "{Number} count"

      result = subject.process_tag(:param, [param_one, param_two])
      expect(result.length).to eq 2
      expect(result[0]).to eq subject.process_tag(:param, [param_one]).first
      expect(result[1]).to eq subject.process_tag(:param, [param_two]).first
    end

    require "awesome_print"

    it "calls all blocks on each element of a multiple_per_line and concatenated each set of results together" do
      set_by_one = ":active"
      set_by_two = ":state (STATE::ACTIVE)"
      set_by_three = ":is_active?"

      result = subject.process_tag(:set_by, [["#{set_by_one}, #{set_by_two}"], [set_by_three]])
      expect(result.length).to eq 3
      expect(result).to include(subject.process_tag(:set_by, [[set_by_one]]).first)
      expect(result).to include(subject.process_tag(:set_by, [[set_by_two]]).first)
      expect(result).to include(subject.process_tag(:set_by, [[set_by_three]]).first)
    end
  end

  describe ".add_post_processors" do
    before :each do
      subject.clear_post_processors
      subject.add_post_processors Docks::PostProcessors::MarkdownDescriptions,
                                  Docks::PostProcessors::MirrorPrecludes
    end

    it "adds all post-processors passed in" do
      post_processors = subject.post_processors
      expect(post_processors).to include(Docks::PostProcessors::MarkdownDescriptions)
      expect(post_processors).to include(Docks::PostProcessors::MirrorPrecludes)
    end

    it "does not re-add a previously-added post-processor" do
      expect {
        subject.add_post_processors Docks::PostProcessors::MarkdownDescriptions,
                                    Docks::PostProcessors::MirrorPrecludes
      }.to_not change { subject.post_processors.length }
    end
  end

  describe ".post_process" do
    it "Runs post_process with each registered post-processor on the passed content" do
      content = [{ foo: :bar }]
      post_processors = [Docks::PostProcessors::MarkdownDescriptions, Docks::PostProcessors::MirrorPrecludes]
      subject.clear_post_processors
      subject.add_post_processors(*post_processors)

      post_processors.each do |post_processor|
        expect(post_processor).to receive(:post_process).with(content)
      end

      subject.post_process(content)
    end
  end
end
