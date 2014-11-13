module Docks
  module Processors
    class PossibleMultilineDescription
      # Public: Processes the passed content by yielding to the passed
      # block in order to create a base hash, then adding any subsequent
      # lines to the description (which can start on the first line — just
      # set the description part as the returned hash's :description key.
      # The description is then joined with smart line breaks.
      #
      # Yields the first line (item) of content.
      #
      # content - An Array of Strings representing the multiline description.
      #
      # Examples
      #
      #   PossibleMultilineDescription.process(['bar', 'baz']) { |first_line| { foo: first_line } }
      #   # => { foo: 'bar', description: 'baz' }
      #
      #   PossibleMultilineDescription.process(['bar', 'Baz']) { |first_line| { foo: first_line, description: 'Already started!' } }
      #   # => { foo: 'bar', description: "Already started!\n\nBaz" }
      #
      # Returns the processed Hash.

      def self.process(content)
        return content unless block_given?

        content = Array(content)
        description = []
        item = nil

        content.each do |line|
          if item.nil?
            item = yield(line)
            return content unless item.kind_of?(Hash)

            # Put the description portion of the returned hash in the
            # description container
            description << item.delete(:description) unless item[:description].nil?
          else
            description << line
          end
        end

        item[:description] = JoinWithSmartLineBreaks.process(description)
        item
      end
    end
  end
end
