class Project < ActiveRecord::Base

	belongs_to :client
	has_many :open_positions
	has_many :assignments, through: :open_positions
	validates_uniqueness_of :name
	
	accepts_nested_attributes_for :open_positions
end
