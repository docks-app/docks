Docks::Engine.routes.draw do
  root to: 'home#index'
  get '/:name' => 'home#pattern'
  get '/demo/:pattern/:name' => 'home#demo'
end
