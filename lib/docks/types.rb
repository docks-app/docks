module Docks
  module Types
    module Symbol
      COMPONENT   = "component"
      VARIANT     = "variant"
      STATE       = "state"
      MIXIN       = "mixin"
      PLACEHOLDER = "placeholder"
      FUNCTION    = "function"
      VARIABLE    = "variable"
      CLASS       = "class"
      PATTERN     = "pattern"
      DEMO        = "demo"
    end

    module Access
      PUBLIC      = "public"
      PRIVATE     = "private"
    end

    module Demo
      SELECT      = "select"
      JOINT       = "joint"
      OWN         = "own"
      NONE        = "none"
      HIDDEN      = NONE
      DEFAULT     = SELECT
    end

    module Languages
      MARKUP      = :markup
      SCRIPT      = :script
      STYLE       = :style
      STUB        = :stub
      DESCRIPTION = :description
    end
  end
end
