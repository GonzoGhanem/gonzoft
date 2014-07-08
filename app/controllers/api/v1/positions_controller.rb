class Api::V1::PositionsController < Api::V1::BaseController
  before_filter :authenticate_user!

  def index
      render :json =>{:info => "Positions", :positions => Position.all}, :status => 200
  end

  # def create
  #   @skill = Skill.new(skill_params)
  #   @skill.save
  #   if @skill.valid?
  #     render :json => {:info => "Created" }, :status => 200
  #   else
  #     render :json =>{:errors => @skill.errors}, :status => 409
  #   end
  # end

  # def updateUser
  #   UserSkill.find_by_id_or_create(params[:id]) do | userSkill |
  #     userSkill.skill_id = params[:skill_id]
  #     userSkill.user_id = params[:user_id]
  #     userSkill.years = params[:years]

  #     if userSkill.save
  #       render :json => @userSkill, :status => 200
  #     else
  #       render :json =>{:errors => userSkill.errors}, :status => 401
  #     end
  #   end
  # end

  # def removeFromUser
  #   UserSkill.destroy(params[:id])
  #   render json: true, status: 200
  # end
  
  # private

  # def skill_params
  #   params.require(:skill).permit(:name, :description)
  # end
end