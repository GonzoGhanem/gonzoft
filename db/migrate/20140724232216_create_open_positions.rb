class CreateOpenPositions < ActiveRecord::Migration
  def change
    create_table :open_positions_projects do |t|
      t.timestamps
    end
  end
end
