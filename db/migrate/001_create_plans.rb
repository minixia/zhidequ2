class CreatePlans < ActiveRecord::Migration
  def self.up
    create_table :plans do |t|
      t.string :title, :null => false
      t.string :summary, :null =>false
      t.string :image_hero_url
      t.string :points

      t.timestamps
    end
  end

  def self.down
    drop_table :plans
  end
end
