class CartsController < ApplicationController
    before_action :authenticate_user!
    # before_action :set_cart
    before_action :set_user
    def add_post
        @cart_item = @cart.cart_items.find_or_initialize_by(post_id: params[:post_id])
        @cart_item.quantity ||= 0
        @cart_item.quantity += params[:quantity].to_i
        @cart_item.cart_id ||= @cart.id
        if @cart_item.save
            redirect_to cart_path, notice: 'Sản phẩm đã được thêm vào giỏ hàng.'
        else
            redirect_to posts_path, alert: 'Có lỗi xảy ra.'
        end
    end

    def show
        @cart_items = @cart.cart_items.includes(:post)
    end

    def update_quantity
        @cart_item = @cart.cart_items.find(params[:id])
        if @cart_item.update(quantity: params[:quantity].to_i)
            redirect_to cart_path, notice: 'Số lượng sản phẩm đã được cập nhật.'
        else
            redirect_to cart_path, alert: 'Có lỗi xảy ra.'
        end
    end

    def remove_post
        @cart_item = @cart.cart_items.find(params[:id])
        @cart_item.destroy
        redirect_to cart_path, notice: 'Sản phẩm đã được xóa khỏi giỏ hàng.'
    end

    private
    def set_user
        @user = User.find(params[:user_id]) # Lấy user dựa vào user_id từ params
    end
    def set_cart
        if current_user
            @cart = @user.carts || @user.create_cart
        else
            redirect_to new_user_session_path, alert: "Bạn cần đăng nhập để truy cập giỏ hàng."
        end
    end
end
