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

    module Tag
      ONE_PER_BLOCK      = :opb
      ONE_PER_FILE       = :opf
      MULTIPLE_PER_BLOCK = :mpb
      MULTIPLE_PER_LINE  = :mpl
    end

    module Access
      PUBLIC      = "public"
      PRIVATE     = "private"
    end

    module Demo
      SELECT      = "select"
      JOINT       = "joint"
      NONE        = "none"
      DEFAULT     = NONE
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
