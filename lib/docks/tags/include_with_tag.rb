# @include_with
# Another symbol with which this symbol should be included.
#
# Multiple allowed.

register :include_with do
  multiple_per_line

  process do |content|
    content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
  end

  post_process Docks::PostProcessors::JoinOrphanedVariantsAndStates,
               Docks::PostProcessors::CleanUpVariantsAndStates,
               Docks::PostProcessors::MirrorPrecludes
end
