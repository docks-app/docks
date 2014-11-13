module Docks
  class Process
    def initialize
      @processors = {}
    end

    def register(processor, *params)
      params.each do |param|
        if Docks::SUPPORTED_PARAMS.include?(param.to_s)
          @processors[param] ||= []
          @processors[param] << processor
        end
      end
    end

    def process(parsed_file)
      return nil if parsed_file.nil?
      parsed_file.each_key do |key|
        parsed_file[key] = process_param parsed_file[key], key
      end

      parsed_file
    end

    private

    def process_param(content, param)
      processed = content

      unless @processors[param].nil?
        @processors[param].each do |processor|
          processed = processor.process processed
        end
      end

      processed
    end
  end

  class Process2
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
