Radd::Application.routes.draw do
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products
  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'º
  #resources :home, only: [:index]
  resources :home, only: [:index]
  root :to => "home#index"
  devise_for :users

  #root :to => "pages#index"
  
  namespace :api, defaults: {format: :json} do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: :true) do

      devise_scope :user do
        match '/sessions' => 'sessions#create', :via => :post
        match '/sessions' => 'sessions#destroy', :via => :delete
      end

      resources :record
      resources :client
      resources :skill
      #resources :time, only: [:show]
      resources :users, only: [:create]
      match '/skills/index' => 'skills#index', :via => :get
      match '/positions/index' => 'positions#index', :via => :get
      match '/skills' => 'skills#create', :via => :post
      match '/skills/:id' => 'skills#destroy', :via => :delete
      match '/skills/user' => 'skills#updateUser', :via => :put
      match '/skills/removeFromUser' => 'skills#removeFromUser', :via => :put
      match '/clients/create' => 'clients#create', :via => :post
      match '/clients/index' => 'clients#index', :via => :get
      match '/clients/:id' => 'clients#show', :via => :get
      match '/client/:client_id/projects/' => 'projects#byClient', :via => :get
      match '/client/:client_id/project/new' => 'projects#create', :via => :post
      match '/users/admin' => 'users#index', :via => :get
      match '/users/roles' => 'users#roles', :via => :get
      match '/users' => 'users#show', :via => :get
      match '/users' => 'users#update', :via => :put
      match '/users' => 'users#destroy', :via => :delete
      match '/fileupload' => 'uploads#save', :via => :post
      match '/time/index' => 'time#index', :via => :get
      match '/time/save' => 'time#save', :via => :post
      match '/time/show' => 'time#show', :via => :get
      match '/time/filter' => 'time#filter', :via => :post 
      match '/time/getNextId' => 'time#getNextId', :via => :post
    end
  end

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
