document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('input', function() {
        const pricePerUnit = parseFloat(this.closest('.show-flex-content').querySelector('.total-price').dataset.price);
        const quantity = parseInt(this.value);
        const totalPrice = pricePerUnit * quantity;

        this.closest('.show-flex-content').querySelector('.total-price').innerText = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(totalPrice);
    });
});