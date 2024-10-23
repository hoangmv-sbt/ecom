document.addEventListener('DOMContentLoaded', function () {
    const updateTotalPrice = () => {
        let total = 0;

        document.querySelectorAll('.select-item:checked').forEach(checkbox => {
            const cardBody = checkbox.closest('.card-body');
            if (cardBody) {
                const totalPriceElement = cardBody.querySelector('.total-price');
                if (totalPriceElement) {
                    const quantity = parseInt(cardBody.querySelector('input[name="quantity"]').value) || 0;
                    const price = parseFloat(totalPriceElement.dataset.price);
                    total += price * quantity;
                }
            }
        });

        document.getElementById('total-price-display').innerText = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(total);
    };

    // Gán sự kiện cho checkbox
    document.querySelectorAll('.select-item').forEach(checkbox => {
        checkbox.addEventListener('change', updateTotalPrice);
    });

    // Gán sự kiện cho trường nhập số lượng
    document.querySelectorAll('input[name="quantity"]').forEach(input => {
        input.addEventListener('input', updateTotalPrice);
    });

    // Cập nhật tổng giá ban đầu
    updateTotalPrice();

    // Hàm tăng số lượng
    window.increaseQuantity = function(itemId) { 
        const quantityInput = document.getElementById(`quantity_${itemId}`);
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updatePriceDisplay(itemId);
        updateTotalPrice(); // Gọi hàm cập nhật tổng giá
        updateQuantityOnServer(itemId, quantityInput.value);
    };

    // Hàm giảm số lượng
    window.decreaseQuantity = function(itemId) {
        const quantityInput = document.getElementById(`quantity_${itemId}`);
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updatePriceDisplay(itemId);
            updateTotalPrice(); // Gọi hàm cập nhật tổng giá
            updateQuantityOnServer(itemId, quantityInput.value);
        }
    };
    // Hàm để cập nhật giá hiển thị dựa trên số lượng
    window.updatePriceDisplay = function(itemId) {
        const cardBody = document.querySelector(`#quantity_${itemId}`).closest('.card-body');
        const pricePerUnit = parseFloat(cardBody.querySelector('.total-price').dataset.price);
        const quantity = parseInt(document.getElementById(`quantity_${itemId}`).value);
        const totalPrice = pricePerUnit * quantity;

        // Cập nhật giá hiển thị
        cardBody.querySelector('.total-price').innerText = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(totalPrice);
    }
    // Hàm cập nhật số lượng trên server
    window.updateQuantityOnServer = function(itemId, quantity) {
        fetch(`/carts/${itemId}/update_quantity`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ quantity: quantity })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Update successful:', data);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
});
