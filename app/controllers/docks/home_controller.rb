module Docks
  class HomeController < Docks::ApplicationController
    def index
    end
    helper_method :index

    def pattern
      @name = params[:name]
      @pattern = Docks::Pattern.for(@name)
      @pattern_groups = Docks::PatternGroup.new
    end

    def demo
      @pattern = params[:pattern]
      @name = params[:name]
      @demo = Docks::Pattern.for(@pattern).demo_for(@name)
    end
  end
end
