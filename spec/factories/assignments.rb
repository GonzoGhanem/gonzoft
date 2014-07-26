# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :assignment, :class => 'Assignments' do
    user_id 1
    open_positions_projects_id 1
    start_date "2014-07-24"
    end_date "2014-07-24"
  end
end
