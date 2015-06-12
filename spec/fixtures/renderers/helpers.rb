module Helpers2
  class Thing
    def one
      "thing one"
    end

    def two
      "thing two"
    end
  end

  def helper2
    "baz bar foo"
  end

  def helper3
    render inline: "BAR"
  end

  def helper4(&block)
    concat "foo #{capture(&block).strip}!"
  end

  def helper5
    Thing.new.one
  end

  def helper6(spit_back, &block)
    concat capture(spit_back, &block)
  end
end

module Helpers
  def helper
    "foo bar baz"
  end
end
