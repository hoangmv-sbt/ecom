class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  skip_before_action :authenticate_user!, only: [:index, :show]
  def new
    @post = Post.new
    authorize_post
  end

  def index
    if params[:level]
      @q = Post.where(level: params[:level]).ransack(params[:q])
    else
      @q = Post.ransack(params[:q])
    end

    @pagy, @posts = pagy(@q.result(distinct: true).order(id: :desc), limit: 48)
  end

  def create
    @post = current_user.posts.new(post_params)
    
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
    if params[:post][:image_ids].present?
      params[:post][:image_ids].each do |image_id|
        @post.images.find(image_id).purge # Xóa ảnh đã chọn
      end
    end

    if post_params[:images].present?
      @post.images.attach(post_params[:images]) # Thêm ảnh mới vào ảnh hiện tại
    end

    if @post.update(post_params.except(:images)) 
      redirect_to @post, notice: 'Sản phẩm đã được cập nhật thành công.'
    else
      render :edit, notice: 'Sản phẩm không được cập nhật.'
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
    @post = Post.find_by(id: params[:id])
    authorize_post
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
    params.require(:post).permit(:name, :describe, :price, :quantity, :level, :proportion, images: [])
  end

  def authorize_post
    authorize @post
  end
end
