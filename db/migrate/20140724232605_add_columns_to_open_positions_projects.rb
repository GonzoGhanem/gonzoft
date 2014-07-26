class AddColumnsToOpenPositionsProjects < ActiveRecord::Migration
  def change
  	add_column :open_positions_projects, :project_id, :integer
  	add_column :open_positions_projects, :position_id, :integer
  end
end
