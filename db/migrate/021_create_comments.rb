class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :ref_id
      t.string :ref_type
      t.datetime :comment_at
      t.references :account

      t.timestamps
    end
    add_index :comments, :ref_id
    add_index :comments, :account_id
  end
end
