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
        pathname = Pathname.new(stylesheet)
        path = if pathname.absolute?
          pathname.to_path
        else
          relative_asset_path(File.join(Docks.config.asset_folders.styles, "#{pathname.extname.length > 0 ? stylesheet.sub(/#{pathname.extname}$/, "") : stylesheet}.css"))
        end

        "<link rel='stylesheet' type='text/css' href='#{path}'>"
      end

      def docks_stylesheet(stylesheet = :main)
        return unless Docks.config.has_theme?
        postfix = (stylesheet.to_sym == :main ? "" : "-#{stylesheet.to_s}")
        stylesheet_link_tag("docks#{postfix}.css")
      end

      def docks_javascript(script = :main)
        return unless Docks.config.has_theme?
        postfix = (script.to_sym == :main ? "" : "_#{script.to_s}")
        javascript_include_tag("docks#{postfix}.js")
      end

      def javascript_include_tag(script)
        pathname = Pathname.new(script)
        path = if pathname.absolute?
          pathname.to_path
        else
          relative_asset_path(File.join(Docks.config.asset_folders.scripts, "#{pathname.extname.length > 0 ? script.sub(/#{pathname.extname}$/, "") : script}.js"))
        end

        "<script src='#{path}'></script>"
      end

      def compiled_style_tags
        content = Array(Docks.config.compiled_assets)
          .select { |asset| Docks::Languages.language_for(asset).kind_of?(Docks::Languages::CSS) }
          .map { |asset| stylesheet_link_tag(asset) }
          .join("\n")

        content.strip.empty? ? nil : content
      end

      def compiled_script_tags
        content = Array(Docks.config.compiled_assets)
          .select { |asset| Docks::Languages.language_for(asset).kind_of?(Docks::Languages::JavaScript) }
          .map { |asset| javascript_include_tag(asset) }
          .join("\n")

        content.strip.empty? ? nil : content
      end

      def pattern_path(pattern, options = {})
        pattern = pattern.name if pattern.kind_of?(Containers::Pattern)

        file = "index.html"
        file << "##{options[:anchor]}" if options.fetch(:anchor, false)

        Docks.config.destination + File.join(Docks.config.mount_at, pattern.to_s, file)
      end

      private

      def relative_pattern_path(pattern, options = {})
        path = relative_asset_path(pattern_path(pattern, options)).to_s
        path
      end
    end
  end
end
