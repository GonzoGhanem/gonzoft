class UserSerializer < ActiveModel::Serializer

  attributes :id, :name, :email, :position_id, :phone, :full_name, :date_of_birth
  has_many :roles, key: :roles_attributes

end