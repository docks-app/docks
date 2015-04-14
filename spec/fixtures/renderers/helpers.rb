module Helpers2
  def helper2
    "baz bar foo"
  end

  def helper3
    render "with_locals", foo: "bar"
  end
end

module Helpers
  def helper
    "foo bar baz"
  end
end
