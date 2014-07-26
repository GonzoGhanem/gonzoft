class ShowClientSerializer < ActiveModel::Serializer

  # def role_id
  # 	object.roles.first.id
  # end
	attributes :id, :name,:information,:phone,:state,:address,:city

end