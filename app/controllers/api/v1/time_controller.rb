class Api::V1::TimeController < Api::V1::BaseController
  #before_filter :authenticate_user!

  def index
    ### Showing User Time Track Main Page
    render :json =>{:info => "Timetrack", :timetrack => Timetrack.all}, :status => 200
  end

  def filter
    date_from = params[:date_from]
    date_to = params[:date_to]
    user_id = params[:user_id]

    timetrack = Timetrack.where(:user_id => user_id, :time => date_from..date_to, :deleted => false)
    render :json =>{:info => "Timetrack records from db #{timetrack.count}!", :timetrack => timetrack}, :status => 200
  end  

  def save
    begin
      @created = []
      @updated = []
      timetrack_params.each do |day|
        day.delete("isFromServer")
        day.delete("created_at")
        day_exists = Timetrack.where(:user_id => day["user_id"], :day_id => day["day_id"], :date => day["date"])
        if(day_exists.count == 1)
          temp_day = Timetrack.find_by(day_id: day["day_id"])    
          if(day["day_type"] != temp_day["day_type"] ||
             day["client_name"] != temp_day["client_name"] ||
             day["project_name"] != temp_day["project_name"] ||
             day["hours"] != temp_day["hours"] ||
             day["notes"] != temp_day["notes"] || 
             day["deleted"] != temp_day["deleted"])  
            @updated.push temp_day.update(hours: day["hours"], 
                            day_type: day["day_type"], 
                            client_name: day["client_name"], 
                            project_name: day["project_name"],
                            notes: day["notes"],
                            deleted: day["deleted"])
          end
        else
          @created.push Timetrack.create(day)
        end
      end
      render :json => {:info => "Successfully created #{@created.count} and updated #{@updated.count} timetrack records!"}, :status => 200
    rescue Exception => e
      puts e.message
      puts e
    end
  end

  def getNextId
    begin
      next_id = (Timetrack.maximum(:id).to_i + 1)
    rescue Exception => e
      puts e.message
    end
    if((next_id == nil || next_id == 1) && Timetrack.all.count == 0)
      ActiveRecord::Base.connection.execute("DELETE FROM sqlite_sequence WHERE name='timetracks'")
      next_id = 1
    end
    render :json => {:info => "Successfully got next id!", :next_id => next_id}, :status => 200
  end

  private
    def timetrack_params
      #params.require(:timetrack).permit(:day_id, :time, :day, :date, :weekday, :day_type, :client_name, :project_name, :hours, :notes, :isExtra)
      params[:timetrack]
    end
end