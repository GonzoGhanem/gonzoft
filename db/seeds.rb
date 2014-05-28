# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Record.create(data: 'Some secure data...')
User.delete_all
Role.delete_all
Client.delete_all
Skill.delete_all
Role.create(name: 'admin')
Role.create(name: 'staff')
Role.create(name: 'employee')
User.create(name: 'Gonzadmin', email: 'ghanemgo@gmail.com', password: '123456').add_role(:admin)
User.create(name: 'admin', email: 'admin@admin.com', password: '123456').add_role(:admin)
User.create(name: 'Staff1', email: 'staff1@gmail.com', password: '123456').add_role(:staff)
User.create(name: 'staff2', email: 'staff2@gmail.com', password: '123456').add_role(:staff)
User.create(name: 'employee', email: 'employee@gmail.com', password: '123456').add_role(:staff)

['.Net', 'Ruby', 'HTML', 'CSS', 'Java', 'Javascript'].each do |skill|
	Skill.create(name: skill)
end


Client.create(name: 'Cliente random 1', phone: '111-333-2132', address: 'Fake st 123', city: 'New York', state: 'New york', information: 'Our very first client. need to treat them with respect.')