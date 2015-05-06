require "spec_helper"

dir = Dir.pwd

describe Docks::CommandLine do
  subject { Docks::CommandLine }

  describe "#run" do
    it "runs #init when the first argument is init" do
      args = %w(init)
      cli = subject.new(args)
      expect(cli).to receive(:init)
      cli.run
    end
  end

  describe "#init" do
    it "assigns reasonable defaults" do
      args = %w(init)
      expect(Docks::Builder).to receive(:setup).with hash_including(config_type: "yaml", template_language: "erb", style_preprocessor: "scss", script_language: "javascript")
      subject.new(args).init
    end

    it "assigns a config type" do
      type = "ruby"
      args = ["init", "--config=#{type}"]
      expect(Docks::Builder).to receive(:setup).with hash_including(config_type: type)
      subject.new(args).init
    end

    it "assigns a template language" do
      language = "haml"
      args = ["init", "--template=#{language}"]
      expect(Docks::Builder).to receive(:setup).with hash_including(template_language: language)
      subject.new(args).init
    end

    it "assigns a style preprocessor" do
      preprocessor = "less"
      args = ["init", "--styles=#{preprocessor}"]
      expect(Docks::Builder).to receive(:setup).with hash_including(style_preprocessor: preprocessor)
      subject.new(args).init
    end

    it "assigns a scripting language" do
      language = "coffeescript"
      args = ["init", "--scripts=#{language}"]
      expect(Docks::Builder).to receive(:setup).with hash_including(script_language: language)
      subject.new(args).init
    end
  end
end
