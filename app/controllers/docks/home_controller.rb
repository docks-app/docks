module Docks
  class HomeController < Docks::ApplicationController
    layout "docks/demo", only: [:demo]

    def index
    end

    def pattern
      @pattern = Docks::Containers::Pattern.for(params[:pattern])
      @pattern_groups = Docks::PatternGroup.new

      render(Docks.template_for(params[:pattern]) || :pattern)
    end

    def demo
      @demo = Docks::Containers::Pattern.for(params[:pattern]).demo_for(params[:demo])
    end
  end
end
