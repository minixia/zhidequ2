class PlanIntro < ActiveRecord::Base
  belongs_to :plan
  has_many :plan_intro_chapters
end