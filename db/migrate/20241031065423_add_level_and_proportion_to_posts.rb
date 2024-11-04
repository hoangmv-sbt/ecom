class AddLevelAndProportionToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :level, :string
    add_column :posts, :proportion, :string
  end
end
