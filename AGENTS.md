# 유사모 FE — 에이전트 규칙

이 저장소는 **유사모**(유익한 사이트 모음) 프론트엔드다. 검색엔진이 아니라 **큐레이션 디렉터리**다.  
기획·스키마의 원본은 상위 `site-collection/`의 `요구사항.md`, `MVP-기능명세서.md`, `흐름-및-스키마.md`, `폴더-구조.md`, `UI-시안.md`다. 제품 결정을 코드에서 뒤집지 않는다.

핵심 규칙을 앞에 둔다. 긴 예시·튜토리얼은 쓰지 않는다.

---

## 0. AGENTS.md 보호 (최우선)

- 사용자가 **현재 요청에서 명시적으로 허용하지 않으면** 이 파일을 수정·이동·삭제·이름 변경하지 않는다.
- 규칙 충돌이나 개선 필요는 코드 변경과 **분리해 보고**한다. 허용받은 경우에도 요청 범위만 최소 수정한다.
- `AGENTS.override.md`나 도구별 파일을 만들어 규칙을 우회하지 않는다.
- 공용 규칙 변경은 별도 PR과 팀 리뷰를 거친다.
- 수정 후 UTF-8 파일 크기를 확인하고 Codex 기본 로딩 한도인 **32KiB 미만**을 유지한다. 반복 예시는 줄이고 핵심 규칙을 앞쪽에 둔다.
- `next.config.ts`의 `agentRules: false`를 켜지 않는다. Next가 이 파일을 덮어쓰지 않게 한다.

---

## 1. 제품에서 자주 틀리는 점

- 구글/네이버식 **전체 웹 검색·크롤러·검색 API**를 만들지 않는다. 결과는 DB에 있는 사이트만.
- 일반 **회원가입, 즐겨찾기, 리뷰, 댓글, 결제, 광고 단가/금액 컬럼**은 MVP에 없다.
- 공개 사이트는 `published` + `language = ko`만. 성인·도박·불법·피싱은 거절. 외국어 사이트는 나중에.
- 소개문은 이름+URL이 아니라 **누구 / 무엇을 / 뭐가 다른지** 한 문장. 빈 소개는 공개하지 않는다.
- 제보자 연락처·원문 IP를 저장하지 않는다. IP는 해시만. 광고 문의 연락처는 협의용이다.
- 유입 1순위는 SEO다. `/k/{slug}`, `/sites/{slug}` 메타·사이트맵을 깨지 않는다.

---

## 2. URL·검색 (가장 흔한 회귀)

- 검색 제출은 `?q=` 목록 페이지가 아니다. `router.push(/k/${toSlug(q)})`만 한다. `/search` 라우트를 추가하지 않는다.
- 한글 슬러그를 ASCII로 바꾸거나 로마자화하지 않는다. `키작녀 쇼핑몰` → `키작녀-쇼핑몰`.
- `Link`/`push`에서 한글 경로는 `encodeURIComponent`를 쓴다. 디코딩은 `decodeURIComponent` 한 번만.
- 한 번 **공개된 사이트 슬러그는 변경하지 않는다**.
- 키워드 랜딩은 **Keyword 행이 없어도** 동작한다. 손님 검색만으로 Keyword를 만들지 않는다. Keyword는 관리자가 붙이거나 인기검색어/광고 슬롯을 넣을 때 만든다.
- unpublished 사이트 상세는 `notFound()`. 리다이렉트나 빈 카드로 숨기지 않는다.
- `/submit`, `/ads`, `/admin`은 `noindex` + robots Disallow. 공개 API `/api/v1/...`를 만들지 않는다.
- Route Handler는 **`/api/upload` 하나**(관리자 세션 필수). 제보·광고·CRUD는 해당 화면 옆 `actions.ts` Server Action.

---

## 3. 광고 vs 일반 결과

- 광고 영역과 일반 영역은 **완전히 분리**한다. 광고 점수로 일반 순위를 올리지 않는다.
- 키워드당 오늘 유효 AD **최대 3**. `AdSlot`에 `status` 컬럼을 두지 않는다. `startsOn`~`endsOn`(포함)과 오늘 날짜로 계산한다.
- 같은 키워드 랜딩에서 AD에 이미 나온 사이트는 **일반 목록에서 뺀다**.
- AD 카드는 노란 배경 + `AD` 뱃지. 외부 링크 `rel="noopener sponsored"`. 일반은 `rel="noopener"`.
- 광고 가격·결제 UI·클릭 로그 테이블을 넣지 않는다. 문의(`/ads/apply`) → 관리자 협의 → 슬롯.

---

## 4. 데이터·중복

- 사이트 중복 키는 `urlNormalized`다. 비교 전에 https, 소문자, `www.` 제거, 끝 `/` 제거, utm/gclid/fbclid 제거.
- 제보 승인 전에는 **Site 행을 만들지 않는다**. pending Submission만.
- 같은 `urlNormalized`의 pending 제보가 있으면 새 제보를 만들지 않는다.
- 이미 published URL 제보면 상세 링크만 안내한다.
- 이미지는 테이블이 없다. `imageKey`/`imageUrl`만. jpeg/png/webp, 최대 5MB.
- Prisma는 `lib/db.ts` 싱글톤만. `page.tsx`에서 Prisma를 직접 남발하지 않는다. 목록은 `lib/search.ts`, 광고는 `lib/ads.ts`.
- 스키마를 `흐름-및-스키마.md`와 다르게 리팩터(User, Session 테이블, AdSlot.status, 금액)하지 않는다.

일반 검색 정렬: 키워드 정확 일치 → 사이트명 포함 → 소개/태그 부분 일치. 동점이면 `publishedAt` 최신. 페이지 크기 30.

---

## 5. 인증·관리자

- 손님 로그인은 없다. 관리자만 있다.
- 가드는 `app/admin/(app)/layout.tsx`의 `requireAdmin()`. `/admin/login`은 `(app)` **밖**.
- 로그인 페이지를 관리자 내비 레이아웃으로 감싸지 않는다. 공개 Header/Footer는 `/admin`에서 숨긴다.
- `middleware.ts`로 권한 전체를 넣지 않는다. 없어도 된다.
- 업로드·사이트 쓰기 API는 세션 없이 열지 않는다.

---

## 6. 구조·UI (과설계 금지)

- `app` = 라우트, `lib` = 서버 로직, `components` = UI. `src/`, `features/`, `entities/`, hexagonal, `packages/ui` 모노레포를 만들지 않는다.
- 전역 `actions/` 폴더를 만들지 않는다. 액션은 화면 옆 `actions.ts`.
- `components/ui` 디자인 시스템 패키지를 추가하지 않는다. Tailwind만.
- 라이트 테마 한 벌. `prefers-color-scheme` 다크, 다크 토글, 시스템 다크를 다시 넣지 않는다.
- 메인(`/`) 헤더 검색창은 숨긴다. 히어로 검색만.
- 공개 콘텐츠 최대 폭 720~800px, 관리자 1080px. 카드는 `SiteCard` 하나, 광고는 `ad`/`AdCard`.
- `html lang="ko"`. 카피·aria는 한국어.

색: 배경 `#FAFAF8`, 포인트 `#1F6B4A`, AD `#FFF8E8` / 뱃지 `#F5D48A`.

---

## 7. Git·비밀·범위

- 이 폴더의 remote는 `https://github.com/cari-0/Site-Collection-FE.git`다. 상위 기획 저장소와 섞어 커밋하지 않는다.
- `.env`를 커밋하지 않는다. `.env.example`만.
- 사용자가 시키지 않으면 커밋·푸시하지 않는다. `main` 강제 푸시, `--no-verify` 하지 않는다.
- 요청 밖의 리팩터, 새 라이브러리, 문서 대량 생성, `README` 장문을 하지 않는다.
- Next가 생성하는 `AGENTS.md`/`CLAUDE.md`를 규칙 파일로 채택하지 않는다. 생기면 삭제하고 `agentRules: false`를 유지한다.

---

## 8. Next.js 실수

- App Router 서버 컴포넌트가 기본이다. 목록·상세를 클라이언트+fetch로 바꾸지 않는다. 폼·검색창만 클라이언트.
- Next 16 `params` / `searchParams`는 `Promise`다. 동기 객체로 읽지 않는다.
- 임의 외부 이미지를 `next/image` 도메인 설정 없이 쓰지 않는다. 업로드 도메인을 연 뒤에만.
- `create-next-app` 기본 다크 스타일·Geist 영문 카피를 공개 UI에 되돌리지 않는다.
- Prisma 클라이언트를  generat하지 않은 채 `getDb()`를 페이지에서 호출해 빌드를 깨지 않는다. DB 연결 전에는 스텁/가드를 유지한다.
