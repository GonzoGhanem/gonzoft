require 'fileutils'

class Api::V1::UploadsController < Api::V1::BaseController
  def save
    begin
      Rails.logger.info("================================")
      #Rails.logger.info(params[:uploadedFile])
      Rails.logger.info(params[:uploadedFile])
      Rails.logger.info(params[tempfile])
      Rails.logger.info("================================")
      
      #FileUtils.mv('/tmp/your_file', '/opt/new/location/your_file')

      render :json => { :info => "File Updated", :status => "?" }, :status => 200
    rescue => e
      Rails.logger.info(e)
    end
  end
end 