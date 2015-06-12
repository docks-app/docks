require "spec_helper"

describe Docks::Renderers::Common::Helperable do
  subject { Class.new { include Docks::Renderers::Common::Helperable }.new }

  it "includes all passed helpers" do
    module Module1; end
    module Module2; end

    expect(subject).to receive(:extend).with Module1
    expect(subject).to receive(:extend).with Module2

    subject.helpers Module1, Module2
  end

  it "includes all modules in passed files" do
    helper_file = File.expand_path("../../../../fixtures/renderers/helpers.rb", __FILE__)
    require helper_file
    subject.helpers helper_file

    (Helpers.instance_methods(false) + Helpers2.instance_methods(false)).each do |meth|
      expect(subject).to respond_to meth
    end
  end

  it "doesn't include helper files that don't exist" do
    expect(File).not_to receive(:read).with "foo.txt"
    subject.helpers "foo.txt"
  end
end
