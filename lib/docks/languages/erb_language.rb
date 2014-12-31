# CoffeeScript

register :coffeescript do
  extension 'erb'
  parser Docks::Parsers::ERB
  type Docks::Types::Languages::MARKUP
end
