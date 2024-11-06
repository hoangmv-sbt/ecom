class CartsController < ApplicationController
    #before_action :authenticate_user!
    before_action :set_cart
    #before_action :set_user

    def index
        @cart_items = @cart.cart_items.includes(:post)
        @total_price = @cart_items.sum { |item| item.post.price * item.quantity }  # Tính tổng giá
    end

    def create
    end

    def show
        @post = Post.find(params[:id])
    end

    def add_post
        # Kiểm tra xem người dùng đã đăng nhập chưa
        unless user_signed_in?
            flash[:error] = "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng."
            redirect_to posts_path
            # redirect_to posts_path, alert: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.'
            return
        end
    
        # Tìm giỏ hàng hoặc tạo mới nếu không có
        @cart = current_user.carts.find_or_create_by(status: "active")
    
        # Tìm sản phẩm
        @post = Post.find(params[:post_id]) 
    
        # Tìm hoặc khởi tạo mục giỏ hàng
        @cart_item = @cart.cart_items.find_or_initialize_by(post_id: @post.id)
        @cart_item.quantity ||= 0
        @cart_item.quantity += params[:quantity].to_i
        
        if @cart_item.save
                flash[:success] = "Sản phẩm đã được thêm vào giỏ hàng!"
                redirect_to post_path(@post)
            else
                flash[:error] = "Có lỗi xảy ra khi thêm sản phẩm."
                redirect_to post_path(@post)
            end
    end

    def update_quantity
        item = CartItem.find(params[:id]) # Tìm kiếm CartItem theo ID
        if item.update(quantity: params[:quantity]) # Cập nhật số lượng
            render json: { success: true, quantity: item.quantity } # Trả về JSON nếu thành công
        else
            render json: { success: false }, status: :unprocessable_entity # Trả về lỗi nếu thất bại
        end
    end


    def remove_post
        @cart_item = @cart.cart_items.find(params[:id])
        @cart_item.destroy
        flash[:success] = "Sản phẩm đã được xóa khỏi giỏ hàng."
        redirect_to carts_path
        # redirect_to carts_path, notice: 'Sản phẩm đã được xóa khỏi giỏ hàng.'
    end


    private
    # def set_user
    #     @user = current_user
    # end


    def set_cart
        @cart = current_user.carts.find_or_create_by(status: "active")
        @cart_item_count = @cart.cart_items.select(:post_id).distinct.count
    end
end
