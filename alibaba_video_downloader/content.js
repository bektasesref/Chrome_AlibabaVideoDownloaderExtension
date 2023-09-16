function extractVideoUrls() {
  const videoElements = document.querySelectorAll("video");
  const videoUrls = [];

  videoElements.forEach(function (video) {
    if (video.src) {
      videoUrls.push(video.src);
    }
  });

  return videoUrls;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "extractVideoUrls") {
    const videoUrls = extractVideoUrls();
    sendResponse({ videoUrls: videoUrls });
  }
});
