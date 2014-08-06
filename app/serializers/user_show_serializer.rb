class UserShowSerializer < ActiveModel::Serializer
	root "user"
	attributes :id, :name, :email, :position_id, :phone, :full_name, :date_of_birth
	has_many :roles
end