class Timetrack < ActiveRecord::Base
  validates_uniqueness_of :day_id
  #belongs_to :user, :client, :project

end