class Assignment < ActiveRecord::Base

	belongs_to :open_position
	belongs_to :user

	# validates.each :start_date, :end_date do |record, attr, value|
	# 	if	value < record.project.start_date || value > record.project.end_date
	# 		record.errors.add(attr, "Assignment must happen inside project dates")
	# 	end
	# end

end
