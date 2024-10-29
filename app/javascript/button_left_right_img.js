document.addEventListener('turbo:load', function() {
    const images = document.querySelectorAll('.gallery-image');
    const currentImage = document.getElementById('current-image');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    let currentIndex = 0;

    // Ẩn tất cả các ảnh trong gallery
    images.forEach(image => image.style.display = 'none');
    
    // Hiển thị ảnh đầu tiên trong gallery
    if (images.length > 0) {
      images[0].style.display = 'block';
      currentImage.src = images[0].querySelector('img').src; // Cập nhật ảnh lớn
    }

    nextButton.addEventListener('click', function() {
      if (images.length === 0) return; // Kiểm tra nếu không có ảnh

      // Ẩn ảnh hiện tại
      images[currentIndex].style.display = 'none';

      // Tăng chỉ số hiện tại
      currentIndex = (currentIndex + 1) % images.length;

      // Kiểm tra nếu currentIndex hợp lệ
      if (images[currentIndex]) {
        // Hiển thị ảnh mới
        images[currentIndex].style.display = 'block';
        currentImage.src = images[currentIndex].querySelector('img').src; // Cập nhật ảnh lớn
      }
    });

    prevButton.addEventListener('click', function() {
      if (images.length === 0) return; // Kiểm tra nếu không có ảnh

      // Ẩn ảnh hiện tại
      images[currentIndex].style.display = 'none';

      // Giảm chỉ số hiện tại
      currentIndex = (currentIndex - 1 + images.length) % images.length;

      // Kiểm tra nếu currentIndex hợp lệ
      if (images[currentIndex]) {
        // Hiển thị ảnh mới
        images[currentIndex].style.display = 'block';
        currentImage.src = images[currentIndex].querySelector('img').src; // Cập nhật ảnh lớn
      }
    });
});