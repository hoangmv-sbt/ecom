class CartItem < ApplicationRecord
  belongs_to :cart
  belongs_to :post
  validates :quantity, numericality: { greater_than: 0 }
end
