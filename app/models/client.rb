class Client < ActiveRecord::Base
	validates_uniqueness_of :name, :message => "Client name must be unique!"

	def name=(s)
		write_attribute(:name, s.to_s.titleize) # The to_s is in case you get nil/non-string
	end

	def information=(s)
		write_attribute(:information, s.to_s.capitalize)
	end

	def address=(s)
		write_attribute(:address, s.to_s.capitalize)
	end
	
	def city=(s)
		write_attribute(:city, s.to_s.titleize)
	end

	def state=(s)
		write_attribute(:state, s.to_s.titleize)
	end

	def country=(s)
		write_attribute(:country, s.to_s.titleize)
	end
end
