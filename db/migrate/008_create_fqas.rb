class CreateFqas < ActiveRecord::Migration
  def self.up
    create_table :fqas do |t|
      t.string :question
      t.text :answer
      t.string :category

      t.references :plan

      t.timestamps
    end
    add_index :fqas, :plan_id
  end

  def self.down
    drop_table :fqas
  end
end