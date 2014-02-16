class Feature < ActiveRecord::Base
  belongs_to :plan
  has_many :feature_details

end