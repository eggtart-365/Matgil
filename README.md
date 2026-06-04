<p align="center">
  <img src="assets/img/TypoLogo.png" alt="맛길" width="240" />
</p>

# 맛길 (Matgil)

우리 동네 맛집을 탐색하고, 리뷰와 카테고리로 골라볼 수 있는 맛집 정보 사이트입니다.  
웹프로그래밍 과제용으로 제작한 정적 HTML/CSS/JS 프로젝트입니다.

## 페이지 구성

| 페이지 | 파일 | 설명 |
|--------|------|------|
| 메인 | `index.html` | 캐러슬 배너, 인기 맛집, 카테고리 필터, 기능 바로가기 |
| 이벤트 | `event.html` | 진행·종료 이벤트 목록 및 필터 |
| 소개 | `about.html` | 서비스 소개, 통계, 주요 특징 |
| 로그인 | `login.html` | 로그인 폼, 캡차 UI, 유효성 검사 |
| 회원가입 | `sigunup.html` | 회원가입 폼, 약관·추가 옵션, 유효성 검사 |

## 폴더 구조

```
Matgil/
├── assets/
│   ├── font/          # YClover-Bold (로고·브랜드 텍스트) (메인 폰트는 JSDelivr 이용)
│   └── img/           # 로고 파일 등 이미지 폴더
├── css/
│   ├── main.css       # 공통 헤더·푸터·레이아웃
│   ├── index.css
│   ├── about.css
│   ├── event.css
│   ├── login.css
│   └── signup.css
├── js/
│   ├── index.js       # 캐러슬, 카테고리 필터
│   ├── event.js       # 이벤트 상태 필터
│   ├── login.js
│   └── signup.js
└── favicon.ico
```

## 디자인·구현 메모

- **브랜드 컬러** `#e85d4a`, 본문 폰트 **Pretendard**(CDN), 로고·강조 문구 **YClover**
- 헤더·푸터는 모든 페이지에서 공유하며, 스타일은 `main.css`에 정의
- 회원가입 폼은 마켓컬리 과제 폼을 기반으로 Primary 컬러만 변경했으며, input·버튼 스타일은 로그인 페이지에서 재사용
- 메인: 광고형 캐러셀, 인기 맛집 그리드, 카테고리 탭 필터, 바로가기
- 소개: Hero(맛집 지도 UI 목업), 통계, 특징 카드 — 실제 지도 API는 미연동
- `translate`, `transition` 등으로 호버·슬라이드 등 인터랙션 구성
- 음식점 이름·카테고리 등 일부 카피는 생성형 AI로 작성

## 실행 방법

별도 빌드 없이 정적 파일입니다. 루트의 `index.html`을 브라우저로 열거나, Live Server 등 로컬 서버로 프로젝트 루트를 띄우면 됩니다.

## 업데이트

| 날짜 | 내용 |
|------|------|
| 2026-05-29 | 로그인·회원가입 validation, 하단 error 텍스트 및 레이아웃 조정 |
| 2026-06-04 | 이벤트 페이지, 로고(SVG·YClover), favicon, 네비 `is-current`, README 정리 |
