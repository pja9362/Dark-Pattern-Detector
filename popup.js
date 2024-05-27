// popup.js
document.getElementById('apply-gpt').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: "apply-gpt" });
    });
});
