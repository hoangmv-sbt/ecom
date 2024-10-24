class Order < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :address, presence: true
  
  belongs_to :user
  has_many :order_items, dependent: :destroy
end
