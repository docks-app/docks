module DocksHelpers
  def relative_asset_path(asset)
    (Docks.config.destination + asset).relative_path_from(Docks.current_template)
  end

  def stylesheet_link_tag(stylesheet)
    "<link rel='stylesheet' type='text/css' href='#{relative_asset_path File.join("styles", "#{stylesheet.split(".").first}.css")}'>"
  end

  def javascript_include_tag(script)
    "<script src='#{relative_asset_path File.join("scripts", "#{script.split(".").first}.js")}'></script>"
  end

  def spit_it_out(&block)
    concat capture(&block)
  end
end
