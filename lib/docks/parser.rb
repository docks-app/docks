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

      Docks::Cache::PARSE_RESULT_TYPES.each do |parse_result_type|
        parsed_file_group[parse_result_type] = []
      end

      file_group.each do |file|
        # Do not process a file that is either a) does not have a supported extension
        # or b) does not exist
        next unless File.exists?(file)
        next unless Docks::Language.is_supported_file_type?(file)
        next unless is_parseable_file?(file)
        parsed_file_group[Docks::Language.file_type(file)].concat(parse_file(file))
      end

      fix_pattern_block(parsed_file_group)
      parsed_file_group
    end



    @@parsers = []

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
      @@current_file = pseudo_file
      setup_current_details

      return {} if Docks.current_parser.nil?
      result = Docks.current_parser.parse_comment_block(comment_block)
      result = Docks::Tag.join_synonymous_tags(result)
      result = Docks::Process.process(result)
      result = Docks::Process.post_process([results]).first if post_process

      @@current_file = nil
      teardown_current_details

      result
    end

    private

    def self.fix_pattern_block(parsed_file)
      pattern_result = Hash.new
      Docks::Cache::PARSE_RESULT_TYPES.each do |parse_result_type|
        new_pattern_result, parsed_file[parse_result_type] = parsed_file[parse_result_type].partition do |parse_result|
          parse_result[:symbol_type] == Docks::Types::Symbol::PAGE
        end

        pattern_result = new_pattern_result.first || pattern_result
      end

      parsed_file[:pattern] = pattern_result
    end

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
      @@current_file = file
      setup_current_details

      return [] if Docks.current_parser.nil?

      puts "Parsing #{file} with #{Docks.current_parser}"
      parse_results = Docks.current_parser.parse(File.read(file).gsub(/\r\n?/, "\n"))

      parse_results.map! do |parse_result|
        parse_result = Docks::Tag.join_synonymous_tags(parse_result)
        Docks::Process.process(parse_result)
      end

      result = Docks::Process.post_process(parse_results)

      @@current_file = nil
      teardown_current_details

      result
    end

    def self.setup_current_details
      Docks.current_file = @@current_file
      Docks.current_parser = parser_for(@@current_file)
      Docks.current_language = Docks::Language.language_for(@@current_file)
    end

    def self.teardown_current_details
      Docks.current_file = nil
      Docks.current_parser = nil
      Docks.current_language = nil
    end
  end

  def self.current_file; @@current_file end
  def self.current_file=(file); @@current_file = file end
  def self.current_language; @@current_language end
  def self.current_language=(language); @@current_language = language end
  def self.current_parser; @@current_parser end
  def self.current_parser=(parser); @@current_parser = parser end
end
