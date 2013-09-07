class CreateFeatureDetails < ActiveRecord::Migration
  def self.up
    create_table :feature_details do |t|
      t.string :title, :null => false
      # set limit 64k+1 to force column type longtext
      t.text :content, :null =>false , :limit => 64.kilobytes + 1
      t.string :img

      t.references :feature

      t.timestamps
    end
    add_index :feature_details, :feature_id
  end

  def self.down
    drop_table :feature_details
  end
end