class RenameTypeOftimetrack < ActiveRecord::Migration
  def change
    rename_column :timetracks, :type, :day_type
  end
end
