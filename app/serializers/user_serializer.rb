class UserSerializer < ActiveModel::Serializer

  # def role_id
  # 	object.roles.first.id
  # end

  attributes :id, :name, :email, :position_id
  has_many :roles, :user_skills

end