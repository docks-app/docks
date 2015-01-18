require 'spec_helper'

describe Docks::Languages do
  subject { Docks::Languages }
  before :each do
    subject.send(:clear_languages)
  end

  it "registers all bundled languages" do
    subject.register_bundled_languages
  end
end
