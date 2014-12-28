require 'singleton'

module Docks
  class SingletonClass
    include Singleton

    def self.cattr_reader(*syms)
      syms.flatten.each do |sym|
        module_eval(<<-EOS, __FILE__, __LINE__)
          unless defined? @@#{sym}
            @@#{sym} = nil
          end
          def self.#{sym}
            @@#{sym}
          end
          def #{sym}
            @@#{sym}
          end
        EOS
      end

      syms
    end

    def self.cattr_writer(*syms)
      syms.flatten.each do |sym|
        module_eval(<<-EOS, __FILE__, __LINE__)
          unless defined? @@#{sym}
            @@#{sym} = nil
          end
          def self.#{sym}=(obj)
            @@#{sym} = obj
          end
          def #{sym}=(obj)
            @@#{sym}=(obj)
          end
        EOS
      end

      syms
    end

    def self.cattr_accessor(*syms)
      cattr_reader(*syms) + cattr_writer(*syms)
    end
  end
end
