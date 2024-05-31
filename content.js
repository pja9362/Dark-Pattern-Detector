function detectAndHighlightDarkPatterns() {
    
    if (window.location.href.includes('hotel/jeju-island-kr.html?finalPriceView')) {
        console.log('두번째 페이지 진입!!!Updating room price info...');
        updateRoomPriceInfo();

        const specificPattern = '1박당 요금(세금 및 봉사료 제외)';

        const specificElements = document.querySelectorAll('div.Box-sc-kv6pi1-0.hRUYUu.applied-cashback > div.Box-sc-kv6pi1-0.hRUYUu.effective-price-wrapper > div > div > div');

        specificElements.forEach(element => {
            console.log('Specific element:', element.innerHTML);
            element.innerText = element.innerText.replace(specificPattern, '1박당 요금(최종 가격)');
            element.style.color = '#007fff';
            element.style.fontSize = '14px';
        });
    }

    const highlightPatterns = ['시작가', '세금 및 봉사료 제외', '캐쉬백 적용 후 요금', '불포함 요금으로 표시'];
    const hidePatterns = ['남음', '임박', '어제부터', '현재 인기'];

    const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    
    let currentNode;
    while (currentNode = allTextNodes.nextNode()) {
        const textContent = currentNode.textContent.toLowerCase();
        const hasHighlightPattern = highlightPatterns.some(pattern => textContent.includes(pattern));
        const hasHidePattern = hidePatterns.some(pattern => textContent.includes(pattern));

        if (hasHighlightPattern) {
            const parentElement = currentNode.parentElement;
            parentElement.style.backgroundColor = 'black';
            parentElement.style.color = 'red'; 
            parentElement.style.fontSize = '13px';
            parentElement.style.lineHeight = '15px';
            parentElement.style.fontWeight = 'bold';
            parentElement.style.padding = '2px 8px';
            parentElement.style.borderRadius = '8px';
        } else if (hasHidePattern) {
            // console.log('found hide dark pattern:', textContent);
            const parentElement = currentNode.parentElement;
            if (!parentElement.querySelector('.overlay')) {
                parentElement.style.position = 'relative'; // 필요시 추가
                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                parentElement.appendChild(overlay);
            }
        } 
    }
}


// 페이지가 로드될 때 다크 패턴을 찾고 표시하는 함수 호출
detectAndHighlightDarkPatterns();
document.addEventListener('DOMContentLoaded', detectAndHighlightDarkPatterns);
document.addEventListener('scroll', detectAndHighlightDarkPatterns);

function updatePriceInfo(name, avg, max) {
    const parentElement = document.querySelector('div[data-selenium="selectedHotelContainer"]');
    const priceElement = parentElement.querySelector('div[data-element-name="price-after-cashback"] span[data-selenium="display-price"]');
   
    if (parentElement && priceElement) {
        // max, avg를 1,000 단위로 콤마(,) 찍기
        max = max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        avg = avg.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        const updatedPrice = `최저가: ${priceElement.innerText}<br>최고가: ₩${max}<br>(평균가: ₩${avg})`;

        // fontsize 작게
        priceElement.style.fontSize = '14px';
        priceElement.innerHTML = updatedPrice;
    } else {
        console.log('Parent element or price element not found.');
        setTimeout(() => updatePriceInfo(name, avg, max), 6000);
    }
}


// 페이지 이동 후 가격 정보를 업데이트하는 함수
function updateRoomPriceInfo() {
    const finalPrices = JSON.parse(localStorage.getItem('finalPrices'));
    if (!finalPrices) {
        console.log('No final prices found in local storage.');
        return;
    }

    console.log('Updating room price info...', finalPrices);

    const roomElements = document.querySelectorAll('span.kite-js-Span.pd-price.PriceDisplay.PriceDisplay--noPointer.PriceDisplay.pd-color > strong');
    console.log("Room List Elements:", roomElements);

    if (roomElements.length > 0) {
        roomElements.forEach((roomElement, index) => {
            if (finalPrices[index]) {
                const price = finalPrices[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                roomElement.style.fontSize = '24px';
                roomElement.style.color = '#007fff'
                roomElement.innerHTML = `${price}`;
            }
        });
    } else {
        console.log('Room list elements not found.');
        setTimeout(updateRoomPriceInfo, 8000);
    }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "apply-gpt") {
        fetch('http://localhost:3000/detect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: document.body.innerText }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.isDarkPattern) {
                const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
                let currentNode;
                while (currentNode = allTextNodes.nextNode()) {
                    const hasDarkPattern = data.isDarkPattern; 
                    if (hasDarkPattern) {
                        const parentElement = currentNode.parentElement;
                        parentElement.style.backgroundColor = 'red';
                        parentElement.style.color = 'black'; 
                    }
                }
            }
        })
        .catch(error => console.error('Error:', error));
    }
    else if (message.action === "detect-price-pattern") {
        console.log('Detecting price pattern...')
        fetch('http://localhost:8000/scraper/detectPrice/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: window.location.href }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.hotels && data.hotels.length > 0) {
                const { hotel_name, avg_price, max_price, avg_final_price, final_price_list } = data.hotels[0];
                console.log('HOTEL:', hotel_name, avg_price, max_price, avg_final_price, final_price_list);
                
                const firstHotelElement = document.querySelector('div[data-selenium="selectedHotelContainer"] h3');
                console.log("Filtered Hotel Name:", firstHotelElement.textContent.trim());

                updatePriceInfo(hotel_name, avg_price, max_price);

                localStorage.setItem('finalPrices', JSON.stringify(final_price_list));

                alert('✅Price pattern detection & correction completed.✅');
                
                sendResponse({ success: true });
            }   
        })
        .catch(error => {
            console.error('Error detecting price patterns:', error);
            sendResponse({ success: false });
        });
        return true;
    }
});