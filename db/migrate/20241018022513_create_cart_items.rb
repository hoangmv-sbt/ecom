class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.references :cart, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.integer :quantity
      t.decimal :price, precision: 10, scale: 2 # Giá sản phẩm
      t.decimal :total_price, precision: 10, scale: 2 # Giá tổng cho mục này
      t.timestamps
    end
  end
end
