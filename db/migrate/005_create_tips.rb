class CreateTips < ActiveRecord::Migration
  def self.up
    create_table :tips do |t|
      t.string :title, :null => false
      t.string :section
      t.text :content

      t.references :plan

      t.timestamps
    end
    add_index :tips, :plan_id
  end

  def self.down
    drop_table :tips
  end
end