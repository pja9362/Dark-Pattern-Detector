// 다크 패턴 감지 함수
function detectAndHighlightDarkPatterns() {
    const darkPatterns = ['캐쉬백', '남음', '임박', '특가'];
    const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    
    let currentNode;
    while (currentNode = allTextNodes.nextNode()) {
        const textContent = currentNode.textContent.toLowerCase();
        const hasDarkPattern = darkPatterns.some(pattern => textContent.includes(pattern));
        if (hasDarkPattern) {
            console.log('found dark pattern:', textContent);
            const parentElement = currentNode.parentElement;
            parentElement.style.backgroundColor = 'black';
            parentElement.style.color = 'red'; // 선택적으로 글자색을 변경할 수 있어요
        }
    }
}

// 페이지가 로드될 때 다크 패턴을 찾고 표시하는 함수 호출
detectAndHighlightDarkPatterns();
document.addEventListener('DOMContentLoaded', detectAndHighlightDarkPatterns);
