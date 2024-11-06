class OrdersController < ApplicationController
    #before_action :authenticate_user!
    before_action :set_cart
    def index
        @orders = current_user.orders
    end

    def show
        @order = Order.find(params[:id])
        @orderItems = @order.order_items
    end

    def new
        @order = Order.new
        # Lấy các sản phẩm đã chọn từ session
        @selected_items = session[:selected_items] || []
        @total_price = session[:total_price] || 0
        @cart_items = @cart.cart_items.includes(:post) # Lấy các sản phẩm trong giỏ hàng
    end

    def create
        selected_items = params[:order][:selected_items] || [] # Lấy các sản phẩm đã chọn
    
        if selected_items.any?
            # Tính toán tổng giá cho các sản phẩm đã chọn
            total_price = calculate_total_price(selected_items)

            @order = current_user.orders.new(order_params.merge(total_price: total_price))
            # Lưu sản phẩm và tổng giá vào session
            session[:selected_items] = selected_items
            session[:total_price] = total_price
            
            # Chuyển hướng đến trang thanh toán
            flash[:success] = "Bạn đã chọn sản phẩm để thanh toán."
            redirect_to new_order_path(@order)
            # redirect_to new_order_path(@order), notice: 'Bạn đã chọn sản phẩm để thanh toán.'
        end
    end

    def confirm_order
        selected_items = session[:selected_items] || [] # Lấy các sản phẩm đã chọn từ session
        
        total_price = calculate_total_price(selected_items) # Tính toán tổng giá
        @order = current_user.orders.new(order_params.merge(total_price: total_price))
        
        if @order.save
            selected_items.each do |item_id|
                item = @cart.cart_items.find(item_id) # Lấy sản phẩm từ giỏ hàng
                @order.order_items.create(post_id: item.post_id, quantity: item.quantity, price: item.post.price)
                post = Post.find(item.post_id)
                if post.quantity >= item.quantity
                    post.update(quantity: post.quantity - item.quantity) # Trừ số lượng sản phẩm
                    post.update(sold_quantity: post.sold_quantity.to_i + item.quantity) # Tăng số lượng đã bán
                else
                    flash[:error] = "Số lượng sản phẩm không đủ trong kho!"
                    redirect_to new_order_path and return
                    # redirect_to new_order_path, alert: 'Số lượng sản phẩm không đủ trong kho!' and return
                end

                if post.sold_quantity >= post.quantity
                    post.update(status: 'out_of_stock') # Nếu đã bán hết
                else
                    post.update(status: 'available') # Nếu chưa bán hết
                end
                item.destroy # Xóa sản phẩm đã thanh toán khỏi giỏ hàng
            end
            # Cập nhật trạng thái đơn hàng thành 'confirmed'
            @order.update(status: 'confirmed')
            # Xóa session sau khi hoàn tất thanh toán
            session.delete(:selected_items)
            session.delete(:total_price)
            
            flash[:success] = "Đơn hàng của bạn đã được xác nhận thành công!"
            redirect_to orders_path
            # redirect_to orders_path, notice: 'Đơn hàng của bạn đã được xác nhận thành công!'
        else
            flash[:error] = "Không thể xác nhận đơn hàng, vui lòng thử lại!"
            redirect_to new_order_path
            # redirect_to new_order_path, alert: 'Không thể xác nhận đơn hàng, vui lòng thử lại!'
        end
    end



    private

    def order_params
        params.require(:order).permit(:name, :email, :address)
    end

    def calculate_total_price(selected_items)
        total_price = 0
        selected_items.each do |item_id|
            item = @cart.cart_items.find(item_id) # Lấy sản phẩm từ giỏ hàng
            total_price += item.post.price * item.quantity if item.present? && item.post.present?
        end
        total_price
    end

    def set_cart
        @cart = current_user.carts.find_or_create_by(status: "active")
    end
end
