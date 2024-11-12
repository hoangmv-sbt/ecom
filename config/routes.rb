Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root to: 'posts#index'
  devise_for :users
  resources :posts 
  resources :users
  resources :carts, only: [:index] do
    member do
      post 'add_post'
      patch 'update_quantity'
      delete 'remove_post'
    end
  end

  resources :orders do
    collection do
      post :confirm_order # Thêm route cho xác nhận đơn hàng
    end
  end

  resources :videos, only: [:new, :create, :show]

end
