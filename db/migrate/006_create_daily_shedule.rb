class CreateDailySchedules < ActiveRecord::Migration
  def self.up
    create_table :daily_schedule do |t|
      t.references :schedule

      t.string :action
      t.string :from
      t.string :path
      t.string :fee
      t.string :arrive_time
      t.string :intro_url
      t.text :comment

      t.timestamps
    end
    add_index :daily_schedules, :schedule_id
  end

  def self.down
    drop_table :plan_intros
  end
end