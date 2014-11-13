# CoffeeScript

register :coffeescript do
  extension 'coffee'
  parser Docks::Parsers::CoffeeScript
  type Docks::Types::Languages::SCRIPT
end
