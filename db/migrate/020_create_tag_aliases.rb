class CreateTagAliases < ActiveRecord::Migration
  def change
    create_table :tag_aliases do |t|
      t.string :tag_name
      t.string :tag_alias

      t.timestamps
    end
  end
end
