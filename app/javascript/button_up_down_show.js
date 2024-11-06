document.addEventListener("turbo:load", function() {
    const increaseButton = document.getElementById("increase-quantity");
    const decreaseButton = document.getElementById("decrease-quantity");
    const quantityField = document.getElementById("quantity-field");

    // Truy xuất dữ liệu từ thuộc tính data
    const productData = document.getElementById("product-data");
    const availableQuantity = parseInt(productData.dataset.availableQuantity);
    const inStock = productData.dataset.inStock === "true";

    // Nếu sản phẩm hết hàng, vô hiệu hóa các nút
    if (!inStock) {
        increaseButton.disabled = true;
        decreaseButton.disabled = true;
        quantityField.value = 0;
    }

    // Tăng số lượng
    increaseButton.addEventListener("click", function() {
        let currentQuantity = parseInt(quantityField.value);
        
        if (currentQuantity < availableQuantity) {
            quantityField.value = currentQuantity + 1;
        }

        // Vô hiệu hóa nút tăng nếu đạt giới hạn
        if (currentQuantity + 1 >= availableQuantity) {
            increaseButton.disabled = true;
        }

        // Kích hoạt nút giảm khi số lượng lớn hơn 1
        decreaseButton.disabled = false;
    });

    // Giảm số lượng
    decreaseButton.addEventListener("click", function() {
        let currentQuantity = parseInt(quantityField.value);
        
        if (currentQuantity > 1) {
            quantityField.value = currentQuantity - 1;
        }

        // Vô hiệu hóa nút giảm nếu số lượng là 1
        if (currentQuantity - 1 <= 1) {
            decreaseButton.disabled = true;
        }

        // Kích hoạt nút tăng nếu số lượng thấp hơn sản phẩm có sẵn
        increaseButton.disabled = false;
    });
});
