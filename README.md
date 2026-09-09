# 리뷰 공유 서비스 (React + Supabase)

책/영화 리뷰를 등록하고 조회, 수정, 삭제할 수 있는 React 기반 SPA입니다.

## 배포 URL

- 서비스: (https://react-board-app-seven.vercel.app/)
- GitHub 저장소: ([https://github.com/gittul-123/react-board-app](https://github.com/gittul-123/react-board-app))

## 사용한 기술 스택

- **프론트엔드**: React 19, Vite, React Router (react-router-dom)
- **백엔드/DB**: Supabase (PostgreSQL 기반 원격 데이터베이스)
- **배포**: Vercel
- **언어**: JavaScript

## 주요 기능

- 리뷰 목록 조회 (`/reviews`)
- 리뷰 상세 조회 (`/reviews/:id`)
- 리뷰 등록 (`/reviews/new`)
- 리뷰 수정 (`/reviews/:id/edit`)
- 리뷰 삭제
- 폼 유효성 검증 (필수값 체크, 별점 범위 체크)
- 로딩 / 에러 / 빈 상태 처리
- 잘못된 주소 접근 시 Not Found 페이지

## 폴더 구조

```
src/
├── pages/        # 라우트 단위 화면 (Home, ReviewList, ReviewDetail, ReviewForm, ReviewEdit, NotFound)
├── components/   # 재사용 컴포넌트 (ReviewCard, LoadingState, ErrorState, EmptyState, StarRating, CategoryBadge, Navbar, Button)
├── hooks/        # 커스텀 훅 (useReviews, useReviewDetail)
└── lib/          # Supabase 클라이언트 설정 (supabaseClient.js)
```

## 로컬에서 실행하는 방법

### 1. 저장소 클론

```bash
git clone https://github.com/gittul-123/react-board-app
cd react-board-app
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경변수 설정

프로젝트 최상위 폴더에 `.env` 파일을 만들고, 아래 내용을 본인의 Supabase 프로젝트 값으로 채워 넣습니다.

```
VITE_SUPABASE_URL=본인의 Supabase 프로젝트 URL
VITE_SUPABASE_ANON_KEY=본인의 Supabase Publishable(anon) key
```

값은 Supabase 대시보드의 **Settings → Data API**(URL), **Settings → API Keys**(key)에서 확인할 수 있습니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 설계 근거

### 커스텀 훅을 분리한 이유

`useReviews`(목록 조회)와 `useReviewDetail`(단일 상세 조회, id 기반)은 반환하는 데이터 형태(배열 vs 객체)와 Supabase 쿼리 조건, URL 파라미터 필요 여부가 서로 달라 별도 파일로 분리했다. 하나로 합칠 경우 로직이 뒤섞여 어떤 상황에 배열이 오고 어떤 상황에 객체가 오는지 헷갈리기 쉽다. 특히 `useReviewDetail`은 상세 페이지(`ReviewDetail`)와 수정 페이지(`ReviewEdit`) 양쪽에서 동일하게 재사용되어 코드 중복을 줄인다.

### 컴포넌트 분리 기준

다음 두 가지 기준으로 컴포넌트를 분리했다.

1. **여러 페이지에서 반복되는 UI 패턴**: `LoadingState`, `ErrorState`, `EmptyState`는 목록/상세 페이지에서 동일하게 필요한 상태라 공통 컴포넌트로 통일했다. `Button`은 등록/수정/삭제 버튼이 공통적으로 갖는 "로딩 중 비활성화 + 텍스트 전환" 패턴을 하나로 묶었다.
2. **prop 값에 따라 표시나 동작이 달라지는 요소**: `StarRating`은 `rating` prop에 따라 그려지는 별 개수가 달라지고, `CategoryBadge`는 `category` prop에 따라 색상이 달라지며, `ReviewCard`는 전달받은 title/category/rating에 따라 매번 다른 리뷰를 렌더링한다.

각 재사용 컴포넌트는 최소 1개 이상의 prop을 필수로 받으며, prop 값이 바뀌면 화면 표시도 함께 바뀌도록 설계했다.

### props vs state, 그리고 상태 배치 기준

- **props**: 부모 컴포넌트가 자식 컴포넌트에게 건네주는 값으로, 받는 쪽에서 직접 변경할 수 없다. 예: `ReviewList`가 `.map()`으로 반복하며 각 `ReviewCard`에 `title`, `category`, `rating`을 props로 전달한다.
- **state**: 컴포넌트가 자기 자신 안에서 만들고 `set___()` 함수로 직접 바꾸는 값이다. 예: `ReviewForm` 내부의 `title`, `category`, `content`, `rating`(입력값), `errors`(검증 에러)는 오직 그 폼 컴포넌트만 사용하므로 로컬 state로 관리했다.

상태는 그 상태를 실제로 필요로 하는 컴포넌트 내부에 두는 것을 기준으로 삼았다. 폼 입력값/에러는 해당 폼 컴포넌트(`ReviewForm`, `ReviewEdit`) 내부에만 존재하고, 리뷰 데이터(`review`, `reviews`, `loading`, `error`)는 여러 컴포넌트에서 재사용되는 로직이므로 커스텀 훅으로 분리해 각 페이지가 필요할 때 호출하도록 구성했다.

### Supabase를 선택한 이유

- PostgreSQL 기반의 관계형 데이터베이스로 테이블/행/열 구조가 엑셀과 유사해 직관적이며, React를 처음 배우는 단계에서 데이터 흐름을 이해하기 쉬웠다.
- Table Editor를 통해 저장된 데이터를 실시간으로 눈으로 확인할 수 있어, RLS(Row Level Security) 정책 누락으로 데이터가 조회되지 않는 문제 등을 디버깅하는 데 유리했다.
- 무료 플랜으로 빠르게 프로젝트를 생성하고 연동할 수 있었다.

## Supabase 테이블 구조 (reviews)

| 컬럼명 | 타입 | 설명 |
|---|---|---|
| id | int8 (자동) | 고유 번호 (Primary Key) |
| title | text | 책/영화 제목 |
| category | text | 카테고리 (책/영화) |
| content | text | 리뷰 내용 |
| rating | int8 | 별점 (1~5) |
| created_at | timestamp (자동) | 작성 시각 |

