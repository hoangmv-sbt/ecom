class CartsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_cart
    before_action :set_user


    def index
        @cart_items = @cart.cart_items.includes(:post)
        @total_price = @cart_items.sum { |item| item.post.price * item.quantity }  # Tính tổng giá
    end


    def create
    end


    def show
        #@cart_items = @cart.cart_items.includes(:post)
        @post = Post.find(params[:id])
    end


    def add_post
        # Kiểm tra xem người dùng đã đăng nhập chưa
        unless user_signed_in?
            redirect_to posts_path, alert: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.'
            return
        end
    
        # Tìm giỏ hàng hoặc tạo mới nếu không có
        @cart = current_user.carts.find_or_create_by(status: "active")
    
        # Tìm sản phẩm
        @post = Post.find(params[:post_id])  # sử dụng product_id từ params
    
        # Tìm hoặc khởi tạo mục giỏ hàng
        @cart_item = @cart.cart_items.find_or_initialize_by(post_id: @post.id)
        @cart_item.quantity ||= 0
        @cart_item.quantity += params[:quantity].to_i
    
        if @cart_item.save
            redirect_to carts_path, notice: 'Sản phẩm đã được thêm vào giỏ hàng.'
        else
            redirect_to post_path(@post), alert: 'Có lỗi xảy ra khi thêm sản phẩm.'
        end
    end

    def update_quantity
        @cart_item = @cart.cart_items.find(params[:id])
        if @cart_item.update(quantity: params[:quantity].to_i)
            redirect_to carts_path, notice: 'Số lượng sản phẩm đã được cập nhật.'
        else
            redirect_to carts_path, alert: 'Có lỗi xảy ra.'
        end
    end


    def remove_post
        @cart_item = @cart.cart_items.find(params[:id])
        @cart_item.destroy
        redirect_to carts_path, notice: 'Sản phẩm đã được xóa khỏi giỏ hàng.'
    end


    private
    def set_user
        @user = current_user
        # @user = User.find(params[:user_id])
        # @cart = @user.carts || @user.create_cart
    end


    def set_cart
        @cart = current_user.carts.find_or_create_by(status: "active") #|| current_user.carts.create(status: 'active')
    end
end
