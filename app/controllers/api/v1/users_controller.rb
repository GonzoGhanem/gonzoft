class Api::V1::UsersController < Api::V1::BaseController
  require 'debugger'
  before_filter :authenticate_user!, :except => [:create, :show]



  def index
    if current_user.has_role?(:admin)
      render :json =>{:info => "users", :users => User.all}, :status => 200
    else
      render :json =>{:errors => "You don't have permissions for that!"}, :status => 401
    end
  end

  def show
    render json: current_user, :serializer => UserShowSerializer
  end

  def getById
    @user = User.find(params[:id])
    render json: @user
  end

  def roles
    render :json => {:info => "Available Roles",:roles => Role.all }, :status => 200
  end

  def create
    @user = User.new(user_params)
    if(@user.roles.empty?)
      @user.add_role :employee
    end
    @user.save
    if @user.valid?
      render :json =>  @user, :serializer => UserCreateSerializer, :status => 200
    else
      render :json =>{:errors => @user.errors}, :status => 401
    end
  end

  def update
    @user = User.find(params[:user][:id])
    @user.update(user_params)

    if @user.valid?
      render json: @user
    else
      render :json =>{:errors => @user.errors}, :status => 401
    end
  end

  def destroy
    respond_with :api, User.find(current_user.id).destroy
  end

  private

  def user_params
    params.require(:user).permit(:id, :name, :email, :password, :password_confirmation, :position_id, :phone, :date_of_birth, :full_name , roles: [:id, :name] )
  end
end