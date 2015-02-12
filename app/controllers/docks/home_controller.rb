module Docks
  class HomeController < Docks::ApplicationController
    layout "docks/demo", only: [:demo]

    def index
    end

    def pattern
      pattern = params[:pattern].gsub(/\-+/, "_")
      @pattern = Docks::Containers::Pattern.for(pattern)
      @pattern_groups = Docks::PatternGroup.new

      render(Docks.template_for(pattern) || :pattern)
    end

    def demo
      @demo = Docks::Containers::Pattern.for(params[:pattern].gsub(/\-+/, "_")).demo_for(params[:demo])
    end
  end
end
