class AddMorePropertiesToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :full_name, :string
  	add_column :users, :phone, :string
  	add_column :users, :date_of_birth, :date
  end
end
