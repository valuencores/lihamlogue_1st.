# SMART P&B — Brand Landing Site

**Operated by Reehamlog Inc. (리함로그 주식회사)**  
An Operating System for Text IP.

---

## 실행 방법 (Getting Started)

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev
# → http://localhost:3000

# 3. 프로덕션 빌드
npm run build
npm run start
```

---

## 프로젝트 구조

```
/app
  layout.tsx          — 루트 레이아웃, SEO 메타데이터, 폰트
  page.tsx            — 단일 랜딩 페이지 (모든 섹션 조합)
  globals.css         — 전역 스타일 + CSS 변수 오버라이드
  /api/lead/route.ts  — 리드 캡처 API (POST /api/lead)

/components
  Nav.tsx             — 스티키 내비게이션 (투명 → 솔리드)
  /sections
    Hero.tsx          — 01. 히어로 (단어 마스크 애니메이션)
    Manifesto.tsx     — 02. 매니페스토
    Problem.tsx       — 03. 문제 정의 (3-카드)
    WhyNow.tsx        — 04. 왜 지금 (3-컬럼)
    OS.tsx            — 05. 운영체제 (2×2 모듈 그리드)
    Flow.tsx          — 06. 5단계 플로우 (데스크톱: 핀 스크롤 / 모바일: 수직 스텝퍼)
    Market.tsx        — 07. 4개 시장 교차점
    BusinessModel.tsx — 08. 비즈니스 모델 (3-tier)
    Roadmap.tsx       — 09. 로드맵 (0–36개월)
    Team.tsx          — 10. 팀 & 회사 정보
    ClosingCTA.tsx    — 11. 클로징 CTA
    Footer.tsx        — 푸터
  /ui
    Button.tsx        — Primary / Secondary / Ghost 버튼
    Modal.tsx         — 접근성 지원 모달 (포커스 트랩, ESC 닫기)
    LeadForm.tsx      — 역할 선택 + 폼 + 인라인 성공/에러 상태
    GlowOrb.tsx       — 블루→바이올렛 발광 오브 (드리프트 애니메이션)
    SectionLabel.tsx  — 모노 섹션 라벨 (01 — VISION 형식)
    CustomCursor.tsx  — 소프트 글로우 커서 (데스크톱 전용)

/lib
  motion.ts           — Framer Motion 공유 variants
  analytics.ts        — 분석 훅 (no-op 스텁, 실제 제공자로 교체 가능)

/styles
  tokens.css          — 디자인 토큰 (컬러, 타이포, 스페이싱, 모션)
```

---

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS + CSS Variables |
| 애니메이션 | Framer Motion |
| 스크롤 | Lenis (smooth scroll) |
| 아이콘 | lucide-react |
| 폰트 | Pretendard Variable (한국어) + Inter (영문) + JetBrains Mono (레이블) |

---

## 환경 변수 (선택)

```env
# .env.local
# 아래 키를 추가하면 /api/lead/route.ts에서 연동 가능

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Resend
RESEND_API_KEY=

# Loops
LOOPS_API_KEY=
```

---

## 리드 캡처 API

**POST `/api/lead`**

```json
{
  "role":    "writer | investor | partner",
  "name":    "홍길동",
  "email":   "hong@example.com",
  "message": "간단한 소개 (선택)"
}
```

Response:
```json
{ "success": true, "message": "We'll reach out within 48 hours." }
```

`/app/api/lead/route.ts` 안의 `TODO` 주석에 Supabase / Resend / Loops 연동 코드를 삽입하면 바로 사용 가능합니다.

---

## Vercel 배포

```bash
# Vercel CLI
npx vercel --prod

# 또는 GitHub 연동 후 자동 배포
# vercel.json 설정 불필요 (Next.js 자동 감지)
```

---

## 디자인 가이드라인

- **컬러**: `styles/tokens.css` CSS 변수 참조
- **폰트 스케일**: `clamp()` 기반 fluid typography (Display 144px → Caption 13px)
- **모션**: `lib/motion.ts` 공유 variants (`prefers-reduced-motion` 지원)
- **접근성**: AA+ 대비, 포커스 링, ARIA 레이블, 스크린리더 live region

---

© 2026 Reehamlog Inc. All rights reserved.
