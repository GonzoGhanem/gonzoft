class User < ActiveRecord::Base
	rolify
	# Include default devise modules. Others available are:
	# :token_authenticatable, :confirmable,
	# :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  	has_many :records, dependent: :destroy
  	has_many :user_skills
  	has_many :skills, :through => :user_skills

  	accepts_nested_attributes_for :roles, :user_skills

  	def updateRoles(new_role_id)
  		self.roles.delete_all
  		self.roles.push(Role.find(new_role_id))
  	end
end