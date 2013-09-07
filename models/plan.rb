class Plan < ActiveRecord::Base
  has_many :summaries
  has_many :features
  has_many :tips
  has_many :prepares
  has_many :schedules
  has_many :fqas
  has_many :checklists
end