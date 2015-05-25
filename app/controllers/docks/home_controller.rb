module Docks
  class HomeController < Docks::ApplicationController
    layout "docks/demo", only: [:demo]

    def index
    end

    def pattern
      Docks.parse

      pattern = Group.group_identifier(params[:pattern])
      @pattern = Cache.pattern_for(pattern)
      @pattern_library = Cache.pattern_library

      template = Docks.template_for(pattern)
      render template.path
    end

    def demo
      @demo = Cache.pattern_for(Group.group_identifier(params[:pattern])).demo_for(params[:demo])
      if @demo.nil?
        render(nothing: true)
      else
        template = Docks.template_for(:demo)
        render template.path, locals: { demo: @demo }
      end
    end
  end
end
