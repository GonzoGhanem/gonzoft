class Api::V1::ClientsController < Api::V1::BaseController
  before_filter :authenticate_user!

  def index
  	render :json => {:info => "Clients", :clients => Client.all}, :status => 200
    # if current_user.has_role?(:admin)
    #   render :json =>{:info => "users", :users => User.all}, :status => 200
    # else
    #   render :json =>{:errors => "No tiene permisos"}, :status => 401
    # end
  end

  def show
    # user_roles = current_user.nil? ? nil : current_user.roles
    # render :json => {:info => "Current User", :user => current_user, :roles => Role.all, :user_roles => user_roles  }, :status => 200
  end

  def create
    @client = Client.create(client_params)
    if @client.valid?
      render :json => { :info => "Client added successfully" }, :status => 200
    else
      render :json => { :info => "There were errors", :errors => @client.errors }, :status => 400
    end
  end

  def update
    # respond_with :api, User.update(current_user.id, user_params)
  end

  def destroy
    # respond_with :api, User.find(current_user.id).destroy
  end

  private

  def client_params
    params.require(:client).permit(:name, :phone, :information, :city, :address, :state)
  end
end