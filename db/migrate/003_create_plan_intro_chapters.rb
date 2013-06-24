class CreatePlanIntroChapters < ActiveRecord::Migration
  def self.up
    create_table :plan_intro_chapters do |t|
      t.string :title, :null => false
      t.string :summary, :null =>false
      t.string :image_url
      t.integer :order

      t.references :plan_intro

      t.timestamps
    end
    add_index :plan_intro_chapters, :plan_intro_id
  end

  def self.down
    drop_table :plan_intro_chapters
  end
end