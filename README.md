## - 특정 깃헙 레파지토리(https://github.com/facebook/react/issues)의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축

- API
    - GitHub REST API
    - token을 발급하지 않으면 시간 당 60회로 API 호출 횟수 제한 됨
    - 개발 시에는 access token을 발급받아 60회 제한 없이 개발 권장
    - 이후 과제 제출 및 배포단계에서는 access token이 노출되지 않도록 주의
        
        [GitHub REST API - GitHub Docs](https://docs.github.com/en/rest)   

### 프로젝트 상세

1. 이슈 목록 화면
    - 이슈 목록 가져오기 API 활용
    - open 상태의 이슈 중 코멘트가 많은 순으로 정렬
    - 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
    - 다섯번째 셀마다 광고 이미지 출력
        - 이미지
            
            https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100
            
            https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100
            
        - 광고 이미지 클릭 시 https://www.wanted.co.kr/ 로 이동
    - 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩(인피니티 스크롤)

1. 이슈 상세 화면
    - 이슈의 상세 내용 표시
    - ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시
    
2. 공통 헤더
    - 두 페이지는 공통 헤더를 공유합니다.
    - 헤더에는 Organization Name / Repository Name이 표시됩니다.

### 요구 사항

- 필수 요구 사항
    - 이슈 목록 및 상세 화면 기능 구현
    - Context API를 활용한 API 연동
    - 데이터 요청 중 로딩 표시
    - 에러 화면 구현
    - 지정된 조건(open 상태, 코멘트 많은 순)에 맞게 데이터 요청 및 표시

- 선택 사항
    - CSS-in-JS 적용

- 언어 : JavaScript
- 필수 기술: React, Context API
- 선택 기술: styled-components, react-router-dom, octokit
