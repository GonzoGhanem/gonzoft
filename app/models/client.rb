class Client < ActiveRecord::Base
	validates_uniqueness_of :name, :message => "Client name must be unique!"
end
