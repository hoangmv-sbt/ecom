class AddSoldQuantityToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :sold_quantity, :integer, default: 0
  end
end
