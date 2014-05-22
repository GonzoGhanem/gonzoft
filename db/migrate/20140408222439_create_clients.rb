class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :name
      t.string :information
      t.string :phone
      t.string :state
      t.string :address
      t.string :city

      t.timestamps
    end
  end
end
