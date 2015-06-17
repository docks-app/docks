require "spec_helper"
require_relative "../../lib/generators/docks/install/install_generator"

describe Docks::Generators::InstallGenerator do
  subject { described_class.new([], options) }
  let(:options) { {} }
end
