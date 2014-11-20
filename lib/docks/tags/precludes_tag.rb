# @precludes
# Symbols that should not be used in conjunction with this symbol.
#
# Multiple allowed.

register :precludes do
  multiple_per_line

  process do |content|
    content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
  end

  post_process Docks::PostProcessors::JoinOrphanedVariantsAndStates,
               Docks::PostProcessors::CleanUpVariantsAndStates,
               Docks::PostProcessors::MirrorPrecludes
end
