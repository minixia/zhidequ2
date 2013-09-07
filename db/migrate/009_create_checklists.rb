class CreateChecklists < ActiveRecord::Migration
  def self.up
    create_table :checklists do |t|
      t.string :title
      t.string :name
      t.text :desc
      t.string :img
      t.string :category

      t.references :plan

      t.timestamps
    end
    add_index :checklists, :plan_id
  end

  def self.down
    drop_table :checklists
  end
end