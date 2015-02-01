module Docks
  class Tag

    @@tags = {}
    @@synonyms = {}


    # Public: Returns the tag class instance associated with the passed tag
    # name, either because it is the base tag name or a synonym of that name.
    #
    # tag - The name of that tag whose object you would like to retrieve.
    #
    # Returns an instance of the registered tag class if the passed tag name
    # is registered, otherwise returns nil.

    def self.tag_for(tag)
      @@tags[default_tag_name(tag)]
    end


    # Public: Returns the base tag name associated with this name. That is, it
    # returns the base tag for any synonymous tags that were registered along
    # with it.
    #
    # tag - The name (Symbol or String) of the tag for which you would like to
    # retrieve the base tag name.
    #
    # Returns the base tag name as a Symbol, or nil if no tag has the passed
    # name.

    def self.default_tag_name(tag)
      @@synonyms[tag.to_sym]
    end


    # Public: Registers all tags bundled with Docks (that is, every tag under
    # Docks::Tags except for the base tag).
    #
    # Returns an Array of Symbols where each symbol is the name of a
    # registered tag or the name of a synonym of a registered tag.

    def self.register_bundled_tags
      Docks::Tags.bundled_tags.each do |tag|
        register(tag)
      end
    end


    # Public: Registers a tag for use in parsing documentation. This will add
    # the tag and its synonyms as usable tag names that, when a line of
    # documentation is prefixed with "@#{tag_name}", will invoke this tag to
    # process the results.
    #
    # tag - The tag Class that should be registered. This Class should inherit
    # from Docks::Tags::Base.
    #
    # Returns a Boolean indicating whether or not the tag was registered.

    def self.register(tag)
      tag = tag.instance
      tag_name = tag.name.to_sym
      @@tags[tag_name] = tag

      [tag_name, tag.synonyms].flatten.each do |synonym|
        @@synonyms[synonym.to_sym] = tag_name
      end

      Docks::Process.add_post_processors(*tag.post_processors)
      true
    end


    # Public: Joins together keys in a hash based on the synonym relationships
    # established during tag registering. Any keys that were synonyms with
    # some base key will be joined together in a new hash with their key being
    # the base key.
    #
    # parse_result - A Hash that is to be re-hashed based on synonyms of its
    # keys.
    #
    # Returns the new Hash.

    def self.join_synonymous_tags(parse_result)
      final_parse_result = {}
      parse_result.each do |tag, value|
        base_tag = @@synonyms[tag] || tag

        if final_parse_result[base_tag].nil?
          # No previous result for this tag or its synonyms. This effectively
          # includes all non-multiple-allowed tags.
          final_parse_result[base_tag] = value.clone
        else
          # All tags that could have previously-included synonym tags must be
          # multiple-allowed tags. All multiple-allowed tags have new arrays
          # for each declared tag.
          final_parse_result[base_tag].concat(value)
        end
      end

      final_parse_result
    end


    # Public: Check whether the passed tag has been registered. This also
    # checks whether the tag has been declared as a synonym for another tag.
    #
    # tag - The tag whose presence you want to check; either a Symbol of the
    # tag name or the tag Class.
    #
    # Returns a Boolean indicating whether or not the tag has been registered.

    def self.has_tag?(tag)
      tag = tag.instance.name unless tag.is_a?(Symbol)
      @@synonyms.key?(tag.to_sym)
    end


    # Public: Gets all of the tags that have been registered.
    # Returns an Array of Symbols representing the supported tags.

    def self.supported_tags
      @@synonyms.keys
    end


    private

    # Private: Clears our all tags.
    # Returns nothing.

    def self.clear_tags
      @@tags = {}
      @@synonyms = {}
    end

  end
end
