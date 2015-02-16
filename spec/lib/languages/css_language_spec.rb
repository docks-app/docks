require "spec_helper"

describe Docks::Languages::CSS do
  subject { Docks::Languages::CSS.instance }

  describe ".extensions" do
    let(:extensions) { [subject.class.extensions].flatten }

    it "includes .css as an extension" do
      expect(extensions).to include "css"
    end
  end
end
