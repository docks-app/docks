module Docks
  module Containers
    module Common
      module Privacy
        # Public: Returns a boolean indicating whether the function is private.
        def private?; access == Docks::Types::Access::PRIVATE end

        # Public: Returns a boolean indicating whether the function is public.
        def public?; !private? end
      end
    end
  end
end
