class AddCodeToPlans < ActiveRecord::Migration
  def self.up
    add_column :plans, :code, :string
  end

  def self.down
    remove_column :plans, :code
  end
end
