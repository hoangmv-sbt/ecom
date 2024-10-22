Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root to: 'posts#index'
  devise_for :users
  resources :posts 
  resources :users # do
     # resource :carts # Đảm bảo chỉ định một resource để không cần thêm ID
    # get 'users/:user_id/cart', to: 'carts#show', as: 'user_cart'

  # end
  resources :carts, only: [:index] do
    member do
      post 'add_post'
      patch 'update_quantity'
      delete 'remove_post'
    end
  end

end
