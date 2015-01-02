# YAML

register :yaml do
  extension 'yml'
  stub_loader { |file| YAML::load_file(file) }
  type Docks::Types::Languages::STUB
end
