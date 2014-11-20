require 'spec_helper'

describe Docks::Tags do
  subject { Docks::Tags }
  let(:example_tag) { :name }
  let(:example_synonyms) { [:nom, :nome] }

  before :each do
    subject.send(:clear_tags)
    Docks::Process.clear_post_processors
  end

  it 'correctly indicates that no tag exists when not previously registered' do
    expect(subject.has_tag?(example_tag)).to be false
  end

  it 'correctly registers a details hash when registering a tag' do
    subject.register(example_tag)

    expect(subject.has_tag?(example_tag)).to be true
    expect(subject.processors_for(example_tag).length).to eq 0
    expect(subject.multiple_allowed?(example_tag)).to be false
    expect(subject.multiple_per_line_allowed?(example_tag)).to be false
  end

  it 'correctly registers processors with a tag' do
    subject.register(example_tag) do
      process { |content| :foo! }
    end

    expect(subject.processors_for(example_tag).length).to eq 1
  end

  it 'correctly register post-processors with a tag' do
    subject.register(example_tag) do
      post_process Docks::PostProcessors::MarkdownDescriptions,
                   Docks::PostProcessors::ReplaceHashesWithOpenStructs
    end

    expect(Docks::Process.post_processors.length).to eq 2
    expect(Docks::Process.post_processors).to include(Docks::PostProcessors::MarkdownDescriptions)
    expect(Docks::Process.post_processors).to include(Docks::PostProcessors::ReplaceHashesWithOpenStructs)
  end

  it 'correctly retrieves details for synonyms' do
    subject.register(example_tag) do
      synonyms :nom, :nome
      process { |content| :foo! }

      multiple_per_line
    end

    example_synonyms.each do |synonym|
      expect(subject.has_tag?(synonym)).to be true
      expect(subject.processors_for(synonym).length).to eq 1
      expect(subject.multiple_allowed?(synonym)).to be true
      expect(subject.multiple_per_line_allowed?(synonym)).to be true
    end
  end

  it 'correctly registers the tag as being usable only once per file' do
    subject.register(example_tag) { one_per_file }
    expect(subject.only_one_per_file_allowed?(example_tag)).to be true
  end

  it 'correctly registers the tag as being usable multiple times per block' do
    subject.register(example_tag) { multiple_per_block }
    expect(subject.multiple_allowed?(example_tag)).to be true
    expect(subject.multiple_per_line_allowed?(example_tag)).to be false
  end

  it 'correctly registers the tag as being usable multiple times per line' do
    subject.register(example_tag) { multiple_per_line }
    expect(subject.multiple_allowed?(example_tag)).to be true
    expect(subject.multiple_per_line_allowed?(example_tag)).to be true
  end

  it 'correctly registers the tag as being a single line only' do
    subject.register(example_tag) { single_line }
    expect(subject.multiline?(example_tag)).to be false
  end

  it 'correctly prevents setting one per file when multiplicity has already been established' do
    subject.register(example_tag) {
      multiple_per_block
      one_per_file
    }
    expect(subject.multiple_allowed?(example_tag)).to be true
    expect(subject.only_one_per_file_allowed?(example_tag)).to be false
  end

  it 'correctly prevents setting multiplicity when one per file has already been established' do
    subject.register(example_tag) {
      one_per_file
      multiple_per_block
    }
    expect(subject.multiple_allowed?(example_tag)).to be false
    expect(subject.only_one_per_file_allowed?(example_tag)).to be true

    subject.register(example_tag) {
      one_per_file
      multiple_per_line
    }
    expect(subject.multiple_allowed?(example_tag)).to be false
    expect(subject.multiple_per_line_allowed?(example_tag)).to be false
    expect(subject.only_one_per_file_allowed?(example_tag)).to be true
  end

  it 'correctly joins together synonymous tags' do
    subject.register(:name) do
      synonyms :nom, :nome
    end


    nom = { nom: [[:foo]] }
    nome = { nome: [[:bar], [:baz]] }
    name = { name: [[:phew!]] }

    expect(subject.join_synonymous_tags(nom)[:name]).to eq nom[:nom]
    expect(subject.join_synonymous_tags(nome)[:name]).to eq nome[:nome]
    expect(subject.join_synonymous_tags(name)[:name]).to eq name[:name]
    expect(subject.join_synonymous_tags(nom.merge(nome))[:name]).to eq(nom[:nom] + nome[:nome])
    expect(subject.join_synonymous_tags(name.merge(nom))[:name]).to eq(name[:name] + nom[:nom])
  end

  describe '::extend' do
    it 'correctly extends synonyms' do
      subject.register(example_tag) do
        synonyms :nom
      end

      expect(subject.has_tag?(example_tag)).to be true
      expect(subject.has_tag?(:nom)).to be true
      expect(subject.has_tag?(:nome)).to be false

      subject.extend(example_tag) do
        synonyms :nome
      end

      expect(subject.has_tag?(example_tag)).to be true
      expect(subject.has_tag?(:nom)).to be true
      expect(subject.has_tag?(:nome)).to be true
    end

    it 'correctly extends processors' do
      subject.register(example_tag) do
        process { :foo! }
      end

      expect(subject.processors_for(example_tag).length).to eq 1

      subject.extend(example_tag) do
        process { :bar! }
      end

      expect(subject.processors_for(example_tag).length).to eq 2
    end

    it 'correctly extends post-processors' do
      subject.register(example_tag) do
        post_process Docks::PostProcessors::MarkdownDescriptions
      end

      expect(Docks::Process.post_processors.length).to eq 1

      subject.extend(example_tag) do
        post_process Docks::PostProcessors::ReplaceHashesWithOpenStructs
      end

      expect(Docks::Process.post_processors.length).to eq 2
    end

    it 'correctly extends :multiple_per_block' do
      subject.register(example_tag) {}
      expect(subject.multiple_allowed?(example_tag)).to be false
      subject.extend(example_tag) { multiple_per_block }
      expect(subject.multiple_allowed?(example_tag)).to be true
    end

    it 'correctly extends :multiple_per_line' do
      subject.register(example_tag) {}
      expect(subject.multiple_per_line_allowed?(example_tag)).to be false
      subject.extend(example_tag) { multiple_per_line }
      expect(subject.multiple_per_line_allowed?(example_tag)).to be true
    end

    it 'correctly extends :one_per_file' do
      subject.register(example_tag) {}
      expect(subject.only_one_per_file_allowed?(example_tag)).to be false
      subject.extend(example_tag) { one_per_file }
      expect(subject.only_one_per_file_allowed?(example_tag)).to be true
    end

    it 'correctly registers a tag when extend is used on an un-registered tag' do
      subject.extend(example_tag)
      expect(subject.has_tag?(example_tag))
    end

    it 'correctly extends when not immediately following the original register' do
      subject.register(example_tag) { process { |value| value } }
      expect(subject.has_tag?(example_tag)).to be true
      expect(subject.processors_for(example_tag).length).to eq 1

      subject.register(:foo) { synonyms :bar }

      subject.extend(example_tag) { process { |value| value * 2 } }
      expect(subject.has_tag?(example_tag)).to be true
      expect(subject.processors_for(example_tag).length).to eq 2
    end
  end
end
