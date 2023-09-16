chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "downloadVideo") {
    chrome.downloads.download({ url: request.videoUrl, filename: request.filename }, function (downloadId) {
      if (downloadId) {
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false });
      }
    });
  }
});
