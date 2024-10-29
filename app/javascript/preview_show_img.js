document.addEventListener("turbo:load", function() {
    const thumbnails = document.querySelectorAll(".gallery-item");
    const mainImage = document.querySelector(".main-image");
    const nextButton = document.getElementById("nextButton");
    const previewModal = document.getElementById("preview-modal");
    const previewImage = document.getElementById("preview-image");
    const closeModal = document.getElementById("close-modal");
    let currentIndex = 0;

    function updateMainImage(index) {
        mainImage.src = thumbnails[index].querySelector("img").src;
    }

    nextButton.addEventListener("click", function() {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage(currentIndex);
    });

    // Khi click vào thumbnail, mở modal hiển thị ảnh phóng to
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            currentIndex = index;
            updateMainImage(index);
            previewImage.src = thumbnail.querySelector("img").src;
            previewModal.style.display = "flex"; // Hiển thị modal
        });
    });

    // Đóng modal khi click vào dấu X
    closeModal.addEventListener("click", () => {
        previewModal.style.display = "none";
    });

    // Đóng modal khi click ra ngoài ảnh
    previewModal.addEventListener("click", (event) => {
        if (event.target === previewModal) {
            previewModal.style.display = "none";
        }
    });
});
