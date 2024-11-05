document.addEventListener('turbo:load', function() {
    const flashMessages = document.querySelectorAll('.alert');
    flashMessages.forEach(function(flashMessage) {
        setTimeout(function() {
            flashMessage.classList.remove('show');
            flashMessage.classList.add('fade');
            flashMessage.classList.add('fade-out');
        }, 3000);
    });
});