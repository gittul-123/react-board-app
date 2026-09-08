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

## Supabase 테이블 구조 (reviews)

| 컬럼명 | 타입 | 설명 |
|---|---|---|
| id | int8 (자동) | 고유 번호 (Primary Key) |
| title | text | 책/영화 제목 |
| category | text | 카테고리 (책/영화) |
| content | text | 리뷰 내용 |
| rating | int8 | 별점 (1~5) |
| created_at | timestamp (자동) | 작성 시각 |