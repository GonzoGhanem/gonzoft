class Api::V1::ProjectsController < Api::V1::BaseController
  before_filter :authenticate_user!

  def byClient
  	@projects = Client.find(params[:client_id]).projects
  	render json: @projects
  end

  def create
  	@project = Project.new(project_params)
    @project.save
    if @project.valid?
      if params[:open_positions]
        params[:open_positions].each do |open_position|
          new_open_pos = @project.open_positions.create(position_id: open_position[:position_id])
          new_open_pos.assignments.create( open_position_id: new_open_pos.id, 
                                            user_id: open_position[:user_id], 
                                            start_date: open_position[:start_date], 
                                            end_date: open_position[:end_date]) unless open_position[:user_id] == ""
        end
      end
		  render json: @project, :status => 200
  	else
 		  render :json =>{:errors => @project.errors}, :status => 401
  	end

  end

  private

  def project_params
  	params.require(:project).permit(:name, :startdate, :enddate, :client_id, open_positions_attributes: [:position_id, :project_id])
    # params.require(:project).permit!
  end  

end