class CreatePlanIntroSections < ActiveRecord::Migration
  def self.up
    create_table :plan_intro_sections do |t|
      t.string :title, :null => false
      # set limit 64k+1 to force column type longtext
      t.text :content, :null =>false , :limit => 64.kilobytes + 1
      t.string :image_url
      t.string :type

      t.references :plan_intro_chapter

      t.timestamps
    end
    add_index :plan_intro_sections, :plan_intro_chapter_id
  end

  def self.down
    drop_table :plan_intro_sections
  end
end