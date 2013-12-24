class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.text :content
      t.integer :votes
      t.references :question
      t.references :account
      t.datetime :reply_at

      t.timestamps
    end
    add_index :answers, :question_id
    add_index :answers, :account_id
  end
end
