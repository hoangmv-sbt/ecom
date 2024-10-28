class Post < ApplicationRecord
  belongs_to :user
  has_one_attached :image
  has_many :order_items, dependent: :destroy
  has_many :cart_items, dependent: :destroy
  validates :name, presence: true
  validates :describe, presence: true
  validates :image, presence: true
  validates :price, numericality: { only_integer: true, greater_than_or_equal_to: 0, message: "phải là số nguyên" }
  validates :price, length: { maximum: 10, message: "không được vượt quá 10 chữ số" }
  def self.ransackable_attributes(auth_object = nil)
    ["name"]
  end
end
