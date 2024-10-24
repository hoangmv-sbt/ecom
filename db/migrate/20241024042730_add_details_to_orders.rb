class AddDetailsToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :name, :string
    add_column :orders, :email, :string
    add_column :orders, :address, :text
  end
end
