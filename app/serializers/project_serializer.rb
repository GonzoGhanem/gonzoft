class ProjectSerializer < ActiveModel::Serializer

	attributes :id, :name,:startdate,:enddate
	has_many :open_positions

end