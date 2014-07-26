class CreateAssignments < ActiveRecord::Migration
  def change
    create_table :assignments do |t|
      t.integer :user_id
      t.integer :open_position_id
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
