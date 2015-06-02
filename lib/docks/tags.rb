module Docks
  module Types
    module Tags
      ONE_PER_BLOCK      = :opb
      ONE_PER_FILE       = :opf
      MULTIPLE_PER_BLOCK = :mpb
      MULTIPLE_PER_LINE  = :mpl
    end
  end

  module Tags
    @@tags         = Hash.new
    @@synonyms     = Hash.new
    @@bundled_tags = nil

    def self.tag_for(tag)
      @@tags[base_tag_name(tag)]
    end

    def self.base_tag_name(tag)
      tag = tag.instance.name if tag.instance_of?(Class)
      tag = tag.name if tag.kind_of?(Base)
      tag = tag.to_sym
      @@synonyms[tag] || @@synonyms[tag.to_s.singularize.to_sym]
    end

    def self.register_bundled_tags
      bundled_tags.each { |tag| register(tag) }
    end

    def self.register(tag)
      tag = tag.instance
      tag.setup_post_processors

      return false if tag.name.nil?
      tag_name = tag.name.to_sym
      @@tags[tag_name] = tag

      [tag_name, tag.synonyms].flatten.each do |synonym|
        @@synonyms[synonym.to_sym] = tag_name
      end

      true
    end

    def self.join_synonymous_tags(hash)
      final_hash = {}
      hash.each do |tag, value|
        tag = tag.to_s.singularize.to_sym
        base_tag = @@synonyms[tag]

        next if base_tag.nil?

        if final_hash[base_tag].nil?
          # No previous result for this tag or its synonyms. This effectively
          # includes all non-multiple-allowed tags.
          begin
            final_hash[base_tag] = value.clone
          rescue TypeError
            final_hash[base_tag] = value
          end
        else
          # All tags that could have previously-included synonym tags must be
          # multiple-allowed tags. All multiple-allowed tags have new arrays
          # for each declared tag.
          final_hash[base_tag].concat(value)
        end
      end

      final_hash
    end

    def self.has_tag?(tag)
      !tag_for(tag).nil?
    end

    def self.supported_tags
      @@synonyms.keys
    end

    def self.supported_parseable_tags
      supported_tags.select { |tag| tag_for(tag).parseable? }
    end


    private

    def self.bundled_tags
      if @@bundled_tags.nil?
        bundled = constants.select do |const|
          klass = const_get(const)
          Class === klass && !(klass.eql?(Base))
        end

        @@bundled_tags = bundled.map { |const| const_get(const) }
      end

      @@bundled_tags
    end

    def self.clean
      @@tags = {}
      @@synonyms = {}
    end
  end
end
