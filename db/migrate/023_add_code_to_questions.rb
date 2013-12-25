class AddCodeToQuestions < ActiveRecord::Migration
  def self.up
    add_column :questions, :code, :string
  end

  def self.down
    remove_column :questions, :code
  end
end
