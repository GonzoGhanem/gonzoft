# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :project do
    name "MyString"
    startdate "2014-07-10"
    enddate "2014-07-10"
    client_id 1
  end
end
