class PlanIntroChapter < ActiveRecord::Base
  belongs_to :plan_intro
  has_many :plan_intro_sections

end