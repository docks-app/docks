module Docks
  class HomeController < Docks::ApplicationController
    layout "docks/demo", only: [:demo]

    def index
    end

    def pattern
      Docks.parse

      pattern = Group.group_identifier(params[:pattern])
      @pattern = Cache.pattern_for(pattern)
      @pattern_groups = Cache.pattern_groups

      render Docks.template_for(pattern)
    end

    def demo
      @demo = Cache.pattern_for(Group.group_identifier(params[:pattern])).demo_for(params[:demo])
      render(nothing: true) if @demo.nil?
    end
  end
end
