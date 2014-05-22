class UserSkillSerializer < ActiveModel::Serializer
  attributes :id, :years, :skill_id, :user_id
  
  has_one :skill, :serializer => ShortSkillSerializer

end