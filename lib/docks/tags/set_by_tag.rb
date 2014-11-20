# @set_by
# Name of method or attribute by which the state/ variant is set,
# followed by an (optional) parenthesis containing the required
# constant or value required.

register :set_by do
  multiple_per_line

  process do |content|
    content = Docks::Processors::BreakApartOnCommasAndPipes.process(content)
    content = Docks::Processors::NameAndParenthetical.process(content, :setter, :constant)
    Docks::Processors::ReplaceHashWithOpenStruct.process(content)
  end

  post_process Docks::PostProcessors::JoinOrphanedVariantsAndStates,
               Docks::PostProcessors::CleanUpVariantsAndStates,
               Docks::PostProcessors::MirrorPrecludes
end
