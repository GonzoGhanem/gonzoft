class CreateTimetracks < ActiveRecord::Migration
  def change
    create_table :timetracks do |t|
      t.string :time
      t.string :time
      t.string :day
      t.string :date
      t.string :weekday
      t.string :type
      t.string :client_name
      t.string :project_name
      t.integer :hours
      t.string :notes
      t.string :isExtra

      t.timestamps
    end
  end
end
