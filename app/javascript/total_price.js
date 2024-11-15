document.addEventListener('turbo:load', function () {
    const updateTotalPrice = () => {
        let total = 0;
        const totalPrice = document.getElementById('total-price-display')
        const purchaseButton = document.getElementById('purchase-button');
        const checkedItems = document.querySelectorAll('.select-item:checked');
        
        if (checkedItems.length === 0 && totalPrice) {
            totalPrice.innerText = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(0); // Hiển thị 0 nếu không có sản phẩm nào được chọn
            return;
        }
    
        checkedItems.forEach(checkbox => {
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
    
        if (totalPrice) {
            totalPrice.innerText = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(total);
        }
    };
    

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

    // Gán sự kiện cho checkbox
    document.querySelectorAll('.select-item').forEach(checkbox => {
        console.log(999);
        
        checkbox.addEventListener('change', updateTotalPrice);
    });

    // Gán sự kiện cho trường nhập số lượng
    document.querySelectorAll('input[name="quantity"]').forEach(input => {
        input.addEventListener('input', updateTotalPrice);
    });
    
    // Gán sự kiện cho nút mua hàng
    const purchaseButton = document.getElementById('purchase-button');
    if (purchaseButton) {
        purchaseButton.addEventListener('click', function (event) {
            const checkedItems = Array.from(document.querySelectorAll('.select-item:checked')).map(checkbox => checkbox.value);
            if (checkedItems.length === 0) {
                event.preventDefault();
                alert("Bạn vẫn chưa chọn sản phẩm nào để mua.");
            } else {
                // Tạo một form để gửi dữ liệu
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = '/orders'; // Đường dẫn đến OrdersController

                // Tạo một input cho order
                const orderInput = document.createElement('input');
                orderInput.type = 'hidden';
                orderInput.name = 'order[selected_items][]'; // Đảm bảo có cấu trúc đúng
                checkedItems.forEach(id => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'order[selected_items][]';
                    input.value = id;
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();
            }
        });
    }

});
