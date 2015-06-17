module Docks
  class HomeController < Docks::ApplicationController
    layout "docks/demo", only: [:demo]

    def index
    end

    def pattern
      Docks.parse

      pattern = Docks.pattern_id(params[:pattern])
      @pattern = Cache.pattern_for(pattern)
      @pattern_library = Cache.pattern_library

      template = Docks.template_for(pattern)
      render template.path
    end
  end
end
