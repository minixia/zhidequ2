class CreateSchedules < ActiveRecord::Migration
  def self.up
    create_table :schedule do |t|
      t.integer :day, :null => false

      t.references :plan

      t.timestamps
    end
    add_index :schedules, :plan_id
  end

  def self.down
    drop_table :plan_intros
  end
end