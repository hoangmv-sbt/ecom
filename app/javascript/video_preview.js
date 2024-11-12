document.addEventListener("turbo:load", () => {
    window.previewVideo = function(event) {
        const videoPreview = document.getElementById('preview-video');
        const file = event.target.files[0];
        
        if (file) {
            const fileURL = URL.createObjectURL(file);
            videoPreview.src = fileURL;
            videoPreview.style.display = 'block';
        } else {
            videoPreview.style.display = 'none';
        }
    }
});
