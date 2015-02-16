require "spec_helper"

describe Docks::Languages::Haml do
  subject { Docks::Languages::Haml.instance }

  describe ".extensions" do
    let(:extensions) { [subject.class.extensions].flatten }

    it "includes .haml as an extension" do
      expect(extensions).to include "haml"
    end
  end
end
