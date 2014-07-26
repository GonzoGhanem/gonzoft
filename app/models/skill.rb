class Skill < ActiveRecord::Base

  	has_many :user_skills, dependent: :destroy
  	has_many :users, :through => :user_skills

	validates_uniqueness_of :name

end
