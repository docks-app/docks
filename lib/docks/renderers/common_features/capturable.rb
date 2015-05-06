module Docks
  module Renderers
    module Common

      # Public: adds the required methods for template languages that support
      # capturing and reusing blocks of content in the template.

      module Capturable
        @content_blocks = Hash.new

        # Public: captures a block. Inclusions of this Mixin must override
        # this method.
        #
        # block - The block of content to capture.
        #
        # Returns a String of the captured content.

        def capture(&block)
          raise NotImplementedError.new("You must implement a `capture` method.")
        end

        # Concatenates the `content` to the output buffer.
        #
        # content - The content to append.
        #
        # Returns the String of content passed.

        def concat(content)
          content
        end

        # Provides a named block to be reused later or, if only a name is
        # provided, retrieves the captured content.
        #
        # name  - The name of the captured block
        # block - The block of content to capture and store. If not provided,
        #         the method will instead retrieve and return a previously
        #         captured block named `name`, if one exists.
        #
        # Returns nothing (in the case of a block being provided) or the
        # previously-captured block by the passed `name`.

        def content_for(name, value = nil, &block)
          @content_blocks ||= Hash.new

          if block_given?
            @content_blocks[name] = capture(&block)
          elsif !value.nil?
            @content_blocks[name] = value
          else
            @content_blocks[name]
          end
        end

        # Checks whether a block named `name` has been captured.
        #
        # name - The block to check for.
        #
        # Returns a Boolean indicating whether the named block has been captured.

        def content_for?(name)
          !@content_blocks[name].nil?
        end
      end
    end
  end
end
