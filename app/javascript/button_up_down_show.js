document.addEventListener("turbo:load", function () {
    const decreaseButton = document.getElementById("decrease-quantity");
    const increaseButton = document.getElementById("increase-quantity");
    const quantityField = document.getElementById("quantity-field");

    if (decreaseButton && increaseButton && quantityField) {
        decreaseButton.addEventListener("click", () => {
            let quantity = parseInt(quantityField.value);
            console.log("Trước khi giảm: " + quantity); // Log giá trị trước khi giảm

            if (quantity > 1) {
                quantityField.value = quantity - 1;
                console.log("Sau khi giảm: " + quantityField.value); // Log giá trị sau khi giảm
            }
        });

        increaseButton.addEventListener("click", () => {
            // Lấy giá trị mới nhất từ quantityField mỗi lần nhấn nút
            let quantity = parseInt(quantityField.value);
            console.log("Trước khi tăng: " + quantity); // Log giá trị trước khi tăng

            quantityField.value = quantity + 1; // Tăng số lượng lên 1
            console.log("Sau khi tăng: " + quantityField.value); // Log giá trị sau khi tăng
        });
    }
});
