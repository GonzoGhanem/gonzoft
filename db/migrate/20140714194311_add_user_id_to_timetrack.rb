class AddUserIdToTimetrack < ActiveRecord::Migration
  def change
    add_column :timetracks, :user_id, :integer
  end
end
