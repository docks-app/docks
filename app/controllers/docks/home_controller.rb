module Docks
  class HomeController < Docks::ApplicationController
    layout "docks/demo", only: [:demo]

    def index
    end

    def pattern
      @name = params[:pattern]

      pattern = @name.gsub(/\-+/, "_")
      @pattern = Docks::Cache.pattern_for(pattern)
      @pattern_groups = Docks::Cache.pattern_groups

      render(Docks.template_for(pattern) || :pattern)
    end

    def demo
      @demo = Docks::Cache.pattern_for(params[:pattern].gsub(/\-+/, "_")).demo_for(params[:demo])

      if @demo.nil?
        render nothing: true
      end
    end
  end
end
