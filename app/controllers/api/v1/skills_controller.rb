class Api::V1::SkillsController < Api::V1::BaseController
  before_filter :authenticate_user!

  def index
      render :json =>{:info => "Skills", :skills => Skill.all}, :status => 200
  end

  def updateUser
    UserSkill.find_by_id_or_create(params[:id]) do | userSkill |
      userSkill.skill_id = params[:skill_id]
      userSkill.user_id = params[:user_id]
      userSkill.years = params[:years]

      if userSkill.save
        render :json => @userSkill, :status => 200
      else
        render :json =>{:errors => userSkill.errors}, :status => 401
      end
    end
  end

  def removeFromUser
    UserSkill.destroy(params[:id])
    render json: true, status: 200
  end
  # def show
  #   user_roles = current_user.nil? ? nil : current_user.roles
  #   render :json => {:info => "Current User", :user => current_user, :user_roles => user_roles  }, :status => 200
  # end

  # def roles
  #   render :json => {:info => "Available Roles",:roles => Role.all }, :status => 200
  # end
  # def create
  #   @user = User.new(user_params)
  #   if(@user.roles.empty?)
  #     @user.add_role :staff
  #   end
  #   @user.save
  #   if @user.valid?
  #     render :json => {:info => "Current User", :user => @user, :user_roles => @user.roles  }, :status => 200
  #   else
  #     render :json =>{:errors => @user.errors}, :status => 401
  #   end
  # end

  # def update
  #   respond_with :api, User.update(current_user.id, user_params)
  # end

  # def destroy
  #   respond_with :api, User.find(current_user.id).destroy
  # end

  private

  def skill_params
    params.require(:skill).permit(:name, :description)
  end
end