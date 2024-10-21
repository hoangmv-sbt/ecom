Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root to: 'posts#index'
  devise_for :users
  resources :posts 
  resources :users do
    resource :cart, only: [:show] # Đảm bảo chỉ định một resource để không cần thêm ID
  end
  resources :carts, only: [:show] do
    member do
      post 'add_post'
      patch 'update_quantity'
      delete 'remove_post'
    end
  end

end
