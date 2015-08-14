require "spec_helper"

describe Docks do
  subject { Docks }

  it "has a config property" do
    expect(subject.config).to be Docks::Configuration.instance
  end

  describe ".configure" do
    it "yields the configuration object" do
      yielded = nil
      subject.configure { |config| yielded = config }
      expect(yielded).to be Docks::Configuration.instance
    end

    it "pre- and post-configures before configuration" do
      expect(subject).to receive(:pre_configuration)
      expect(subject).to receive(:post_configuration)
      subject.configure
    end

    it "only runs the pre-configuration steps if it hasn't already been configured" do
      expect(subject).to receive(:pre_configuration).once
      subject.configure
      subject.configure
    end
  end
end

describe Docks::Configuration do
  subject { Docks::Configuration.instance }

  it "has the default configuration" do
    expect(subject.sources).to eq []
    expect(subject.compiled_assets).to eq []
    expect(subject.github_repo).to be nil
    expect(subject.root).to eq Pathname.pwd
    expect(subject.destination).to eq subject.root + "public"
    expect(subject.cache_location).to eq subject.root + ".#{Docks::Cache::DIR}"
    expect(subject.templates).to eq subject.root + "#{Docks::ASSETS_DIR}/templates"
    expect(subject.asset_folders).to eq OpenStruct.new(styles: "styles", scripts: "scripts")
    expect(subject.mount_at).to eq "pattern-library"
    expect(subject.use_theme_assets).to be true
  end

  describe "#root=" do
    it "updates all root-dependent paths for a new root" do
      test_dir_name = ".foo"
      FileUtils.rm_rf(test_dir_name)
      FileUtils.mkdir(test_dir_name)

      subject.root = File.join(Dir.pwd, test_dir_name)
      subject.sources = %w(styles/foo.css)

      expect(subject.root).to eq Pathname.new(test_dir_name).realpath
      expect(subject.destination).to eq subject.root + "public"
      expect(subject.cache_location).to eq subject.root + ".#{Docks::Cache::DIR}"
      expect(subject.templates).to eq subject.root + "#{Docks::ASSETS_DIR}/templates"
      expect(subject.sources).to eq [subject.root + "styles/foo.css"]

      FileUtils.rm_rf(test_dir_name)
    end
  end

  describe "#destination=" do
    it "allows setting root-relative paths" do
      subject.destination = "out"
      expect(subject.destination).to eq subject.root + "out"
    end

    it "allows setting non-root-relative paths" do
      destination = Dir[File.join(Dir.pwd, "*")].first
      subject.destination = destination
      expect(subject.destination).to eq Pathname.new(destination).realpath
    end
  end

  describe "#asset_folders=" do
    it "merges the default asset folders" do
      defaults = subject.asset_folders
      expect { subject.asset_folders = { scripts: "javascripts" } }.not_to change { defaults.styles }
      expect(subject.asset_folders.scripts).to eq "javascripts"
    end
  end

  describe "#custom_languages" do
    it "yields the language manager" do
      expect { |block| subject.custom_languages(&block) }.to yield_with_args Docks::Languages
    end
  end

  describe "#custom_templates" do
    it "yields the template manager" do
      expect { |block| subject.custom_templates(&block) }.to yield_with_args Docks::Templates
    end
  end

  describe "#custom_templates=" do
    it "passes the templates to Templates.register" do
      templates = { foo: "bar", bar: "baz" }
      expect(Docks::Templates).to receive(:register).with(templates)
      subject.custom_templates = templates
    end
  end

  describe "#custom_tags" do
    it "yields the tag manager" do
      expect { |block| subject.custom_tags(&block) }.to yield_with_args Docks::Tags
    end
  end

  describe "#custom_symbol_sources" do
    it "yields the symbol source manager" do
      expect { |block| subject.custom_symbol_sources(&block) }.to yield_with_args Docks::SymbolSources
    end
  end

  describe "#custom_parsers" do
    it "yields the parser manager" do
      expect { |block| subject.custom_parsers(&block) }.to yield_with_args Docks::Parser
    end
  end

  describe "#github_repo" do
    it "returns nil when there is no github repo" do
      expect(subject.github_repo).to be nil
    end

    it "returns the URL for a github repo when provided" do
      subject.github_repo = "https://github.com/lemonmade/docks"
      expect(subject.github_repo).to eq "https://github.com/lemonmade/docks"
    end

    it "constructs the github URL when the repo was specified" do
      subject.github_repo = "lemonmade/docks"
      expect(subject.github_repo).to eq "https://github.com/lemonmade/docks"
    end
  end

  describe "#naming_convention=" do
    it "asks the naming convention manager for the new naming convention" do
      expect(Docks::NamingConventions).to receive(:for).with(:foo).and_return(:bar)
      subject.naming_convention = :foo
      expect(subject.naming_convention).to eq :bar
    end
  end

  describe "#theme=" do
    it "asks the theme manager to set the new theme" do
      expect(Docks::Themes).to receive(:for).with(:foo).and_return(:bar)
      subject.theme = :foo
      expect(subject.theme).to eq :bar
    end
  end

  describe "#pattern_id=" do
    it "passes the pattern ID block to the Docks class method" do
      identifier = Docks.instance_variable_get(:@pattern_id)
      expect(Docks).to receive(:pattern_id=).with(identifier)
      subject.pattern_id = identifier
    end
  end

  describe "#pattern_id" do
    it "calls the core pattern ID method" do
      expect(Docks).to receive(:pattern_id).with("foo").and_return "foo"
      expect(subject.pattern_id("foo")).to eq "foo"
    end
  end
end
