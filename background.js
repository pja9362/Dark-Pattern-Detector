// ver1. 감지만) 페이지 이동을 감지하고 스크래핑하는 함수
function scrapePages() {
    const urlsToScrape = ['https://www.coupang.com/', 'https://www.coupang.com/np/campaigns/83', 'https://loyalty.coupang.com/loyalty/management/home'];
    const darkPatterns = ['한정', '마지막 기회', '지금', '즉시', '특별 할인', '품절', '임박', '포기', '버리고', '않을']; // 다크 패턴 예시
  
    // 감지한 다크패턴의 앞뒤 단어를 포함한 문장을 console에 출력
    urlsToScrape.forEach((url, index) => {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                var detected = false;
                if (html) {
                    for (var i = 0; i < darkPatterns.length; i++) {
                        if (html.includes(darkPatterns[i])) {
                            detected = true;
                            console.log('Dark pattern detected on', url, ':', darkPatterns[i]);
                            // break;
                        }
                    }
                }
                // 스크랩한 결과를 저장
                chrome.storage.sync.set({[url]: detected}, function() {
                    console.log('Dark pattern detected on', url, ':', detected);
                    // 마지막 페이지일 경우 메시지 전송, 팝업이 열려있을 때만
                    // if (index === urlsToScrape.length - 1) {
                    //     chrome.runtime.sendMessage({message: 'scrapingCompleted'});
                    //     console.log("INDEX", index)
                    // }
                });
            })
            .catch(error => {
                console.error('Error fetching page:', error);
            });
    });
  }
  
  // 서비스 워커가 활성화될 때 페이지 스크래핑 시작
  chrome.runtime.onInstalled.addListener(function() {
    // 페이지 스크래핑 시작
    scrapePages();
  });
  
  // 페이지 이동을 감지하고 스크래핑 실행
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      // 페이지 스크래핑 시작
      scrapePages();
    }
});