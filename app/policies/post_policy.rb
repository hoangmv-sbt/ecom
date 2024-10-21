class PostPolicy < ApplicationPolicy
  def index?
    true # Tất cả người dùng có thể xem danh sách bài viết
  end

  def show?
    true # Tất cả người dùng có thể xem chi tiết bài viết
  end

  def create?
    user.admin? # Chỉ người dùng đã đăng nhập có thể tạo bài viết
  end

  def update?
    user.present? && record.user_id == user.id # Chỉ người dùng là tác giả bài viết có thể sửa
  end

  def destroy?
    user.present? && record.user_id == user.id # Chỉ người dùng là tác giả bài viết có thể xóa
  end



  class Scope < ApplicationPolicy::Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
  end
end
