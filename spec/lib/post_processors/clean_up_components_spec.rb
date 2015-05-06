require "spec_helper"

describe Docks::PostProcessors::CleanUpComponents do
  subject { Docks::PostProcessors::CleanUpComponents }

  it "does nothing on non-components" do
    func = { symbol_type: Docks::Types::Symbol::FUNCTION }
    expect { subject.post_process([func]) }.not_to change { func }
  end

  it "sets states and variants to empty arrays by default" do
    component = { symbol_type: Docks::Types::Symbol::COMPONENT }
    subject.post_process([component])
    expect(component[:state]).to eq []
    expect(component[:variant]).to eq []
  end

  it "does not overwrite existing states/ variants" do
    component = { symbol_type: Docks::Types::Symbol::COMPONENT, state: [:foo], variant: [:bar] }
    expect { subject.post_process([component]) }.not_to change { component }
  end
end
