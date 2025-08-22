# Spotify API 연동 데모 애플리케이션

이 프로젝트는 Spotify Web API를 활용하여 만든 인터랙티브 웹 애플리케이션입니다. 사용자는 Spotify 계정으로 로그인하여 음악을 검색하고, 새로운 릴리스를 탐색하며, 자신만의 플레이리스트를 관리할 수 있습니다.

🔗 배포링크: https://lucky-buttercream-2b6ce4.netlify.app/

## ✨ 주요 기능

- **Google OAuth 2.0 인증**: 안전한 Spotify 계정 로그인을 지원합니다.
- **음악 검색**: 트랙, 아티스트, 앨범 단위의 상세한 검색이 가능합니다.
- **최신 발매 앨범**: 홈페이지에서 Spotify의 최신 발매 앨범 정보를 확인할 수 있습니다.
- **카테고리별 탐색**: 다양한 장르와 테마별로 음악을 탐색할 수 있습니다.
- **플레이리스트 관리**: 사용자의 플레이리스트를 조회하고, 새로운 플레이리스트를 생성하며, 원하는 트랙을 추가할 수 있습니다.
- **반응형 UI**: 데스크톱과 모바일 환경 모두에 최적화된 UI를 제공합니다.

## 🛠️ 기술 스택

- **프레임워크**: React
- **언어**: TypeScript
- **UI 라이브러리**: Material-UI (MUI)
- **상태 관리**: TanStack React Query
- **HTTP 클라이언트**: Axios
- **라우팅**: React Router
- **빌드 도구**: Webpack

## 🚀 시작하기

### 사전 요구 사항

- [Node.js](https://nodejs.org/) (v16 이상 권장)
- [npm](https://www.npmjs.com/) 또는 [yarn](https://yarnpkg.com/)

### 설치 및 실행
1.  **의존성 설치**
    ```bash
    npm install
    ```

2.  **환경 변수 설정**
    프로젝트 루트 디렉터리에 `.env` 파일을 생성필요. API 키는 [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)에서 발급받을 수 있습니다.
    > **Note**: Spotify Developer Dashboard에서 Redirect URI를 `http://localhost:8080`으로 설정해야 합니다.

3.  **개발 서버 실행**
    ```bash
    npm start
    ```
    서버가 실행되면 http://localhost:8080 에서 애플리케이션을 확인할 수 있습니다.

## 📜 사용 가능한 스크립트

- `npm start`: 개발 모드로 애플리케이션을 실행합니다.
- `npm run build`: 프로덕션용으로 애플리케이션을 빌드합니다.
- `npm test`: 테스트를 실행합니다.

## 📁 폴더 구조

```
/src
├── /apis           # Spotify API 호출 함수
├── /common         # 공통 컴포넌트 및 유틸리티
├── /configs        # 설정 관련 파일 (인증, 공통)
├── /hooks          # React Query를 사용한 커스텀 훅
├── /Layout         # 애플리케이션 레이아웃 및 네비게이션
├── /models         # TypeScript 타입 및 인터페이스 정의
├── /pages          # 라우팅 단위의 페이지 컴포넌트
└── /utils          # 공통 유틸리티 함수 (API, 인증 등)
```
