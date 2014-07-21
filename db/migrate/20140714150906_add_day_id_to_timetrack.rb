class AddDayIdToTimetrack < ActiveRecord::Migration
  def change
    add_column :timetracks, :day_id, :string
  end
end
