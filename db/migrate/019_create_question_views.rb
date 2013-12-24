class CreateQuestionViews < ActiveRecord::Migration
  def change
    create_table :question_views do |t|
      t.references :question
      t.string :ip

      t.timestamps
    end
    add_index :question_views, :question_id
    add_index :question_views, :ip
  end
end
