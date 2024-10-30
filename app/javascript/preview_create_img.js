document.addEventListener("turbo:load", function() {
    const inputFile = document.getElementById("post_images");
    const previewContainer = document.getElementById("preview-images");

    // Kiểm tra nếu input file tồn tại
    if (inputFile) {
        inputFile.addEventListener("change", function() {
            previewContainer.innerHTML = "";
        
            const files = inputFile.files;
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    img.style.width = "150px";
                    img.style.height = "150px";
                    img.style.objectFit = "cover";
                    previewContainer.appendChild(img);
                };
            
                reader.readAsDataURL(file);
            }
        });
    }
});
