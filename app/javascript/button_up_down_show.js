document.addEventListener("turbo:load", function () {
    const decreaseButton = document.getElementById("decrease-quantity");
    const increaseButton = document.getElementById("increase-quantity");
    const quantityField = document.getElementById("quantity-field");

    if (decreaseButton && increaseButton && quantityField) {
        decreaseButton.addEventListener("click", () => {
            let quantity = parseInt(quantityField.value);

            if (quantity > 1) {
                quantityField.value = quantity - 1;
            }
        });

        increaseButton.addEventListener("click", () => {
            let quantity = parseInt(quantityField.value);

            quantityField.value = quantity + 1;
        });
    }
});
