// popup.js
// document.getElementById('apply-gpt').addEventListener('click', function() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         const activeTab = tabs[0];
//         chrome.tabs.sendMessage(activeTab.id, { action: "apply-gpt" });
//     });
// });

document.getElementById('detect-price-pattern').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: "detect-price-pattern" });

        const status = document.getElementById('loading-status');
        status.innerText = 'Loading...';;
        
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            if (message.success) {
                status.innerText = '';
            }
        });
    });
});