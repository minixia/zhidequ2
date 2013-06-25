# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 4) do

  create_table "plan_intro_chapters", :force => true do |t|
    t.string   "title",         :null => false
    t.string   "summary",       :null => false
    t.string   "image_url"
    t.integer  "order"
    t.integer  "plan_intro_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "plan_intro_chapters", ["plan_intro_id"], :name => "index_plan_intro_chapters_on_plan_intro_id"

  create_table "plan_intro_sections", :force => true do |t|
    t.string   "title",                                     :null => false
    t.text     "content",               :limit => 16777215, :null => false
    t.string   "image_url"
    t.string   "section_type"
    t.string   "duration"
    t.integer  "plan_intro_chapter_id"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
  end

  add_index "plan_intro_sections", ["plan_intro_chapter_id"], :name => "index_plan_intro_sections_on_plan_intro_chapter_id"

  create_table "plan_intros", :force => true do |t|
    t.string   "title",      :null => false
    t.string   "summary",    :null => false
    t.string   "image_url"
    t.integer  "plan_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "plan_intros", ["plan_id"], :name => "index_plan_intros_on_plan_id"

  create_table "plans", :force => true do |t|
    t.string   "title",          :null => false
    t.string   "summary",        :null => false
    t.string   "image_hero_url"
    t.string   "points"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

end
