class CreateFeatures < ActiveRecord::Migration
  def self.up
    create_table :features do |t|
      t.string :category, :null => false
      t.string :title, :null =>false
      t.string :img
      t.integer :order

      t.references :plan
      t.timestamps
    end
    add_index :features, :plan_id
  end

  def self.down
    drop_table :features
  end
end