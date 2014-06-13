class UserCreateSerializer < ActiveModel::Serializer

  # def role_id
  # 	object.roles.first.id
  # end

  attributes :id, :name, :email, :password
  has_many :roles, :user_skills

end
