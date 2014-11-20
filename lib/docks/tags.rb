module Docks
  class Tags
    @@table      = {}
    @@details    = {}


    # Public: Registers all tags bundled with the gem.
    # Returns nothing.

    def self.register_bundled_tags
      Dir[File.join(File.dirname(__FILE__), 'tags/*.rb')].each do |file|
        self.class_eval(File.read(file))
      end
    end


    # Public: Registers a tag. This will overwrite any previously registered
    # tags of the same name. A new, default details Hash will be created for the
    # symbol. By default, no processors or post-processors are assumed, and
    # the tag is assumed to be usable once per block.
    #
    # tag - The tag to register.
    #
    # Yields nothing to the passed block, but the block will be evaluated
    # in the context of this class and, as such, have access to all the private
    # registration methods (::synonyms, ::process, ::post_process,
    # ::multiple_per_line, ::multiple_per_block, and ::one_per_file).
    #
    # Returns nothing.

    def self.register(tag, &block)
      tag = tag.to_sym
      @@table[tag] = @@current_tag = tag

      @@details[tag] = @@current_details = {
        multiple_per_line:  false,
        multiple_per_block: false,
        one_per_page:       false,
        multiline:          true,
        processors:         []
      }

      self.class_eval(&block) if block_given?
    end


    # Public: identical to ::register, but will add processors, post-processors,
    # synonyms and usage information to the tag if it is already defined (rather
    # than overwrite it as register will).
    #
    # tag - The tag to extend.
    #
    # Yields nothing to the passed block, but the block will be evaluated
    # in the context of this class and, as such, have access to all the private
    # registration methods (::synonyms, ::process, ::post_process,
    # ::multiple_per_line, ::multiple_per_block, and ::one_per_file).
    #
    # Returns nothing.

    def self.extend(tag, &block)
      tag = tag.to_sym
      @@table[tag] ||= tag
      @@current_tag = tag

      @@details[tag] ||= {
        multiple_per_line:  false,
        multiple_per_block: false,
        one_per_page:       false,
        multiline:          true,
        processors:         []
      }
      @@current_details = @@details[tag]

      self.class_eval(&block) if block_given?
    end



    # Public: Joins together keys in a hash based on the synonym relationships
    # established during tag registering. Any keys that were synonyms with
    # some base key will be joined together in a new hash with their key being
    # the base key.
    #
    # parse_result - A Hash that is to be re-hashed based on synonyms of its keys.
    #
    # Returns the new Hash.

    def self.join_synonymous_tags(parse_result)
      final_parse_result = {}
      parse_result.each do |tag, value|
        base_tag = @@table[tag]
        if final_parse_result[base_tag].nil?
          # No previous result for this tag or its synonyms.
          # This effectively includes all non-multiple-allowed tags.
          final_parse_result[base_tag] = value.clone
        else
          # All tags that could have previously-included synonym tags
          # must be multiple-allowed tags. All multiple-allowed tags
          # have new arrays for each declared tag.
          final_parse_result[base_tag].concat(value)
        end
      end

      final_parse_result
    end


    # Public: Retrieve the list of processors for a given tag.
    #
    # tag - The tag whose processors you want to retrieve. Synonymous tags
    # share a single processor store, so calling this method on each yields the
    # same result.
    #
    # Returns an Array of blocks (if processors were found) or nil if the tag
    # is not registered.

    def self.processors_for(tag)
      details_for(tag)[:processors]
    end



    # Public: Check whether the passed tag can be used multiple times per block.
    #
    # tag - The tag whose status you want to retrieve. Synonymous tags
    # share a single set of details, so calling this method on each yields the
    # same result.
    #
    # Returns a Boolean indicating whether or not the tag can be used multiple
    # times per block.

    def self.multiple_allowed?(tag)
      details_for(tag)[:multiple_per_block]
    end


    # Public: Check whether the passed tag can be used multiple times per line.
    #
    # tag - The tag whose status you want to retrieve. Synonymous tags
    # share a single set of details, so calling this method on each yields the
    # same result.
    #
    # Returns a Boolean indicating whether or not the tag can be used multiple
    # times per line.

    def self.multiple_per_line_allowed?(tag)
      details_for(tag)[:multiple_per_line]
    end


    # Public: Check whether the passed tag can be used only once per file.
    #
    # tag - The tag whose status you want to retrieve. Synonymous tags
    # share a single set of details, so calling this method on each yields the
    # same result.
    #
    # Returns a Boolean indicating whether or not the tag can be used only once
    # per file.

    def self.only_one_per_file_allowed?(tag)
      details_for(tag)[:one_per_page]
    end


    # Public: Check whether the passed tag can have multiline content.
    #
    # tag - The tag whose status you want to retrieve. Synonymous tags
    # share a single set of details, so calling this method on each yields the
    # same result.
    #
    # Returns a Boolean indicating whether or not the tag can have multine comments.

    def self.multiline?(tag)
      details_for(tag)[:multiline]
    end


    # Public: Check whether the passed tag has been registered. This also checks
    # whether the tag has been declared as a synonym for another tag.
    #
    # tag - The tag whose presence you want to check.
    #
    # Returns a Boolean indicating whether or not the tag has been registered.

    def self.has_tag?(tag)
      @@table.key?(tag.to_sym)
    end


    # Public: Gets all of the tags that have been registered.
    # Returns an Array of Symbols representing the supported tags.

    def self.supported_tags
      @@table.keys
    end



    def self.to_s
      inspect
    end

    def self.inspect
      "#Tags{#{@@table.to_s}}"
    end



    private

    # Private: Retrieves the details Hash for a given tag. This will also
    # retrieve the base key details when a synonym tag is passed.
    #
    # tag - The tag whose detials you want to retrieve.
    #
    # Returns a Hash of the tag's details, or an empty hash if the tag was not found.

    def self.details_for(tag)
      tag = tag.to_sym
      @@details[@@table[tag]] || {}
    end


    # Private: Clears all registered tags.
    # Returns nothing.

    def self.clear_tags
      @@table   = {}
      @@details = {}
    end


    # Private: Registers all passed tags as synonyms for the tag that is
    # currently being registered/ extended.
    #
    # synonym_tags - One or more tags to register as synonyms.
    #
    # Returns nothing.

    def self.synonyms(*synonym_tags)
      synonym_tags.each do |tag|
        @@table[tag] = @@current_tag
      end
    end


    # Private: Marks the currently registered tag as being usable multiple times
    # per line (that is, there can be multiple instances of a tag delimited in some
    # way on a single line). This will also set the tag to be usable multiple times
    # per block. Neither of the above will take effect if the tag has already been
    # set to be usable only once per page.
    #
    # Returns nothing.

    def self.multiple_per_line
      unless @@current_details[:one_per_page]
        @@current_details[:multiple_per_line]  = true
        @@current_details[:multiple_per_block] = true
      end
    end


    # Private: Marks the currently registered tag as being usable multiple times
    # per block. This will not take effect if the tag has already been set to be
    # usable only once per page.
    #
    # Returns nothing.

    def self.multiple_per_block
      @@current_details[:multiple_per_block] = true unless @@current_details[:one_per_page]
    end


    # Private: Marks the currently registered tag as being usable only once per
    # page. This will not take effect if the tag has already been set to be
    # usable multiple times.
    #
    # Returns nothing.

    def self.one_per_file
      @@current_details[:one_per_page] = true unless @@current_details[:multiple_per_block]
    end


    # Private: Marks the currently registered tag as being a single line comment
    # (that is, any lines after this comment will not be appended to it).
    #
    # Returns nothing.

    def self.single_line
      @@current_details[:multiline] = false
    end


    # Private: Registers a block to be called when processing the tag.
    #
    # block - The block to register for future processing operations.
    #
    # Returns nothing.

    def self.process(&block)
      @@current_details[:processors] << block
    end


    # Private: Registers one or more post-processing classes (conforming to
    # Docks::PostProcessors::Base) to be used to post-process a file when
    # that tag exists in one of the file's blocks..
    #
    # post_processors - One or more post-processor classes.
    #
    # Returns nothing.

    def self.post_process(*post_processors)
      Docks::Process.add_post_processors(*post_processors)
    end
  end
end
