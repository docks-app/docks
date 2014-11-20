require 'spec_helper'

describe Docks::Languages do
  subject { Docks::Languages }
  before :each do
    subject.send(:clear_languages)
  end

  it 'correctly registers a language without a block' do
    subject.register :scss do extension 'scss' end
    subject.register :coffee
    subject.register :haml do extension 'haml' end

    expect(subject.extensions.length).to eq 2
  end

  describe 'registration details' do
    before :each do
      subject.register :scss do
        extension 'scss'
        parser Docks::Parsers::SCSS
        type Docks::Types::Languages::STYLE
      end

      subject.register :coffeescript do
        extension 'coffee'
        parser Docks::Parsers::CoffeeScript
        type Docks::Types::Languages::SCRIPT
      end

      subject.register :javascript do
        extension 'js'
        type Docks::Types::Languages::SCRIPT
      end
    end

    it 'correctly adds extensions when registering languages' do
      extensions = subject.extensions
      expect(extensions).to include('scss')
      expect(extensions).to include('coffee')
      expect(extensions).to_not include('html')
    end

    it 'correctly identifies filetypes that have been registered' do
      expect(subject.is_supported_file_type?(__FILE__)).to be false
      expect(subject.is_supported_file_type?('foo.scss')).to be true
      expect(subject.is_supported_file_type?('bar.min.js')).to be true
    end

    it 'correctly adds parsers when registering languages' do
      expect(subject.parser_for('foo.coffee')).to be Docks::Parsers::CoffeeScript
      expect(subject.parser_for('bar.scss')).to be Docks::Parsers::SCSS
      expect(subject.parser_for('baz.js')).to be nil
      expect(subject.parser_for('foo bar baz.m')).to be nil
    end

    it 'correctly returns the correct subset of extensions' do
      expect(subject.markup_extensions.length).to eq 0
      expect(subject.script_extensions.length).to eq 2
      expect(subject.script_extensions).to include('coffee')
      expect(subject.script_extensions).to include('js')
      expect(subject.style_extensions.length).to eq 1
      expect(subject.style_extensions).to include('scss')
    end

    it 'correctly identifies the type of file based on registered languages' do
      expect(subject.file_type('foo.coffee')).to eq Docks::Types::Languages::SCRIPT
      expect(subject.file_type('bar.min.js')).to eq Docks::Types::Languages::SCRIPT
      expect(subject.file_type('baz.scss')).to eq Docks::Types::Languages::STYLE
      expect(subject.file_type(__FILE__)).to be nil
    end
  end
end
