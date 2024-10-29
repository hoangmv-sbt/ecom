document.addEventListener('turbo:load', function() {
    const images = document.querySelectorAll('.gallery-image');
    const currentImage = document.getElementById('current-image');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    let currentIndex = 0;

    images.forEach(image => image.style.display = 'none');
    
    if (images.length > 0) {
        images[0].style.display = 'block';
        currentImage.src = images[0].querySelector('img').src;
    }

    nextButton.addEventListener('click', function() {
        if (images.length === 0) return; 

        images[currentIndex].style.display = 'none';

        currentIndex = (currentIndex + 1) % images.length;

        if (images[currentIndex]) {
            images[currentIndex].style.display = 'block';
            currentImage.src = images[currentIndex].querySelector('img').src; 
        }
    });

    prevButton.addEventListener('click', function() {
        if (images.length === 0) return; 

        images[currentIndex].style.display = 'none';

        currentIndex = (currentIndex - 1 + images.length) % images.length;

        if (images[currentIndex]) {
            images[currentIndex].style.display = 'block';
            currentImage.src = images[currentIndex].querySelector('img').src; 
        }
    });
});