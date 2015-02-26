require "set"

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



    # Public: Runs all registered post-processors on the passed content.
    #
    # parse_results - The content on which to run the post-processors. This should
    #                 be an Array of Hashes for post-processors conforming to
    #                 Docks::PostProcessors::Base to function correctly.
    #
    # Returns the processed content.

    def self.post_process(parse_results)
      @@post_processors.each do |post_processor|
        post_processor.post_process(parse_results)
      end

      parse_results
    end



    # Public: Add the passed post-processors to the list of post-processors
    # that are to be executed, if it does not already exist.
    #
    # post_processors - One or more classes conforming to Docks::PostProcessors::Base.
    #
    # Returns an Array of post-processors (which should each be a class reference)
    # showing the new (full) list of registered post-processors.

    def self.add_post_processors(*post_processors)
      post_processors.each do |post_processor|
        @@post_processors << post_processor unless @@post_processors.include?(post_processor)
      end

      @@post_processors
    end



    # Public: Registers all post-processors bundled with the gem.
    # Returns nothing.

    def self.register_bundled_post_processors
      add_post_processors Docks::PostProcessors::AssociateExternalMarkupFiles,
                          Docks::PostProcessors::AssociateExternalStubFiles,
                          Docks::PostProcessors::AssociateExternalDescriptionFiles,
                          Docks::PostProcessors::AddExtraMetadata,
                          Docks::PostProcessors::CleanUpHelperAndMarkup,
                          Docks::PostProcessors::MarkdownDescriptions,
                          Docks::PostProcessors::JoinSubcomponentsToBaseComponent,
                          Docks::PostProcessors::ReplaceHashesWithOpenStructs
    end



    # Public: Gets all registered post-processors.
    # Returns an Array of post-processors (which should each be a class reference).

    def self.post_processors
      @@post_processors
    end



    # Public: Clears all registered post-processors.
    # Returns nothing.

    def self.clear_post_processors
      @@post_processors = []
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
      tag = Docks::Tag.tag_for(tag.to_sym)
      return content unless tag

      if tag.multiple_per_line_allowed?
        # Multiple allowed per block, and each line may contain
        # more than one result.
        content.inject([]) do |results, item|
          results.concat(tag.process(item))
        end

      elsif tag.multiple_allowed?
        # Multiple allowed per block, but each was created with a
        # separate tag.
        content.map do |item|
          tag.process(item)
        end

      else
        # Only one allowed per block.
        tag.process(content)
      end
    end
  end
end
