document.addEventListener("turbo:load", () => {
    const displayedImage = document.getElementById("current-image");
    const galleryImages = document.querySelectorAll(".gallery-image");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementsByClassName("close")[0];
    
    if (!displayedImage) return;

    const images = JSON.parse(displayedImage.dataset.images);
    let currentIndex = 0;

    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const modalPrevButton = document.getElementById("modal-prev-button");
    const modalNextButton = document.getElementById("modal-next-button");

    // Xử lý sự kiện cho nút "tiếp theo"
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        displayedImage.src = images[currentIndex];
    });

    // Xử lý sự kiện cho nút "trước"
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        displayedImage.src = images[currentIndex];
    });

    // Cập nhật ảnh hiển thị khi nhấn vào ảnh trong gallery
    galleryImages.forEach(image => {
        image.addEventListener("click", () => {
            displayedImage.src = image.dataset.url;
            currentIndex = Array.from(galleryImages).indexOf(image);
        });
    });

    // Hiển thị modal khi nhấn vào ảnh hiển thị
    displayedImage.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImage.src = displayedImage.src; 
    });

    // Thêm sự kiện cho các nút "tiếp theo" và "trước" trong modal
    modalNextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        modalImage.src = images[currentIndex];
    });

    modalPrevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentIndex];
    });

    // Đóng modal khi nhấn vào nút đóng
    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    // Đóng modal khi nhấn bên ngoài ảnh
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
