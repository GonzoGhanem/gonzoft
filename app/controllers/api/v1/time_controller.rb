class Api::V1::TimeController < Api::V1::BaseController
  #before_filter :authenticate_user!

  def index
    ### Showing User Time Track Main Page
    render :json => {:info => "Time", :time => "satraza"}, :status => 200
  end

  def show 
    #paths.app.views << "../../app/views/time"
    #puts "Here"
    #render :show
  end

  def save
    ### Saving User Time Track
  end

  def getDay
    @user = User.find(params[:id])
    @date = Time.now
    @data = {
      :client_name => "Gonzoft",
      :project_name => "Gonzoft Internal",
      :hours => 8
    }
    render :json => {:day => @date, :user => @user, :data => @data}, :status => 200
  end

  def getWeek user, week
  end

  def getMonth user, month
  end

  private
    def time_params
      params.require(:time).permit(:name, :client_name, :project_name, :hours)
    end
end