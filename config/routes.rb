Docks::Engine.routes.draw do
  root to: "home#index"

  match "/:pattern", as: "pattern",
                     to: "home#pattern",
                     via: [:get]

  match "/demo/:pattern/:demo", as: "pattern_demo",
                                to: "home#demo",
                                via: [:get]
end
