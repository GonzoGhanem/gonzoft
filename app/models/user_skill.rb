class UserSkill < ActiveRecord::Base

	belongs_to :user
	belongs_to :skill

	def self.find_by_id_or_create(id, &block)
		obj = UserSkill.find_by_id( id ) || UserSkill.new
		yield obj
		# obj.save
	end
end