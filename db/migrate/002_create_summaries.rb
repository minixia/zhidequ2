class CreateSummaries < ActiveRecord::Migration
  def self.up
    create_table :summaries do |t|
      t.string :title, :null => false
      t.text :content, :null =>false

      t.references :plan

      t.timestamps
    end
    add_index :summaries, :plan_id
  end

  def self.down
    drop_table :summaries
  end
end