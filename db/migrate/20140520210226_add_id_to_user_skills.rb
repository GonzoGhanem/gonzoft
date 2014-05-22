class AddIdToUserSkills < ActiveRecord::Migration
	def self.up
		add_column :user_skills, :id, :primary_key
	end

	def self.down
		remove_column :user_skills, :id
	end
end
