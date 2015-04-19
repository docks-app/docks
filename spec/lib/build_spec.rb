require 'spec_helper'

template_dir = File.expand_path("../../../lib/template", __FILE__)
empty_dir = File.expand_path("../../fixtures/build/empty", __FILE__)
existing_dir = File.expand_path("../../fixtures/build/existing", __FILE__)

describe Docks::Builder do
  subject { Docks::Builder }

  let(:default_options) do
    {
      config_type: "yaml",
      template_language: "erb",
      style_preprocessor: "scss",
      script_language: "javascript"
    }
  end

  after :all do
    FileUtils.rm_rf(empty_dir)
    FileUtils.rm_rf(existing_dir)
  end

  describe ".setup" do
    assets_dir = File.join(empty_dir, "pattern_library_assets")

    before :each do
      Dir[File.join(empty_dir, "*")].each do |file|
        FileUtils.rm_rf(file)
      end
    end

    around do |example|
      original_dir = Dir.pwd
      FileUtils.mkdir_p(empty_dir)
      FileUtils.cd(empty_dir)

      example.run

      FileUtils.cd(original_dir)
      FileUtils.rm_rf(empty_dir)
    end

    it "creates a pattern library assets folder" do
      subject.setup(default_options)
      expect(Dir.exists?(assets_dir)).to be true
    end

    it "copies the images directory to the new directory" do
      subject.setup(default_options)
      copied_images = Dir[File.join(assets_dir, "images", "**/*")].map { |file| File.basename(file) }
      original_images = Dir[File.join(template_dir, "assets", "images", "**/*")].map { |file| File.basename(file) }
      expect(copied_images).to eq original_images
    end

    %w(yaml json ruby).each do |config_type|
      it "copies the #{config_type} config file to the current directory" do
        default_options[:config_type] = config_type
        subject.setup(default_options)

        config_file = Dir[File.join(empty_dir, "*.*")].first
        config = File.read(config_file)
        expect(config).to eq File.read(Dir[File.join(template_dir, "config", config_type, "*.*")].first)
      end
    end

    it "copies the core stylesheet to the pattern library folder" do
      subject.setup(default_options)
      copied_stylesheets = Dir[File.join(assets_dir, "styles", "*.css")].map { |file| File.basename(file) }
      original_stylesheets = Dir[File.join(template_dir, "assets", "styles", "*.css")].map { |file| File.basename(file) }

      original_stylesheets.each do |stylesheet|
        expect(copied_stylesheets).to include stylesheet
      end
    end

    %w(scss less).each do |preprocessor|
      it "copies the #{preprocessor} style helpers to the pattern library assets folder" do
        default_options[:style_preprocessor] = preprocessor
        subject.setup(default_options)

        copied_style_helpers = Dir[File.join(assets_dir, "styles", "**/*.#{preprocessor}")].map { |file| File.basename(file) }
        original_style_helpers = Dir[File.join(template_dir, "assets", "styles", preprocessor, "**/*")].map { |file| File.basename(file) }

        original_style_helpers.each do |style_helper|
          expect(copied_style_helpers).to include style_helper
        end
      end
    end

    %w(erb haml).each do |template_language|
      it "copies the #{template_language} templates into the pattern library assets folder" do
        default_options[:template_language] = template_language
        subject.setup(default_options)

        copied_templates = Dir[File.join(assets_dir, "templates", "**/*")].map { |file| File.basename(file) }
        original_templates = Dir[File.join(template_dir, "assets", "templates", template_language, "**/*")].map { |file| File.basename(file) }

        expect(copied_templates).to eq original_templates
      end
    end

    it "copies the core scripts to the pattern library folder" do
      subject.setup(default_options)
      copied_scripts = Dir[File.join(assets_dir, "scripts", "*.js")].map { |file| File.basename(file) }
      original_scripts = Dir[File.join(template_dir, "assets", "scripts", "*.js")].map { |file| File.basename(file) }

      original_scripts.each do |script|
        expect(copied_scripts).to include script
      end
    end

    %w(javascript coffeescript).each do |script_language|
      it "copies the #{script_language} script helpers into the pattern library assets folder" do
        default_options[:script_language] = script_language
        subject.setup(default_options)

        copied_script_helpers = Dir[File.join(assets_dir, "scripts", "**/*")].map { |file| File.basename(file) }
        original_script_helpers = Dir[File.join(template_dir, "assets", "scripts", script_language, "**/*")].map { |file| File.basename(file) }

        original_script_helpers.each do |script_helper|
          expect(copied_script_helpers).to include script_helper
        end
      end
    end
  end

  describe ".parse" do
    before :each do
      Docks.configure_with(root: empty_dir)
    end

    it "adds the parse function to the top-level Docks namespace" do
      expect(subject).to receive(:parse)
      Docks.parse
    end

    it "passes each group to Parser and the Cache" do
      groups = {
        foo: ["foo.scss", "foo.haml"],
        bar: ["bar.scss", "bar.coffee"]
      }

      expect(Docks::Group).to receive(:group).and_return(groups)

      groups.each do |id, group|
        expect(subject).to receive(:should_parse?).with(group).and_return(true)
        expect(Docks::Parser).to receive(:parse_group).with(group).and_return(Hash.new)
        expect_any_instance_of(Docks::Cache).to receive(:<<)
      end

      expect_any_instance_of(Docks::Cache).to receive(:dump)
      subject.parse
    end
  end

  describe ".build" do
    destination = "out"
    dest_dir = File.join(existing_dir, destination)

    let(:patterns) do
      { foo: "bar", bar: "baz" }
    end

    around do |example|
      original_dir = Dir.pwd
      FileUtils.mkdir_p(existing_dir)
      FileUtils.cd(existing_dir)
      Docks.configure_with(destination: destination, root: existing_dir)

      default_options[:script_language] = "coffeescript"
      subject.setup(default_options)

      example.run

      FileUtils.cd(original_dir)
      FileUtils.rm_rf(existing_dir)
    end

    it "adds the build function to the top-level Docks namespace" do
      expect(subject).to receive(:build)
      Docks.build
    end

    it "creates the destination directory" do
      subject.build
      expect(Dir.exists?(File.join(existing_dir, destination))).to be true
    end

    it "creates the mount_at directory as the base for the pattern library files" do
      mount_at = "pattern-lab"
      Docks.configure { |config| config.mount_at = mount_at }
      subject.build
      expect(Dir.exists?(File.join(existing_dir, destination, mount_at))).to be true
    end

    it "copies only the compiled assets from the source directory" do
      expect(Docks::Group).to receive(:group).and_return(Hash.new)
      subject.build

      compiled_assets_selector = "**/*.{css,html,js,svg,png,jpg}"
      uncompiled_assets_selector = "**/*.{erb,coffee,scss}"

      assets_dir = File.join(existing_dir, "pattern_library_assets")
      Dir[File.join(assets_dir, "*")].each do |src_dir|
        src_files = Dir[File.join(src_dir, compiled_assets_selector)].map { |file| file.gsub(assets_dir, "") }
        copied_files = Dir[File.join(dest_dir, src_dir.split("/").last, compiled_assets_selector)].map { |file| file.gsub(dest_dir, "") }

        expect(src_files).to eq copied_files
      end

      expect(Dir[File.join(assets_dir, uncompiled_assets_selector)]).not_to be_empty
      expect(Dir[File.join(dest_dir, uncompiled_assets_selector)]).to be_empty
    end

    it "writes a file for each pattern" do
      files = {}
      expect(Docks::Group).to receive(:group).and_return(patterns)

      patterns.each do |id, group|
        expect(Docks::Cache).to receive(:pattern_for).with(id).and_return(group)
        expect(Docks::Renderers::ERB.instance).to receive(:render).and_return(group)
        files[id] = { file: File.join(dest_dir, Docks.config.mount_at, id.to_s, "index.html"), content: group }
      end

      subject.build

      files.each do |id, details|
        expect(File.exists?(details[:file])).to be true
        expect(File.read(details[:file]).strip).to eq details[:content]
      end
    end

    it "provides the pattern and pattern group to every render call" do
      pattern_groups = {
        components: patterns.keys.map { |name| { name: name }  }
      }

      expect(Docks::Group).to receive(:group).and_return(patterns)
      expect(Docks::Cache).to receive(:pattern_groups).and_return(pattern_groups)
      patterns.each do |id, group|
        pattern = { name: id }
        expect(Docks::Renderers).to receive(:search_for_template).and_return "pattern.erb"
        expect(Docks::Cache).to receive(:pattern_for).with(id).and_return(pattern)
        expect(Docks::Renderers::ERB.instance).to receive(:render).with hash_including(locals: { pattern_groups: pattern_groups, pattern: pattern })
      end

      subject.build
    end

    it "doesn't die when there are no cache results matching a pattern" do
      expect(Docks::Group).to receive(:group).and_return(patterns)
      patterns.each do |id, group|
        expect { Docks::Cache.pattern_for(id) }.to raise_error(Docks::NoPatternError)
      end

      subject.build
    end
  end
end
