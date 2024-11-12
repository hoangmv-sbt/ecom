class VideosController < ApplicationController
    def new
        @video = Video.new
    end
    
    def create
        @post = Post.find(params[:video][:post_id]) 
        if @post.has_video?
            flash[:alert] = "Sản phẩm này đã có video, không thể tải video mới."
            redirect_to new_video_path
        else
            @video = @post.build_video(video_params)
            if @video.save
                flash[:notice] = "Video đã tải lên thành công."
                redirect_to root_path
            else
                redirect_to new_video_path
            end
        end
    end

    private
    
    def video_params
        params.require(:video).permit(:file, :post_id)
    end
    
end
