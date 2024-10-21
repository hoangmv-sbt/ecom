class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :authorize_post, only: [:edit, :update, :destroy]
  def new
    @post = Post.new
    authorize @post # Kiểm tra quyền tạo bài viết
  end

  def index
    @q = Post.ransack(params[:q])
    @posts = @q.result(distinct: true) 
  end

  def create
    @post = current_user.posts.new(post_params)
    authorize @post # Kiểm tra quyền tạo bài viết
    
    if @post.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    if @post.update(post_params)
      redirect_to @post, notice: 'Sản phẩm đã được cập nhật thành công.'
    else
      render :edit
    end
  end

  def destroy
    @post.destroy
    redirect_to root_path, notice: 'Sản phẩm đã bị hủy thành công.'
  end

  def show
    if @post.nil?
      redirect_to posts_path, alert: "Sản phẩm không tồn tại."  # Điều hướng nếu không tìm thấy
    end
  end
  
  private
  def set_post
    @post = Post.find(params[:id])
  end

  def check_admin
    unless current_user.admin?
      redirect_to posts_path, alert: 'Bạn không có quyền thực hiện hành động này.'
    end
  end

  def initialize_search
    @q = Post.ransack(params[:q])
  end

  def post_params
    params.require(:post).permit(:name, :describe, :image, :price)
  end

  def authorize_post
    authorize @post
  end
end
