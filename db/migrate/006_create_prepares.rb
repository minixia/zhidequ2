class CreatePrepares < ActiveRecord::Migration
  def self.up
    create_table :prepares do |t|
      t.string :phase
      t.string :action
      t.text :content

      t.references :plan

      t.timestamps
    end
    add_index :prepares, :plan_id
  end

  def self.down
    drop_table :prepares
  end
end