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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 10) do

  create_table "checklists", force: true do |t|
    t.string   "title"
    t.string   "name"
    t.text     "desc"
    t.string   "img"
    t.string   "category"
    t.integer  "plan_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "checklists", ["plan_id"], name: "index_checklists_on_plan_id", using: :btree

  create_table "feature_details", force: true do |t|
    t.string   "title",                       null: false
    t.text     "content",    limit: 16777215, null: false
    t.string   "img"
    t.integer  "feature_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "feature_details", ["feature_id"], name: "index_feature_details_on_feature_id", using: :btree

  create_table "features", force: true do |t|
    t.string   "category",   null: false
    t.string   "title",      null: false
    t.string   "img"
    t.integer  "order"
    t.integer  "plan_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "features", ["plan_id"], name: "index_features_on_plan_id", using: :btree

  create_table "fqas", force: true do |t|
    t.string   "question"
    t.text     "answer"
    t.string   "category"
    t.integer  "plan_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "fqas", ["plan_id"], name: "index_fqas_on_plan_id", using: :btree

  create_table "intros", force: true do |t|
    t.string   "title",      null: false
    t.string   "section"
    t.text     "content"
    t.integer  "plan_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "intros", ["plan_id"], name: "index_intros_on_plan_id", using: :btree

  create_table "plans", force: true do |t|
    t.string   "title",      null: false
    t.string   "sub_title",  null: false
    t.string   "points"
    t.string   "img"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "prepares", force: true do |t|
    t.string   "phase"
    t.string   "action"
    t.text     "content"
    t.integer  "plan_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "prepares", ["plan_id"], name: "index_prepares_on_plan_id", using: :btree

  create_table "schedules", force: true do |t|
    t.string   "day"
    t.string   "location"
    t.string   "action"
    t.string   "path"
    t.string   "start"
    t.string   "traffic_fee"
    t.string   "ticket_fee"
    t.string   "play_time"
    t.text     "desc"
    t.string   "start_time"
    t.string   "open_time"
    t.string   "official_site"
    t.string   "addr"
    t.text     "food"
    t.text     "shop"
    t.string   "img"
    t.text     "comment"
    t.integer  "plan_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "schedules", ["plan_id"], name: "index_schedules_on_plan_id", using: :btree

  create_table "summaries", force: true do |t|
    t.string   "title",      null: false
    t.text     "content",    null: false
    t.integer  "plan_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "summaries", ["plan_id"], name: "index_summaries_on_plan_id", using: :btree

  create_table "tips", force: true do |t|
    t.string   "title",      null: false
    t.string   "section"
    t.text     "content"
    t.integer  "plan_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tips", ["plan_id"], name: "index_tips_on_plan_id", using: :btree

end
