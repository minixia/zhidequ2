class TagRelation < ActiveRecord::Base
  belongs_to :tag, :foreign_key => :tag_id
  belongs_to :related_tag, :class_name => "Tag", :foreign_key => :related_tag_id
end

class Tag < ActiveRecord::Base
  has_and_belongs_to_many :questions
  has_many :tag_relations, :foreign_key => :tag_id
  has_many :related_tags, :source => :related_tag, :through => :tag_relations, :foreign_key => :related_tag_id
  after_initialize :default_value

  private
    def default_value
      self.count ||= 0
    rescue ActiveModel::MissingAttributeError
      # this should only happen on Model.exists?() call. It can be safely ignored.
    end

  public
  def relate_to(tag)
    if(!TagRelation.find_by_tag_id_and_related_tag_id(self.id, tag.id))
      r = TagRelation.new
      r.tag = self
      r.related_tag = tag
      r.save
    else
      return "already related"
    end
  end

  def alias_names
    return TagAlias.where("tag_name like '#{self.name}'")
  end
end
