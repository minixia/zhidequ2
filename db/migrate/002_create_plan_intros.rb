class CreatePlanIntros < ActiveRecord::Migration
  def self.up
    create_table :plan_intros do |t|
      t.string :title, :null => false
      t.string :summary, :null =>false
      t.string :image_url

      t.references :plan

      t.timestamps
    end
    add_index :plan_intros, :plan_id
  end

  def self.down
    drop_table :plan_intros
  end
end