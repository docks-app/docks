module Docks
  @pattern_id = lambda do |filename|
    File.basename(filename).split('.').first.split(/(\-\-|__)/).first.sub(/^_+/, '').gsub(/(\s|\-|_)+/, '_')
  end

  def self.pattern_id(filename = nil, &block)
    return nil unless filename.kind_of?(String)
    @pattern_id.call(filename)
  end

  def self.pattern_id=(block)
    return if block.call("foo").nil?
    @pattern_id = block
  end

  class Grouper
    def self.group(globs)
      files = file_list_from_globs(globs)
      groups = {}
      return groups if files.empty?

      # Cycle through all files identified by the glob, then assign them to
      # the group matching their group ID.
      files.each do |filename|
        if should_include_file?(filename)
          identifier = Docks.pattern_id(filename)
          groups[identifier] ||= []
          groups[identifier] << filename
        end
      end

      groups
    end

    def self.source_files_of_type(type)
      return @source_files_by_type[type] unless @source_files_by_type.nil?

      files = {}
      files[Docks::Types::Languages::MARKUP] = []
      files[Docks::Types::Languages::STYLE] = []
      files[Docks::Types::Languages::SCRIPT] = []
      files[Docks::Types::Languages::STUB] = []
      files[Docks::Types::Languages::DESCRIPTION] = []

      file_list_from_globs(Docks.config.sources).each do |filename|
        files[Docks::Languages.file_type(filename)] << filename
      end

      @source_files_by_type = files
      @source_files_by_type[type]
    end



    private

    def self.should_include_file?(filename)
      Docks::Languages.extensions.include?(File.extname(filename)[1..-1]) &&
        !filename.include?('.min.')
    end

    def self.file_list_from_globs(globs)
      Array(globs).map { |glob| Dir.glob(glob) }.flatten
    end
  end
end
