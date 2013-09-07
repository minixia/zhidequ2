class CreatePlans < ActiveRecord::Migration
  def self.up
    create_table :plans do |t|
      t.string :title, :null => false
      t.string :sub_title, :null =>false
      t.string :points
      t.string :img

      t.timestamps
    end
  end

  def self.down
    drop_table :plans
  end
end
