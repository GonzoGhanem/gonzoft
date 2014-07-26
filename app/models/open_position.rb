class OpenPosition < ActiveRecord::Base
	self.table_name = "open_positions_projects"

	belongs_to :project
	belongs_to :position
	has_many :assignments
	has_many :users, through: :assignments
	

	accepts_nested_attributes_for :assignments
end
