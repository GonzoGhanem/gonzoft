class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :roles, :user_skills

end
