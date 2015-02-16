require "spec_helper"

describe Docks::Languages::ERB do
  subject { Docks::Languages::ERB.instance }

  describe ".extensions" do
    let(:extensions) { [subject.class.extensions].flatten }

    it "includes .erb as an extension" do
      expect(extensions).to include "erb"
    end
  end
end
