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
      @name = params[:name]
    end

    private

    def parse
      Docks::Builder.build
    end
  end
end
