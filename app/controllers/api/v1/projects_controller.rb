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
      if params[:open_positions_attributes]
        params[:open_positions_attributes].each do |open_position|
          # Only save open positions that have a position assigned
          if open_position[:position_id] != ""
            new_open_pos = @project.open_positions.create(position_id: open_position[:position_id])
            # Only save assigments if there is a user assigned
            if open_position[:user_id] != ""
              new_open_pos.assignments.create( open_position_id: new_open_pos.id, 
                                            user_id: open_position[:user_id], 
                                            start_date: open_position[:start_date], 
                                            end_date: open_position[:end_date])
            end
          end
        end
      end
		  render json: @project, :status => 200
  	else
 		  render :json =>{:errors => @project.errors}, :status => 401
  	end

  end

  private

  def project_params
  	params.require(:project).permit(:name, :startdate, :enddate, :client_id, open_positions: [:position_id, :project_id])
  end  

end