// document.addEventListener("turbo:load", () => {
//     const videoPlayer = document.getElementById("video-player");
//     const nextButton = document.getElementById("next-video");
//     const prevButton = document.getElementById("prev-video");

//     // Danh sách video
//     const videos = [
//         "<%= asset_path('gundam_video_1.mp4') %>",
//         "<%= asset_path('gundam_video_2.mp4') %>",
//         "<%= asset_path('gundam_video_3.mp4') %>"
//     ];

//     let currentVideoIndex = 0;

//     // Hàm cập nhật video
//     function updateVideo() {
//         videoPlayer.src = videos[currentVideoIndex];
//         videoPlayer.load();
//         videoPlayer.play();
//     }

//     // Sự kiện cho nút Next
//     nextButton.addEventListener("click", () => {
//         currentVideoIndex = (currentVideoIndex + 1) % videos.length;
//         updateVideo();
//     });

//     // Sự kiện cho nút Previous
//     prevButton.addEventListener("click", () => {
//         currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
//         updateVideo();
//     });

//     // Tự động chuyển video sau một khoảng thời gian nhất định (ví dụ 10 giây)
//     setInterval(() => {
//         currentVideoIndex = (currentVideoIndex + 1) % videos.length;
//         updateVideo();
//     }, 10000);
// });


document.addEventListener("turbo:load", function() {
    const prevButton = document.getElementById("prev-video");
    const nextButton = document.getElementById("next-video");

    if (prevButton) {
        prevButton.addEventListener("click", function() {
            const url = prevButton.getAttribute("data-next-video");
            fetchVideo(url);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function() {
            const url = nextButton.getAttribute("data-next-video");
            fetchVideo(url);
        });
    }

    function fetchVideo(url) {
        fetch(url, {
            headers: {
                "Accept": "text/html"
            }
        })
        .then(response => response.text())
        .then(html => {
            document.getElementById("video-container").innerHTML = html; 
        })
        .catch(error => console.error('Error fetching video:', error));
    }
});
