class ApplicationController < ActionController::Base
    before_action :authenticate_user!
    include Pundit
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
    private

    def user_not_authorized
        flash[:alert] = "Bạn không có quyền thực hiện hành động này."
        redirect_to(request.referrer || root_path)
    end
    def set_cart
        @cart = current_cart
    end
    
    def current_cart
        # Giả sử bạn lưu trữ giỏ hàng trong session
        cart_id = session[:cart_id]
        if cart_id
            Cart.find(cart_id)
        else
            cart = Cart.create
            session[:cart_id] = cart.id
            cart
        end
    end
end
