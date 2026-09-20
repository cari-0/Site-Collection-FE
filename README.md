# 유사모 FE

유익한 사이트 모음 프론트엔드. Next.js App Router, TypeScript, Tailwind.

저장소: https://github.com/cari-0/Site-Collection-FE

## 실행

```bash
cd FE
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)

## 지금 있는 것

- 공개 라우트: `/`, `/k/[slug]`, `/sites/[slug]`, `/submit`, `/ads/apply`, `/legal/*`
- 관리자 자리: `/admin/login`, `/admin`, `/admin/sites`, `/admin/submissions`, `/admin/ads`, `/admin/featured`
- 검색 폼은 `?q=` 대신 `/k/{slug}` 로 이동
- Prisma 스키마 초안 (`prisma/schema.prisma`). 클라이언트·DB 연결은 다음 단계

## 환경 변수

`.env.example`을 복사해 `.env`를 만든다.
