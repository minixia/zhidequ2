class Question < ActiveRecord::Base
  after_initialize :default_value

  belongs_to :account #asker
  has_and_belongs_to_many :tags
  has_many :answers

  validates :title, :presence => true
  validates :account_id, :presence => true

  self.per_page = 10

  def tag(name, type = nil)
    tag = Tag.find_by_name(name)
    if(!tag.nil?)
      if(!self.tags.exists?(tag))
        self.tags << tag
        tag.count += 1
        tag.save!
      end
    else
      alias_tag = TagAlias.find_by_tag_alias(name)
      if(!alias_tag.nil?)
        self.tag(alias_tag.tag_name)
      else
        tag = Tag.new
        tag.name = name
        tag.tag_type = type
        tag.count = 1
        tag.save!
        self.tags << tag
      end
    end
  end

  def untag(tag)
    self.tags.delete(tag)
    tag.count -= 1
    tag.save!
  end

  def view(ip)
    if QuestionView.count(:conditions=>{:question_id => self.id, :ip => ip}) == 0
      qv = QuestionView.new
      qv.question = self
      qv.ip = ip
      qv.save!
      self.update_attribute('views', self.views + 1)
    end
  end

  def self.list(tags, order)
    main_tags = []
    tags.each{|tag|
      alias_tag = TagAlias.find_by_tag_alias(tag)
      if (alias_tag)
        main_tags << alias_tag.tag_name
      else
        main_tags << tag
      end
    }
    main_tags_cond = main_tags.uniq.to_s.tr('[]', '').tr('"', '\'')
    return Question.from("questions where not exists (select id from tags where tags.name in (#{main_tags_cond}) and not exists (select * from questions_tags as qt where qt.question_id=questions.id and qt.tag_id = tags.id))").order(order)
  end

  private

    def default_value
      self.asked_at ||= Time.now
      self.views ||= 0
      self.votes ||= 0
      self.followers ||= 0
    end

end
