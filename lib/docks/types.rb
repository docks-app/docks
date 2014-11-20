module Docks
  module Types
    module Symbol
      COMPONENT   = 'component'
      VARIANT     = 'variant'
      STATE       = 'state'
      MIXIN       = 'mixin'
      PLACEHOLDER = 'placeholder'
      FUNCTION    = 'function'
      VARIABLE    = 'variable'
      CLASS       = 'class'
      PAGE        = 'page'
    end

    module Access
      PUBLIC      = 'public'
      PRIVATE     = 'private'
    end

    module Demo
      SELECT      = 'select'
      JOINT       = 'joint'
      OWN         = 'own'
      NONE        = 'none'
      DEFAULT     = NONE
    end

    module Languages
      MARKUP      = :markup
      SCRIPT      = :script
      STYLE       = :style
      STUB        = :stub
    end
  end
end
