require 'fileutils'

class Api::V1::UploadsController < Api::V1::BaseController
  def save
    begin
      #Rails.logger.info("================================")
      #Rails.logger.info(params[:uploadedFile])
      #Rails.logger.info(params[:uploadedFile])
      #Rails.logger.info(params[:uploadedFile].path)
      #Rails.logger.info("================================")
      #sleep 1
      
      from_file = params[:uploadedFile].path
      to_file = Rails.root.join("public", "images").to_s << "/#{params[:filename]}"
      Rails.logger.info(to_file)
      FileUtils.cp from_file, to_file

      render :json => { :info => "Image Updated", :status => "Success" }, :status => 200
    rescue => e
      Rails.logger.info(e)
    end
  end
end 