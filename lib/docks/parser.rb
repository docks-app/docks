module Docks
  class Parser

    def self.current_file
      @@current_file
    end

    # Public: Processes each file in a group of files. Each file is individually
    # run through `.parse_file`, and the results are grouped based on the file
    # type of each (markup, script, or style parse results). The result also
    # includes a list of all files in the group and the name of the file group.
    #
    # file_group - An Array of file names as Strings.
    #
    # Returns the parsed file group as a Hash.

    def self.parse_group(file_group)
      parsed_file_group = {
        files: file_group,
        name: Docks::Group.group_identifier(file_group.first)
      }
      parsed_file_group[Docks::Types::Languages::MARKUP] = []
      parsed_file_group[Docks::Types::Languages::SCRIPT] = []
      parsed_file_group[Docks::Types::Languages::STYLE] = []

      file_group.each do |file|
        # Do not process a file that is either a) does not have a supported extension
        # or b) does not exist
        next unless File.exists?(file)
        next unless Docks::Language.is_supported_file_type?(file)
        next unless is_parseable_file?(file)
        parsed_file_group[Docks::Language.file_type(file)].concat(parse_file(file))
      end

      parsed_file_group
    end



    @@parsers = []

    def self.register_parsers_for_bundled_languages
      Docks::Languages.bundled_languages.each do |language|
        next unless language.parser
        register(language.parser, extensions: language.extensions)
      end
    end

    def self.register(parser, options)
      return if !options[:extensions] && !options[:matches]
      options[:matches] = /\.(#{[options[:extensions]].flatten.join("|")})$/ if options[:extensions]
      @@parsers << { parser: parser, matcher: options[:matches] }
    end

    def self.is_parseable_file?(file)
      !parser_for(file).nil?
    end

    def self.parse_comment_block(comment_block, language, post_process = false)
      pseudo_file = "foo.#{language.to_s}"
      parser = parser_for(pseudo_file)
      return {} if parser.nil?
      @@current_file = pseudo_file
      result = parser.parse_comment_block(comment_block)
      result = Docks::Tag.join_synonymous_tags(result)
      result = Docks::Process.process(result)
      result = Docks::Process.post_process([results]).first if post_process
      @@current_file = nil
      result
    end

    private

    def self.parser_for(file)
      @@parsers.reverse_each do |parser_details|
        return parser_details[:parser].instance if parser_details[:matcher] =~ file
      end

      nil
    end



    # Private: Parses and processes a single file. First, the file is read
    # and line endings normalized. The file is then parsed by the parser for
    # that file extension, then has all synonymous tags joined together,
    # then has all of the tag-specific processors run on it. Finally,
    # the required post processors are run on the full parse result and
    # it is returned.
    #
    # file - The file name as a String.
    #
    # Returns the parsed file group as an Array of Hashes.

    def self.parse_file(file)
      parser = parser_for(file)
      return [] if parser.nil?

      puts "Parsing #{file} with #{parser}"
      parse_results = parser.parse(File.read(file).gsub(/\r\n?/, "\n"))

      @@current_file = file

      parse_results.map! do |parse_result|
        parse_result = Docks::Tag.join_synonymous_tags(parse_result)
        Docks::Process.process(parse_result)
      end

      result = Docks::Process.post_process(parse_results)
      @@current_file = nil
      result
    end
  end
end
