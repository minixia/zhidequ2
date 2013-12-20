class CreateIntros < ActiveRecord::Migration
  def self.up
    create_table :intros do |t|
      t.string :title, :null => false
      t.string :section
      t.text :content

      t.references :plan

      t.timestamps
    end
    add_index :intros, :plan_id
  end

  def self.down
    drop_table :intros
  end
end
