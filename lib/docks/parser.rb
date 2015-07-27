module Docks
  class Parser
    def self.parse(files)
      files = Array(files).select { |file| File.exists?(file) }

      pattern = Containers::Pattern.new(name: Docks.pattern_id(files.first))
      pattern.files = files
      pattern.modified = files.map { |file| File.mtime(file) }.max

      files.each do |file|
        next unless parseable?(file)
        pattern.add(Languages.file_type(file), parse_file(file))
      end

      Process.process(pattern)
      pattern
    end

    def self.register(parser, options)
      match = options.delete(:for) || options.delete(:match)
      @custom_parsers.push(parser: parser, for: match)
    end

    def self.parse_block(content, language)
      store_current_details("foo.#{language}") do
        symbol = Docks.current_parser.parse_comment_block(content)
        Process.process(symbol)
      end
    end

    private

    def self.parseable?(file)
      File.exists?(file) && Languages.supported_file?(file) && !parser_for(file).nil?
    end

    def self.parser_for(file)
      parser = @custom_parsers.reverse_each.find { |custom_parser| custom_parser[:for] =~ file }

      if parser.nil?
        language = Languages.language_for(file)
        language.nil? ? nil : language.parser
      else
        parser[:parser].instance
      end
    end

    def self.parse_file(file)
      store_current_details(file) do
        symbols = Docks.current_parser.parse(file)
        symbols.map { |symbol| Process.process(symbol) }
      end
    end

    def self.store_current_details(file)
      Docks.current_file = file
      Docks.current_parser = parser_for(file)
      Docks.current_language = Languages.language_for(file)
      Docks.current_pattern = Docks.pattern_id(file)

      symbol = yield

      Docks.current_file = nil
      Docks.current_parser = nil
      Docks.current_language = nil
      Docks.current_pattern = nil

      symbol
    end

    def self.clean
      @custom_parsers = []
    end

    clean
  end

  def self.current_file; @current_file end
  def self.current_file=(file); @current_file = file end
  def self.current_language; @current_language end
  def self.current_language=(language); @current_language = language end
  def self.current_parser; @current_parser end
  def self.current_parser=(parser); @current_parser = parser end
  def self.current_pattern; @current_pattern end
  def self.current_pattern=(pattern); @current_pattern = pattern.to_s end
end
