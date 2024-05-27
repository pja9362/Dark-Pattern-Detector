// 다크 패턴 감지 함수
function detectAndHighlightDarkPatterns() {
    const darkPatterns = ['남음', '임박', '특가', '최대', '마지막'];
    const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    
    let currentNode;
    while (currentNode = allTextNodes.nextNode()) {
        const textContent = currentNode.textContent.toLowerCase();
        const hasDarkPattern = darkPatterns.some(pattern => textContent.includes(pattern));
        if (hasDarkPattern) {
            console.log('found dark pattern:', textContent);
            const parentElement = currentNode.parentElement;
            parentElement.style.backgroundColor = 'black';
            parentElement.style.color = 'red'; 
        }
    }
}

// 페이지가 로드될 때 다크 패턴을 찾고 표시하는 함수 호출
detectAndHighlightDarkPatterns();
document.addEventListener('DOMContentLoaded', detectAndHighlightDarkPatterns);
document.addEventListener('scroll', detectAndHighlightDarkPatterns);


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "apply-gpt") {
        fetch('http://localhost:3000/detect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: document.body.innerText }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('!!!!!Dark pattern detection result:', data);
            if (data.isDarkPattern) {
                const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
                let currentNode;
                while (currentNode = allTextNodes.nextNode()) {
                    const hasDarkPattern = data.isDarkPattern; // 서버에서 받은 다크 패턴 정보
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
});
