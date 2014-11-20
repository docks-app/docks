module Docks
  class Parse

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
        next unless Docks::Languages.is_supported_file_type?(file)
        parsed_file_group[Docks::Languages.file_type(file)].concat(parse_file(file))
      end

      parsed_file_group
    end



    private

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
      parser = Docks::Languages.parser_for(file)
      parse_results = parser.parse(File.read(file).gsub(/\r\n?/, "\n"))
      parse_results.map! do |parse_result|
        parse_result = Docks::Tags.join_synonymous_tags(parse_result)
        Docks::Process.process(parse_result)
      end

      Docks::Process.post_process(parse_results)
    end
  end
end
