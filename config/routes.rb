Docks::Engine.routes.draw do
  root to: "pattern_library#index"

  match "/:pattern", as: "pattern",
                     to: "pattern_library#pattern",
                     via: [:get]
end
