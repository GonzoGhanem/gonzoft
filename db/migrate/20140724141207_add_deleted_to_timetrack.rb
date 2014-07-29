class AddDeletedToTimetrack < ActiveRecord::Migration
  def change
    add_column :timetracks, :deleted, :boolean
  end
end
