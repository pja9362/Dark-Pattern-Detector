# [Frontend] Dark Pattern Detector

## Introduction
웹 사이트의 다크패턴을 감지하고 교정하는 크롬 확장 프로그램 도구입니다.
웹 사이트 내의 다크패턴을 감지하고 화이트패턴으로 교정해줌으로써, 다크패턴으로 야기되는 사용자 이용자들의 피해를 줄이고자 합니다.

## 다크 패턴이란?
다크 패턴(Dark Pattern)은 사업자가 자신의 이익을 위해 소비자의 착각, 실수, 비합리적인 지출 등을 유도하기 위해 의도한 웹이나 앱의 설계 또는 디자인을 의미합니다. 
예를 들어, 예약 과정에서 수수료 및 세금 등의 추가 비용을 숨기거나, 반복적인 압박으로 불필요한 상품을 구매하도록 유도하는 등의 방법이 있습니다. 
이 프로젝트는 이러한 다크 패턴을 식별하고 사용자에게 경고하여 기술 활용 불법 콘텐츠에 의한 피해를 경계하여 공정한 인터넷 환경을 조성하는 데 기여하고자 합니다.

## Setup
1. 레포지토리를 클론합니다:
    ```bash
    git clone https://github.com/pja9362/Dark-Pattern-Detector.git
    cd Dark-Pattern-Detector
    ```

2. Load the extension in Chrome:
    - 크롬을 열고 `chrome://extensions/`로 이동합니다.
    - 오른쪽 상단의 "개발자 모드"를 활성화합니다.
    - "압축 해제된 확장 프로그램 로드"를 클릭하고, 클론한 레포지토리의 `Dark-Pattern-Detector` 디렉토리를 선택합니다.

## Usage
1. 크롬에서 특정 웹 사이트에 접속합니다.
2. 다크 패턴 탐지기 확장 프로그램 아이콘을 클릭합니다.
3. 확장 프로그램이 다크패턴을 감지하여 강조 표시하고 교정해줍니다.

## Architecture
![KakaoTalk_Photo_2024-06-01-00-19-02](https://github.com/pja9362/Dark-Pattern-Detector/assets/80195979/7aa5bb48-6f1e-472a-a04f-d1885b9e235e)

## Prototype
https://github.com/pja9362/Dark-Pattern-Detector/assets/80195979/dd28d6c9-8944-42b5-8cf8-d2661a5c70a7



