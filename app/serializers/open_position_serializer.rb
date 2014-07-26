class OpenPositionSerializer < ActiveModel::Serializer

	attributes :position_id

	has_many :assignments

end