class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         #:confirmable
  # has_many :posts
  has_many :posts, dependent: :destroy
  # has_one :cart, dependent: :destroy
  has_many :carts, dependent: :destroy
  has_many :orders, dependent: :destroy
  after_create :create_cart
  def admin?
    self.admin
  end
  private

  def create_cart
    create_cart!
  end
end
