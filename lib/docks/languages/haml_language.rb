# Haml

register :haml do
  extension 'haml'
  parser Docks::Parsers::Haml
  type Docks::Types::Languages::MARKUP
end
