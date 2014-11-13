module Docks
  class Process
    def process_tag(tag, content)
      actions = Docks::Tags.processors_for(tag.to_sym)
      return content unless actions.kind_of?(Array)

      if Docks::Tags.multiple_per_line_allowed?(tag)
        # Multiple allowed per block, and each line may contain
        # more than one result.
        result = []
        content.each do |item|
          new_results = Array(process_content_with_actions(item, actions))
          result.concat(new_results)
        end

        result
      elsif Docks::Tags.multiple_allowed?(tag)
        # Multiple allowed per block, but each was created with a
        # separate tag.
        content.map do |item|
          process_content_with_actions(item, actions)
        end
      else
        # Only one allowed per block.
        process_content_with_actions(content, actions)
      end
    end

    private

    def process_content_with_actions(content, actions)
      actions.each { |action| content = action.call(content) if action.respond_to?(:call) }
      content
    end
  end
end
