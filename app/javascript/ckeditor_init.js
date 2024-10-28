document.addEventListener("turbo:load", () => {
    if (typeof CKEDITOR !== "undefined" && CKEDITOR.instances['post_describe'] === undefined) {
        const describeField = document.getElementById("post_describe");
        if (describeField) {
            CKEDITOR.replace("post_describe");
        }
    }
});
