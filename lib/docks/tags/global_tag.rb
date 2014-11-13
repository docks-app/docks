# The post-processors that apply to all tags.

register_globals do
  post_process Docks::PostProcessors::ReplaceHashesWithOpenStructs,
               Docks::PostProcessors::MarkdownDescriptions
end
