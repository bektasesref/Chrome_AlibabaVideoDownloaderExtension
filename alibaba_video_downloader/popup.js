document.addEventListener("DOMContentLoaded", function () {
  var downloadButton = document.getElementById("downloadButton");
  var statusMessage = document.getElementById("statusMessage");

  downloadButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: "extractVideoUrls" }, function (response) {
        var videoUrls = response.videoUrls;

        if (videoUrls.length > 0) {
          var videoUrl = videoUrls[0]; // Assuming you want to download the first video
          var filename = "video.mp4"; // Specify the desired filename here

          chrome.runtime.sendMessage({ action: "downloadVideo", videoUrl: videoUrl, filename: filename }, function (response) {
            if (response.success) {
              statusMessage.textContent = "Video downloaded successfully.";
            } else {
              statusMessage.textContent = "Failed to download the video.";
            }
          });
        } else {
          statusMessage.textContent = "No videos found on the page.";
        }
      });
    });
  });
});
