class AddLogoToAccounts < ActiveRecord::Migration
  def self.up
    add_column :accounts, :logo, :string
  end

  def self.down
    remove_column :accounts, :logo
  end
end
