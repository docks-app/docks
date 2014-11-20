module Docks
  class Process
    @@post_processors = []

    # Public: Processes each key in the passed hash by passing
    # the key and value to `.process_tag`.
    #
    # parse_result - A Hash of tag-content pairs.
    #
    # Returns the processed Hash.

    def self.process(parse_result)
      parse_result.each do |tag, value|
        parse_result[tag] = process_tag(tag, value)
      end

      parse_result
    end


    # TODO

    def self.register_bundled_post_processors
      add_post_processors Docks::PostProcessors::MarkdownDescriptions,
                          Docks::PostProcessors::ReplaceHashesWithOpenStructs
    end

    def self.post_process(parse_results)
      @@post_processors.each do |post_processor|
        post_processor.post_process(parse_results)
      end

      parse_results
    end

    def self.post_processors
      @@post_processors
    end

    def self.clear_post_processors
      @@post_processors = []
    end


    def self.add_post_processors(*post_processors)
      post_processors.each_with_index do |post_processor, i|
        @@post_processors << post_processor unless @@post_processors.include?(post_processor)
      end

      @@post_processors
    end



    # Public: Runs all included processors for `tag` on `content` and retuns the
    # result. When only a single tag is allowed per block, the processors are
    # run directly on `content`. When a tag can be used multiple times (but only
    # once per line), the parsing yields an array of arrays (each representing one
    # declaration of the tag), so the processors are run on each second-level array.
    # When more than one tag can be used per line, the processors are run on each
    # second-level array and the result is concatenated to previous results
    # (allowing processors to return an array of results for any given line).
    #
    # tag     - A Symbol representing a tag.
    # content - The content that was parsed out for the tag.
    #
    # Returns the processed content (can vary depending on the result of running
    # the processors and on the multiplicity of the tags).

    def self.process_tag(tag, content)
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

    # Private: Calls each of the actions in `actions` on content.
    #
    # content - The content to be processed.
    # actions - An Array of Blocks to call on content.
    #
    # Returns the processed content.

    def self.process_content_with_actions(content, actions)
      actions.each { |action| content = action.call(content) if action.respond_to?(:call) }
      content
    end
  end
end
