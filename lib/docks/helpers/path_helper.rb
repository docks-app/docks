module Docks
  module Helpers
    module Path
      def docks_path(symbol, options = {})
        @path_cache ||= {}

        postfixed_symbol = "#{symbol}#{"-#{options[:language]}" if options.fetch(:language, false)}"
        return @path_cache[postfixed_symbol] unless @path_cache[postfixed_symbol].nil?

        if search_result = @pattern.find(symbol)
          @path_cache[postfixed_symbol] = "##{search_result.symbol_id}"
        elsif search_result = @pattern_library.find(symbol)
          @path_cache[postfixed_symbol] = relative_pattern_path(search_result.pattern.name, anchor: search_result.symbol.nil? ? nil : search_result.symbol.symbol_id)
        elsif path = Docks::SymbolSources.path_for(symbol, options)
          @path_cache[postfixed_symbol] = path
        end

        @path_cache[postfixed_symbol]
      end

      def relative_asset_path(asset)
        (Docks.config.destination + asset).relative_path_from(Docks.current_render_destination)
      end

      def stylesheet_link_tag(stylesheet)
        "<link rel='stylesheet' type='text/css' href='#{relative_asset_path File.join(Docks.config.asset_folders.styles, "#{stylesheet.split(".").first}.css")}'>"
      end

      def javascript_include_tag(script)
        "<script src='#{relative_asset_path File.join(Docks.config.asset_folders.scripts, "#{script.split(".").first}.js")}'></script>"
      end

      def compiled_style_tags
        content = Array(Docks.config.compiled_assets)
          .select { |asset| Docks::Languages.language_for(asset).kind_of?(Docks::Languages::CSS) && File.exists?(asset) }
          .map { |asset| stylesheet_link_tag(asset) }
          .join("\n")

        content.strip.empty? ? nil : content
      end

      def compiled_script_tags
        content = Array(Docks.config.compiled_assets)
          .select { |asset| Docks::Languages.language_for(asset).kind_of?(Docks::Languages::JavaScript) && File.exists?(asset) }
          .map { |asset| javascript_include_tag(asset) }
          .join("\n")

        content.strip.empty? ? nil : content
      end

      def pattern_path(pattern)
        pattern = pattern.name if pattern.kind_of?(Containers::Pattern)
        Docks.config.destination + File.join(pattern.to_s, "index.html")
      end

      private

      def relative_pattern_path(pattern, options = {})
        path = relative_asset_path(pattern_path(pattern)).to_s
        path << "##{options[:anchor]}" if options.fetch(:anchor, false)
        path
      end
    end
  end
end
