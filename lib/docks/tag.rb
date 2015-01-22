module Docks
  class Tag
    @@tags = {}
    @@synonyms = {}

    def self.tag_for(tag)
      @@tags[default_tag_name(tag)]
    end

    def self.default_tag_name(tag)
      @@synonyms[tag.to_sym]
    end

    def self.register_bundled_tags
      Docks::Tags.bundled_tags.each do |tag|
        register(tag)
      end
    end

    def self.register(tag)
      tag = tag.instance
      tag_name = tag.name.to_sym
      @@tags[tag_name] = tag

      [tag_name, tag.synonyms].flatten.each do |synonym|
        @@synonyms[synonym.to_sym] = tag_name
      end

      Docks::Process.add_post_processors(*[tag.post_processors].flatten)
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
        # TODO: test for when tag isn't in table
        base_tag = @@synonyms[tag] || tag
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


    # Public: Check whether the passed tag has been registered. This also checks
    # whether the tag has been declared as a synonym for another tag.
    #
    # tag - The tag whose presence you want to check.
    #
    # Returns a Boolean indicating whether or not the tag has been registered.

    def self.has_tag?(tag)
      @@synonyms.key?(tag.to_sym)
    end


    # Public: Gets all of the tags that have been registered.
    # Returns an Array of Symbols representing the supported tags.

    def self.supported_tags
      @@synonyms.keys
    end

    private

    def self.clear_tags
      @@tags = {}
      @@synonyms = {}
    end

  end
end
