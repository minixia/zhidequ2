class Comment < ActiveRecord::Base
  belongs_to :account
  after_initialize :default_value
  
  private
    
    def default_value
      self.comment_at ||= Time.now
    end
    
end
