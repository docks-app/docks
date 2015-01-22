require 'spec_helper'

describe Docks::Builder do
  # subject { Docks::Build.new(File.join(File.dirname(__FILE__), '..', '..', 'lib', 'docks', 'template', 'docks_config.yml')) }

  # describe '.should_render_group?' do
  #   let(:files) { Dir[File.join(File.dirname(__FILE__), '..', 'fixtures', 'build', 'button', '*')] }
  #   let(:cache_file) { File.join(Docks::CACHE_DIR, Docks::Group.group_identifier(files.first).to_s) }

  #   before :all do
  #     Dir.chdir(File.join(File.dirname(__FILE__), '..', 'fixtures', 'build'))
  #     FileUtils.mkdir(Docks::CACHE_DIR) unless Dir.exists?(Docks::CACHE_DIR)
  #   end

  #   after :all do
  #     FileUtils.rm_rf(Docks::CACHE_DIR)
  #   end

  #   context 'no cache file exists' do
  #     it 'indicates that the group should be rendered' do
  #       expect(subject.should_render_group?(files)).to be true
  #     end
  #   end

  #   context 'a cache file older than the source group exists' do
  #     it 'indicates that the group should be rendered' do
  #       FileUtils.touch(cache_file, mtime: Time.now - 100)
  #       FileUtils.touch(files.first)
  #       expect(File.mtime(files.first)).to be > File.mtime(cache_file)
  #       expect(subject.should_render_group?(files)).to be true
  #     end
  #   end

  #   context 'a cache file newer than the source group exists' do
  #     it 'indicates that the group should not be rendered' do
  #       FileUtils.touch(cache_file, mtime: Time.now + 100)
  #       expect(File.mtime(files.first)).to be < File.mtime(cache_file)
  #       expect(subject.should_render_group?(files)).to be false
  #     end
  #   end
  # end
end
