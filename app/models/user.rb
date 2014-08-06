class User < ActiveRecord::Base
	rolify

	devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  	has_many :records, dependent: :destroy
  	has_many :user_skills
    has_many :assignments
    has_many :open_positions, through: :assignments
  	has_many :skills, :through => :user_skills

    belongs_to :position

  	accepts_nested_attributes_for :roles, :user_skills

    validates_uniqueness_of :name, :email

end