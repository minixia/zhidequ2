class CreateSchedules < ActiveRecord::Migration
  def self.up
    create_table :schedules do |t|
      t.string :day
      t.string :location
      t.string :action
      t.string :path
      t.string :start
      t.string :traffic_fee
      t.string :ticket_fee
      t.string :play_time
      t.text :desc
      t.string :start_time
      t.string :open_time
      t.string :official_site
      t.string :addr
      t.text :food
      t.text :shop
      t.string :img
      t.text :comment

      t.references :plan

      t.timestamps
    end
    add_index :schedules, :plan_id
  end

  def self.down
    drop_table :schedules
  end
end