# SCSS

register :scss do
  extension 'scss'
  parser Docks::Parsers::SCSS
  type Docks::Types::Languages::STYLE
end
