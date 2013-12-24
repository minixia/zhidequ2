class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :title
      t.text :content
      t.integer :views
      t.integer :followers
      t.integer :votes
      t.boolean :verified, :default => true
      t.boolean :anonymously, :default => false
      t.references :account
      t.datetime :asked_at
      t.datetime :last_voted_at
      t.datetime :last_reply_at
      t.datetime :last_changed_at

      t.timestamps
    end
    add_index :questions, :title
    add_index :questions, :votes
    add_index :questions, :account_id
    add_index :questions, :asked_at
  end
end
