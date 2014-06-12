class SkillSerializer < ActiveModel::Serializer
	
	def user_count
		object.users.count
	end

  	attributes :id, :name, :description, :user_count

end
