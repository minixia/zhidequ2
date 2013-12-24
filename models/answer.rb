class Answer < ActiveRecord::Base
  after_initialize :default_value
  
  belongs_to :question
  belongs_to :account #replier
  
  validates :content, :presence => true
  validates :account_id, :presence => true
  
  private
    def default_value
      self.reply_at ||= Time.now
      self.votes ||= 0
    end
    
  public 
    def comments
      Comment.find(:all, :conditions => {:ref_type => "answer", :ref_id => self.id})
    end
end
