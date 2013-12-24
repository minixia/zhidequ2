class CreateTagRelations < ActiveRecord::Migration
  def change
    create_table :tag_relations do |t|
      t.string :tag_src
      t.string :tag_target
      t.string :relation_type

      t.timestamps
    end
  end
end
