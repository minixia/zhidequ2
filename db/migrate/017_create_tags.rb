class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
      t.string :tag_type
      t.string :summary
      t.string :header_photo
      t.string :wiki
      t.integer :count

      t.timestamps
    end
    add_index :tags, :name
    
    create_table :questions_tags, :id => false do |t|
      t.integer :question_id
      t.integer :tag_id
    end
    add_index :questions_tags, :question_id
    add_index :questions_tags, :tag_id
    
  end
end
