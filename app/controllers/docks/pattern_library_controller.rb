module Docks
  class PatternLibraryController < ::ApplicationController
    respond_to :html

    def pattern
      Docks.parse

      pattern = Docks.pattern_id(params[:pattern])
      @pattern = Cache.pattern_for(pattern)
      @pattern_library = Cache.pattern_library

      template = Docks.template_for(pattern)
      render(file: template.path, layout: template.layout)
    end
  end
end
