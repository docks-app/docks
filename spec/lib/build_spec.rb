require "spec_helper"

template_dir = File.expand_path("../../../assets", __FILE__)
empty_dir = File.expand_path("../../fixtures/build/empty", __FILE__)
existing_dir = File.expand_path("../../fixtures/build/existing", __FILE__)

describe Docks::Builder do
  subject { Docks::Builder }

  let(:default_options) do
    {
      config_type: "yaml",
      template_language: "erb",
      style_language: "scss",
      script_language: "javascript"
    }
  end

  after :all do
    FileUtils.rm_rf(empty_dir)
    FileUtils.rm_rf(existing_dir)
  end

  describe ".setup" do
    let(:assets_dir) { File.join(empty_dir, Docks::ASSETS_DIR) }
    let(:config_dir) { File.expand_path("../../../config", __FILE__) }

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

    %w(yaml ruby json).each do |config_type|
      it "creates the mustache-rendered #{config_type} config file to the current directory" do
        default_options[:config_type] = config_type
        original_config = Dir[File.join(config_dir, config_type, "*.*")].first

        template = subject::Config.new(OpenStruct.new(default_options))
        template.template = File.read(original_config).force_encoding("UTF-8")
        template = template.render.gsub(/ +$/m, "")

        subject.setup(default_options)

        config_file = Dir[File.join(empty_dir, "*.*")].first
        config = File.read(config_file).force_encoding("UTF-8")
        expect(config).to eq template
      end
    end

    it "does not copy the config file if one already exists" do
      file = Dir[File.join(config_dir, "**/*.rb")].first
      copied_file = File.join(empty_dir, File.basename(file))
      FileUtils.cp(file, empty_dir)
      File.open(copied_file, "w") { |file| file.write("# foo") }

      subject.setup(default_options)

      expect(File.read(copied_file)).to eq "# foo"
    end

    it "preconfigures with the specified theme" do
      default_options[:theme] = "API"
      subject.setup(default_options)
      expect(Docks.config.theme).to be_a Docks::Themes::API
      expect(Docks.config.paginate).to eq "pattern"
    end

    it "configures the pattern library with the new config file" do
      expect(Docks).to receive(:configure).with no_args
      subject.setup(default_options)
    end

    it "still configures the pattern library when there is already a config file" do
      file = Dir[File.join(config_dir, "**/*.rb")].first
      copied_file = File.join(empty_dir, File.basename(file))
      FileUtils.cp(file, empty_dir)
      File.open(copied_file, "w") { |file| file.write("# foo") }

      expect(Docks).to receive(:configure).with no_args
      subject.setup(default_options)
    end

    it "calls setup with configured theme" do
      theme = double()
      expect(Docks).to receive(:configure_with) do
        Docks.configure { |config| config.theme = theme }
      end

      expect(theme).to receive(:setup).with(Docks::Builder)
      subject.setup(default_options)
    end

    it "sets the theme to false when 'false' is provided" do
      default_options[:theme] = "false"
      subject.setup(default_options)
      expect(Docks.config.theme).to be false
    end

    it "sets the theme to false when 'none' is provided" do
      default_options[:theme] = "none"
      subject.setup(default_options)
      expect(Docks.config.theme).to be false
    end

    it "doesn't call configure with the theme if it doesn't exist" do
      default_options[:theme] = "foo"
      expect { subject.setup(default_options) }.not_to raise_error
    end
  end

  describe ".add_assets" do
    let(:root) { Pathname.new(File.expand_path("../../fixtures/build", __FILE__)) }

    around do |example|
      FileUtils.rm_rf(root + Docks::ASSETS_DIR)
      Docks.configure { |config| config.root = root }

      example.run

      FileUtils.rm_rf(root + Docks::ASSETS_DIR)
    end

    %w(styles scripts templates).each do |type|
      it "adds #{type} to the #{type} in the pattern library assets and annouces the root-relative location" do
        source_root = root + type

        destination_root = if type == "templates"
          root + Docks.config.templates
        else
          root + File.join(Docks::ASSETS_DIR, Docks.config.asset_folders.send(type.to_sym))
        end

        add_assets = Dir[source_root + "**/*.*"]
        allow(Docks::Messenger).to receive(:file).and_call_original

        subject.add_assets(add_assets, type: type.to_sym, root: source_root)

        added_assets = Dir[destination_root + "**/*.*"]
        expect(added_assets.count).to be add_assets.count
        added_assets.each do |asset|
          asset = Pathname.new(asset)
          relative_path = asset.relative_path_from(root)
          original_asset = source_root + asset.relative_path_from(destination_root)
          expect(FileUtils.identical?(asset, original_asset)).to be true
          expect(Docks::Messenger).to have_received(:file).with(relative_path, :created)
        end
      end
    end

    it "updates non-identical assets and does nothing with identical ones" do
      source_root = root + "scripts"
      destination_root = root + File.join(Docks::ASSETS_DIR, Docks.config.asset_folders.scripts)
      add_assets = Dir[source_root + "**/*.*"]

      subject.add_assets(add_assets, type: :scripts, root: source_root)
      allow(Docks::Messenger).to receive(:file).and_call_original

      added_assets = Dir[destination_root + "**/*.*"]
      updated = Pathname.new(added_assets.pop)
      original_contents = File.read(add_assets.last)

      begin
        File.open(add_assets.last, "w") { |file| file.write("#{original_contents} updated") }

        subject.add_assets(add_assets, type: :scripts, root: source_root)

        updated_relative_path = updated.relative_path_from(root)
        expect(Docks::Messenger).to have_received(:file).with(updated_relative_path, :updated)

        added_assets.each do |asset|
          relative_path = Pathname.new(asset).relative_path_from(root)
          expect(Docks::Messenger).not_to have_received(:file).with(relative_path, anything)
        end
      ensure
        File.open(add_assets.last, "w") { |file| file.write(original_contents) }
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

    it "clears the cache if the clear_cache options is passed" do
      expect_any_instance_of(Docks::Cache).to receive(:clear)
      Docks.parse(clear_cache: true)
    end

    it "passes each group to Parser and the Cache" do
      groups = {
        foo: ["foo.scss", "foo.haml"],
        bar: ["bar.scss", "bar.coffee"]
      }

      expect(Docks::Grouper).to receive(:group).and_return(groups)

      groups.each do |id, group|
        expect(Docks::Cache).to receive(:cached?).with(group).and_return(false)
        expect(Docks::Parser).to receive(:parse).with(group).and_return(Docks::Containers::Pattern.new(name: "foo"))
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
      { "foo" => "bar", "bar" => "baz" }
    end

    around do |example|
      original_dir = Dir.pwd
      FileUtils.mkdir_p(existing_dir)
      FileUtils.cd(existing_dir)
      Docks::Templates.send(:clean)
      Docks.configure_with(destination: destination, root: existing_dir, theme: "API", paginate: "pattern")

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

    it "copies and renames the theme stylesheets to the destination" do
      allow(Docks::Grouper).to receive(:group).and_return(Hash.new)
      subject.build

      original_stylesheets = Docks.config.theme.styles.map { |file| File.basename(file).sub("pattern-library", "docks") }
      copied_stylesheets = Dir[File.join(Docks.config.destination, Docks.config.asset_folders.styles, "*.css")].map { |file| File.basename(file) }

      original_stylesheets.each do |stylesheet|
        expect(copied_stylesheets).to include stylesheet
      end
    end

    it "copies and renames the theme javascripts to the destination" do
      allow(Docks::Grouper).to receive(:group).and_return(Hash.new)
      subject.build

      original_scripts = Docks.config.theme.scripts.map { |file| File.basename(file).sub("pattern_library", "docks") }
      copied_scripts = Dir[File.join(Docks.config.destination, Docks.config.asset_folders.scripts, "*.js")].map { |file| File.basename(file) }

      original_scripts.each do |script|
        expect(copied_scripts).to include script
      end
    end

    it "copies bundled assets only when changed" do
      allow(Docks::Grouper).to receive(:group).and_return(Hash.new)
      subject.build

      assets = Dir[File.join(Docks.config.destination + "**/*.{css,js}")]

      first, rest = assets.first, assets[1..-1]
      File.open(first, "a") { |file| file.puts("foo") }
      expect(FileUtils).to receive(:cp).with(anything, first)
      rest.each { |other| expect(FileUtils).not_to receive(:cp).with(anything, other) }

      subject.build
    end

    it "copies bundled assets only when a theme is specified" do
      allow(Docks::Grouper).to receive(:group).and_return(Hash.new)
      Docks.configure_with(theme: false)
      expect(FileUtils).not_to receive(:cp)
      subject.build
    end

    context "when pagination is specified" do
      it "writes a file for each pattern" do
        files = {}
        expect(Docks::Grouper).to receive(:group).and_return(patterns)

        patterns.each do |id, group|
          expect(Docks::Cache).to receive(:pattern_for?).with(id).and_return true
          expect(Docks::Cache).to receive(:pattern_for).with(id).and_return(OpenStruct.new(name: id))

          renderer = double(render: group, :ivars= => nil)
          expect(Docks::Renderers::ERB).to receive(:new).and_return(renderer)
          expect(Docks::Helpers).to receive(:add_helpers_to).with(renderer)
          files[id] = { file: File.join(dest_dir, Docks.config.mount_at, id.to_s, "index.html"), content: group }
        end

        subject.build

        files.each do |id, details|
          expect(File.exists?(details[:file])).to be true
          expect(File.read(details[:file]).strip).to eq details[:content]
        end
      end

      # Gross tests, must refactor
      it "only writes a file for each pattern on change" do
        allow(Docks::Grouper).to receive(:group).and_return(patterns)

        patterns.each do |id, group|
          expect(Docks::Cache).to receive(:pattern_for?).with(id).and_return true
          expect(Docks::Cache).to receive(:pattern_for).with(id).and_return(OpenStruct.new(name: id))

          renderer = double(render: group, :ivars= => nil)
          expect(Docks::Renderers::ERB).to receive(:new).and_return(renderer)
          expect(Docks::Helpers).to receive(:add_helpers_to).with(renderer)
        end

        subject.build

        patterns.each do |id, group|
          expect(Docks::Cache).to receive(:pattern_for?).with(id).and_return true
          expect(Docks::Cache).to receive(:pattern_for).with(id).and_return(OpenStruct.new(name: id))

          renderer = double(render: group, :ivars= => nil)
          expect(Docks::Renderers::ERB).to receive(:new).and_return(renderer)
          expect(Docks::Helpers).to receive(:add_helpers_to).with(renderer)
          expect(FileUtils).not_to receive(:cp).with(anything, File.join(dest_dir, Docks.config.mount_at, id.to_s, "index.html"))
        end

        subject.build
      end

      it "removes patterns that are no longer part of the pattern group" do
        files = {}
        expect(Docks::Grouper).to receive(:group).and_return(patterns)

        patterns.each do |id, group|
          expect(Docks::Cache).to receive(:pattern_for?).with(id).and_return true
          expect(Docks::Cache).to receive(:pattern_for).with(id).and_return(OpenStruct.new(name: id))

          renderer = double(render: group, :ivars= => nil)
          expect(Docks::Renderers::ERB).to receive(:new).and_return(renderer)
          expect(Docks::Helpers).to receive(:add_helpers_to).with(renderer)
          files[id] = { file: File.join(dest_dir, Docks.config.mount_at, id.to_s, "index.html"), content: group }
        end

        subject.build

        files = {}
        excluded_pattern = patterns.keys.first
        patterns.delete(excluded_pattern)
        expect(Docks::Grouper).to receive(:group).and_return(patterns)

        patterns.each do |id, group|
          expect(Docks::Cache).to receive(:pattern_for?).with(id).and_return true
          expect(Docks::Cache).to receive(:pattern_for).with(id).and_return(OpenStruct.new(name: id))

          renderer = double(render: group, :ivars= => nil)
          expect(Docks::Renderers::ERB).to receive(:new).and_return(renderer)
          expect(Docks::Helpers).to receive(:add_helpers_to).with(renderer)
          files[id] = { file: File.join(dest_dir, Docks.config.mount_at, id.to_s, "index.html"), content: group }
        end

        subject.build

        files.each do |id, details|
          expect(File.exists?(details[:file])).to be true
          expect(File.read(details[:file]).strip).to eq details[:content]
        end

        expect(File.exists?(File.join(dest_dir, Docks.config.mount_at, excluded_pattern.to_s, "index.html"))).to be false
      end

      it "provides the pattern and pattern library to every render call as locals and ivars" do
        pattern_library = Docks::Containers::PatternLibrary.new

        expect(Docks::Grouper).to receive(:group).and_return(patterns)
        expect(Docks::Cache).to receive(:pattern_library).and_return(pattern_library)
        expect(pattern_library).to receive(:summarize!)
        patterns.each do |id, group|
          pattern = OpenStruct.new(name: id)

          default_template = Docks::Templates.fallback
          expect(Docks::Templates).to receive(:search_for_template).with(default_template.layout, must_be: :layout).and_return "application.erb"
          expect(Docks::Templates).to receive(:search_for_template).with(default_template.path).and_return "pattern.erb"
          expect(Docks::Cache).to receive(:pattern_for?).with(id).and_return true
          expect(Docks::Cache).to receive(:pattern_for).with(id).and_return(pattern)

          renderer = double()
          expect(Docks::Renderers::ERB).to receive(:new).and_return(renderer)
          expect(Docks::Helpers).to receive(:add_helpers_to).with(renderer)
          expect(renderer).to receive(:ivars=).with pattern_library: pattern_library, pattern: pattern
          expect(renderer).to receive(:render).with anything, hash_including(locals: { pattern_library: pattern_library, pattern: pattern })
        end

        subject.build
      end

      it "doesn't die when there are no cache results matching a pattern" do
        expect(Docks::Grouper).to receive(:group).and_return(patterns)
        patterns.each do |id, group|
          expect { Docks::Cache.pattern_for(id) }.to raise_error(Docks::NoPatternError)
        end

        subject.build
      end
    end

    context "when no pagination is specified" do
      before(:each) do
        Docks.configure_with(paginate: false)
      end

      let(:expected_file) do
        Docks.config.destination + "#{Docks.config.mount_at}/index.html"
      end

      it "writes the pattern library file" do
        renderer = double(render: "foo", :ivars= => nil)
        expect(Docks::Renderers::ERB).to receive(:new).and_return(renderer)
        expect(Docks::Helpers).to receive(:add_helpers_to).with(renderer)

        subject.build

        expect(File.exists?(expected_file)).to be true
        expect(File.read(expected_file)).to eq "foo"
      end

      it "receives the full pattern library as ivars and locals" do
        pattern_library = Docks::Containers::PatternLibrary.new
        renderer = double(render: "foo", :ivars= => nil)
        locals = { pattern_library: pattern_library, pattern: nil }

        expect(pattern_library).not_to receive(:summarize!)
        expect(Docks::Cache).to receive(:pattern_library).and_return(pattern_library)
        expect(Docks::Renderers::ERB).to receive(:new).and_return(renderer)
        expect(Docks::Helpers).to receive(:add_helpers_to).with(renderer)
        expect(renderer).to receive(:ivars=).with(locals)
        expect(renderer).to receive(:render).with anything, hash_including(locals: locals)

        subject.build
      end
    end
  end
end
