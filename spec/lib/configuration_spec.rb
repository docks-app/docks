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
    expect(subject.library_assets).to eq subject.root + Docks::ASSETS_DIR
    expect(subject.mount_at).to eq "pattern-library"
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
      expect(subject.library_assets).to eq subject.root + Docks::ASSETS_DIR
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

  describe "#templates=" do
    it "passes the templates to Templates.register" do
      templates = { foo: "bar", bar: "baz" }
      expect(Docks::Templates).to receive(:register).with(templates)
      subject.templates = templates
    end
  end

  describe "#asset_folders=" do
    it "merges the default asset folders" do
      defaults = subject.asset_folders
      subject.asset_folders = { scripts: "javascripts" }
      [:styles, :templates, :images].each do |asset|
        expect(subject.asset_folders.send(asset)).to eq defaults.send(asset)
      end

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

  describe "#naming_convention" do
    after(:each) do
      Docks::Naming.send(:clean)
    end

    it "defaults to BEM" do
      expect(subject.naming_convention).to eq Docks::Naming::Conventions::BEM.instance
      expect(Docks::Naming.convention).to eq Docks::Naming::Conventions::BEM.instance
    end

    it "converts a string version of the naming convention into the corresponding naming convention" do
      subject.naming_convention = "SUIT"
      expect(subject.naming_convention).to eq Docks::Naming::Conventions::SUIT.instance
      expect(Docks::Naming.convention).to eq Docks::Naming::Conventions::SUIT.instance
    end

    it "uses the passed naming convention if it is a class" do
      subject.naming_convention = Docks::Naming::Conventions::SUIT
      expect(subject.naming_convention).to eq Docks::Naming::Conventions::SUIT.instance
      expect(Docks::Naming.convention).to eq Docks::Naming::Conventions::SUIT.instance
    end

    it "uses the passed naming convention if it is an instance" do
      subject.naming_convention = Docks::Naming::Conventions::SUIT.instance
      expect(subject.naming_convention).to eq Docks::Naming::Conventions::SUIT.instance
      expect(Docks::Naming.convention).to eq Docks::Naming::Conventions::SUIT.instance
    end

    it "doesn't change the convention when an invalid setting is passed" do
      expect { subject.naming_convention = "foo" }.to_not change { Docks::Naming.convention }
      expect { subject.naming_convention = Docks::Naming }.to_not change { Docks::Naming.convention }
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
