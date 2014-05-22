class RenameUsersSkillsToUserSkills < ActiveRecord::Migration
	def self.up
        rename_table :users_skills, :user_skills
    end 
    def self.down
        rename_table :user_skills, :users_skills	
    end
end
