class AddQuantityToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :quantity, :integer
  end
end
