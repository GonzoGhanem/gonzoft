class Api::V1::TimeController < Api::V1::BaseController
  #before_filter :authenticate_user!

  def index
    ### Showing User Time Track Main Page
    render :json => {:info => "Time", :time => "satraza"}, :status => 200
  end

  #def show 
    #paths.app.views << "../../app/views/time"
    #puts "Here"
    #render :show
  #end

  def save
    ### Saving User Time Track
  end

  private
    def time_params
      params.require(:time).permit(:name, :phone)
    end
end