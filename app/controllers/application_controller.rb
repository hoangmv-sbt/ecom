class ApplicationController < ActionController::Base
    include Pagy::Backend
    before_action :set_cart_item_count
    before_action :authenticate_user!
    skip_before_action :verify_authenticity_token, only: [:create]

    include Pundit
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
    private

    def after_sign_in_path_for(resource)
        root_path # Đường dẫn trang chủ
    end

    def user_not_authorized
        flash[:alert] = "Bạn không có quyền thực hiện hành động này."
        redirect_to(request.referrer || root_path)
    end
    def set_cart_item_count
        if user_signed_in? # Kiểm tra người dùng đã đăng nhập
            @cart = current_user.carts.find_or_create_by(status: "active")
            @cart_item_count = @cart.cart_items.select(:post_id).distinct.count
        else
            @cart_item_count = 0 # Nếu chưa đăng nhập, giỏ hàng rỗng
        end
    end
end
