# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :timetrack do
    time "MyString"
    time "MyString"
    day "MyString"
    date "MyString"
    weekday "MyString"
    type ""
    client_name "MyString"
    project_name "MyString"
    hours 1
    notes "MyString"
    isExtra "MyString"
  end
end
