module Docks
  module Helpers
    module Github
      def has_github?
        !(Docks.config.github_repo.nil? || Docks.config.github_repo.empty? || @pattern.files.empty?)
      end

      def github_url(file)
        "#{github_root_url}/blob/master/#{url_encode(file).gsub("%2F", "/").sub(/^\//, "")}"
      end

      def github_issue_message
        root = Docks.config.root.to_s
        files = @pattern.files.map { |file| file.sub(root, "") }

        file_checklist = relative_pattern_files.map { |file| "- [#{@pattern.files.length == 1 ? "x" : " "}] [#{file}](#{github_url(file)})" }.join("\n")
        "\n\n\n---\n\nThis issue is related to the following files:\n\n#{file_checklist}"
      end

      def relative_pattern_files
        @relative_pattern_files ||= @pattern.files.map { |file| file.sub(Docks.config.root.to_s, "") }
      end

      def github_root_url
        @github_root_url ||= Docks.config.github_repo.sub(/(.)\/?$/, '\1')
      end
    end
  end
end
