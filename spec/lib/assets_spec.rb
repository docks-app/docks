require 'spec_helper'

describe Docks::Assets do
  subject { Docks::Assets }

  describe ".path_for" do
    it "returns a pathname object for the passed asset" do
      path = subject.path_for("styles/pattern-library.css")
      expect(path).to be_a Pathname
      expect(path).to eq Pathname.new(File.expand_path("../../../assets/styles/pattern-library.css", __FILE__))
    end

    it "joins parts of the file that were passed" do
      path = subject.path_for("styles", "pattern-library.css")
      expect(path).to eq Pathname.new(File.expand_path("../../../assets/styles/pattern-library.css", __FILE__))
    end

    it "throws when the requested file does not exist" do
      expect { subject.path_for("styles/pattern_library.js") }.to raise_error(Docks::NoAssetError)
    end
  end

  describe ".scripts" do
    it "returns all compiled scripts" do
      compiled_scripts = Dir[File.expand_path("../../../assets/scripts/*.js", __FILE__)]
      expect(subject.scripts).to eq compiled_scripts
    end
  end

  describe ".styles" do
    it "returns all compiled styles" do
      compiled_styles = Dir[File.expand_path("../../../assets/styles/*.css", __FILE__)]
      expect(subject.styles).to eq compiled_styles
    end
  end
end
