module Docks
  module Processors
    extend self

    # Public: Processes the passed content by splitting it on commas,
    # spaces, and pipes (and removing associated whitespace).
    #
    # content - An Array or String representing the parsed result.
    #
    # Examples
    #
    #   split_on_commas_spaces_and_pipes("String, Array | Object")
    #   # => ["String", "Array", "Object"]
    #
    # Returns an Array of the split results.

    def split_on_commas_spaces_and_pipes(content)
      split_on_characters(content, [",", "|", "\s"])
    end

    def split_on_top_level_parens_commas_and_pipes(content)
      return content unless content.kind_of?(String)

      indexes = []
      depth = 0

      split_on = /[\|,]/
      content.chars.each_with_index do |char, index|
        if char == "("
          depth += 1
        elsif char == ")"
          new_depth = [0, depth - 1].max

          if new_depth == 0 && depth != 0
            indexes << index
          end

          depth = new_depth
        elsif split_on =~ char && depth == 0
          indexes << index
        end
      end


      result = []
      start_index = 0

      start_strip = /^\s*[,\|]*\s*/
      end_strip = /\s*[,\|]*\s*$/
      indexes.each do |index|
        if index > start_index
          item = content[start_index..index].gsub(start_strip, "").gsub(end_strip, "")
          result << item if item.length > 0
        end

        start_index = index + 1
      end

      if start_index < content.length
        result << content[start_index..-1].gsub(start_strip, "").gsub(end_strip, "")
      end

      result
    end

    # Public: Processes the passed content by splitting it on type-delimitting
    # symbols ({/} to declare the type, ,/|/\s to separate them).
    #
    # content - An Array or String representing the parsed result.
    #
    # Examples
    #
    #   split_types("{String, Array |Object}")
    #   # => ["String", "Array", "Object"]
    #
    # Returns an Array of types.

    def split_types(content)
      split_on_commas_spaces_and_pipes(content.gsub(/[\{\}]/, "").strip)
    end

    # Public: Processes the passed content splitting it on type-delimitting
    # symbols ({/} to declare the type, ,/|/\s to separate them).
    #
    # content  - The String to break apart.
    # split_on - The characters, passed as a single String or an Array of Strings,
    #            on which the content string should be split. Defaults to "\,\s".
    #
    # Examples
    #
    #   split_on_characters("String, Array", "\s\,")
    #   # => ["String", "Array"]
    #
    # Returns an Array with the split pieces.

    def split_on_characters(content, split_on="\,\s")
      return content unless content.kind_of?(String)

      split_on = split_on.join("") if split_on.kind_of?(Array)
      return content unless split_on.kind_of?(String)

      content.split(/[#{split_on}]/).select { |piece| piece.length > 0 }
    end

    # Public: Processes the passed String by converting it to a
    # boolean where any string other than one matching /false/
    # will be considered true.
    #
    # content - A String representing the parsed result.
    #
    # Examples
    #
    #   stringy_boolean("  false ")
    #   # => false
    #
    #   stringy_boolean("foo")
    #   # => true
    #
    # Returns a boolean version of the content.

    def stringy_boolean(content)
      return false if content.nil?
      return content unless content.kind_of?(String)
      !content.include?("false")
    end

    CODE_BLOCK_INDICATOR = "```"
    LIST_ITEM_INDICATOR = /^(?:\*|\-|\d+\.)/
    HEADING_INDICATOR = /^#+/
    HEADING_UNDERLINE_INDICATOR = /^[=\-]+/

    # Public: Processes the passed content by joining it with line breaks as required.
    # to create markdown-parsable paragraphs and code blocks.
    #
    # content - An Array representing the parsed result.
    # join    - The string with which to join two different paragraphs together.
    #
    # Examples
    #
    #   join_with_smart_line_breaks(["One paragraph that", "spans two lines.", "And another!"])
    #   # => "One paragraph that spans two lines.\n\nAnd another!"
    #
    #   join_with_smart_line_breaks(["One paragraph", "```html", "<p>A code block</p>", "```", "another paragraph."])
    #   # => "One paragraph.\n\n```html\n<p>A code block</p>\n```\n\nanother paragraph"
    #
    # Returns the processed string.

    def join_with_smart_line_breaks(content, join = "\n\n")
      return content unless content.kind_of?(Array)

      text = ""
      in_code_block = false
      in_list = false
      at_start_of_paragraph = true

      content.each_with_index do |line, index|
        stripped_line = line.strip

        if stripped_line.start_with?(CODE_BLOCK_INDICATOR)
          # Either the start or end of a code block
          if in_code_block
            in_code_block = false
            at_start_of_paragraph = true

            text << "\n#{line}#{join}"
          else
            in_code_block = true
            text << "#{join}#{line}"
          end

        elsif in_code_block || (in_list && stripped_line =~ LIST_ITEM_INDICATOR)
          # Either:
          # 1. In a code block — just keep appending lines, or
          # 2. Last item was a list item and this item is directly below it,
          #    so just add that line below.
          text << "\n#{line}"

        elsif stripped_line.length == 0
          # Empty line — new paragraph
          at_start_of_paragraph = true

          text << join

        elsif stripped_line =~ LIST_ITEM_INDICATOR && at_start_of_paragraph
          # Line that looks like a list item and we're ready for a new paragraph
          in_list = true
          at_start_of_paragraph = false

          text << line

        elsif stripped_line =~ HEADING_INDICATOR
          # Starts and ends a "## Header"-style heading
          at_start_of_paragraph = true
          text << "\n#{line}\n"

        elsif stripped_line =~ HEADING_UNDERLINE_INDICATOR
          # Ends a "Header\n======"-style heading
          at_start_of_paragraph = true
          text << "#{line}#{join}"

        elsif content[index + 1] && content[index + 1].strip =~ HEADING_UNDERLINE_INDICATOR
          # Start of a "Header\n======"-style heading
          text << "\n#{line}\n"

        elsif at_start_of_paragraph
          # New line at the start of a regular paragraph
          at_start_of_paragraph = false
          in_list = false

          text << line

        else
          # Line that isn't at the start of a paragraph — pin it to the previous line.
          text << " #{stripped_line}"
        end
      end

      text.strip!
      text.gsub!(/\n{3,}/, "\n\n")
      text.length > 0 ? text : nil
    end

    # Public: parses a string with names and optional parentheticals into an
    # array of hashes with the name as the `name_key` and the parsed
    # parenthetical options using the optional `default_for_parenthetical`.
    #
    # content     - The string with the name and optional parenthetical.
    # name_key    - An optional Symbol representing the key that should be
    #               used for the non-parenthetical portion. Defaults to :name.
    # default_key - An optional Symbol to be used as the default key for an
    #               unpaired item in the parentheses.
    #
    # Examples
    #
    #   name_and_parenthetical(':matches?', :setter)
    #   # => [{setter: ':matches?'}]
    #
    #   name_and_parenthetical(':size (SIZE::LARGE)', :setter, :constant)
    #   # => [{setter: ':size', constant: 'SIZE::LARGE'}]
    #
    #   name_and_parenthetical([':size (SIZE::LARGE)', ':checked?'], :setter, :constant)
    #   # => [{setter: ':size', constant: 'SIZE::LARGE'}, {setter: ':checked?'}]
    #
    # Returns the parsed hash.

    def name_and_parenthetical(content, name_key=:name, default_for_parenthetical=nil)
      result = {}
      match = content.match(/\s*(?<name>[^\(]*)(?:\s*\((?<paren>[^\)]*)\))?/)
      result[name_key] = match[:name].strip

      if (parenthetical = match[:paren]).nil?
        result
      else
        result.merge(parenthetical_options(parenthetical, default_for_parenthetical))
      end
    end

    # Public:
    #
    # content - A String of the parenthetical.
    # default - An optional Symbol representing the key that should be used if
    #           an un-paired value is provided.
    #
    # Examples
    #
    #   parenthetical_options('Activate with : foo , active : false')
    #   # => {activate_with: 'foo', active: 'false'}
    #
    #   parenthetical_options('select, active : false, javascript action: $(this).text(1 + 1)', :demo_type)
    #   # => {demo_type: 'select', active: 'false', javascript_action: '$(this).text(1 + 1)'}
    #
    # Returns the processed Hash.

    def parenthetical_options(content, default=nil)
      return content unless content.kind_of?(String)
      result, default_only = {}, true
      default = default.to_sym unless default.nil?
      # Strip leading and trailing parentheses
      content = content.strip.sub(/^\(/, '').sub(/\)$/, '')

      # Get a leading, un-keyed value. This will be set to the default
      # key (`default`), if it was passed
      content.sub!(/\s*([^,]*),?\s*/) do |match|
        if match.index(': ').nil?
          result[default] = $1.strip unless default.nil?
          ''
        else
          match
        end
      end

      # Cycle over key value pairs and add to the return Hash
      content.scan(/\s*(?<attribute>[^:]*):\s+(?<value>[^,]*),?\s*/).each do |match|
        default_only = false
        # Ensure that the key looks like a regular symbol
        result[match[0].strip.downcase.gsub(/\s+/, '_').to_sym] = match[1].strip
      end

      result
    end

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
    #   multiline_description(['bar', 'baz']) { |first_line| { foo: first_line } }
    #   # => { foo: 'bar', description: 'baz' }
    #
    #   multiline_description(['bar', 'Baz']) { |first_line| { foo: first_line, description: 'Already started!' } }
    #   # => { foo: 'bar', description: "Already started!\n\nBaz" }
    #
    # Returns the processed Hash.

    def multiline_description(content)

      content = Array(content)
      description = []
      item = nil

      content.each do |line|
        if item.nil?
          item = yield(line) if block_given?

          if !item.kind_of?(Hash)
            item = Hash.new
            description << line
          elsif !item[:description].nil?
            description << item.delete(:description)
          end
        else
          description << line
        end
      end

      unless item.nil?
        item[:description] = join_with_smart_line_breaks(description)
        item
      end
    end

    # Public: Processes the passed content by returning it if it's a valid
    # demo type, and otherwise returning the default demo type.
    #
    # content - A string representing the desired demo type.
    #
    # Examples
    #
    #   ensure_valid_demo_type(Docks::Types::Demo::SELECT)
    #   # => "select"
    #
    #   ensure_valid_demo_type("foo")
    #   # => "none"
    #
    # Returns the processed string.

    def ensure_valid_demo_type(content)
      @demo_types ||= Docks::Types::Demo.constants.map { |const| Docks::Types::Demo.const_get(const) }
      @demo_types.include?(content) ? content : Docks::Types::Demo::DEFAULT
    end

    # Public: Processes the passed content by splitting it on commas,
    # spaces, and pipes (and removing associated whitespace).
    #
    # content - An Array or String representing the parsed result.
    #
    # Examples
    #
    #   CodeBlockWithLanguage.process([ "html - The markup.",
    #                                   "<div class="foo">Bar</div>",
    #                                   "<div class="bar">Baz</div>" ])
    #   # => {language: "html", description: "The markup", code: "<div class=\"foo\">Bar</div>\n<div class=\"foo\">Bar</div>"}
    #
    #   CodeBlockWithLanguage.process([ "<div class="foo">Bar</div>",
    #                                   "<div class="bar">Baz</div>" ])
    #   # => {code: "<div class=\"foo\">Bar</div>\n<div class=\"foo\">Bar</div>"}
    #
    # Returns a Hash containing the language, description, and code block.

    def code_block_with_language_and_description(content)
      result = {}
      content = Array(content)
      possible_line_details = content.first.strip.split(/\s*\-\s*/, 2)

      if Docks::Languages.extensions.include?(possible_line_details.first)
        result[:language] = possible_line_details.first
        result[:description] = possible_line_details.last if possible_line_details.length > 1
        content.shift
      end

      result[:code] = content.join("\n")
      result
    end
  end
end
