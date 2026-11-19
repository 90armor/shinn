# CLAUDE.md

@AGENTS.md

## Project

shinn — group အသုံးစရိတ် မျှဝေမှု balance တွက်ပေးတဲ့ practice project။ Scope နဲ့ MVP feature list အတွက် README.md ကိုကြည့်ပါ (feature ၅ ခုပဲ — ဒီထက်မပိုရ)။

## Stack

- Next.js + TypeScript + zod (validation)
- SQLite + Prisma
- Tailwind CSS
- Vitest (unit), Playwright (e2e)
- ESLint + Prettier
- GitHub Actions (CI)

## Commands

- `npm run dev` — Next.js local dev server
- `npm run lint` — ESLint check
- `npm run format` / `format:check` — Prettier write / check (CI runs format:check)
- `npm run typecheck` — generates Next.js route types, then TypeScript no-emit check
- `npm run build` — production build
- `npm run test` — Vitest unit tests (`src/**/*.test.ts`, next to the code they cover)
- `docker compose up --build` / `down` / `run --rm app npm run <cmd>` — Docker dev workflow (build & run, stop, run lint/typecheck/test in container)

## Naming & Structure Conventions

- `src/app` — Next.js App Router routes
- `src/components` — shared UI components, PascalCase filenames
- `src/lib` — shared utilities, camelCase filenames
- Check `src/lib/README.md` before writing a helper — reuse what exists.
- UI: tokens + src/components only, no raw colors (docs/DESIGN_SYSTEM.md); preview at /dev/components (dev only).
- `src/features/<name>` — per-MVP-feature folder, created when that feature's code lands; copy docs/FEATURE_PATTERN.md
- `prisma/` — schema + committed migrations; Prisma client lives in `src/server/db.ts` (server-only, never src/lib); `db:*` scripts: README › Database

## Git Workflow

- `main` ကို တိုက်ရိုက် push/commit မလုပ်ရ။
- Branch ဆောက်ပြီး PR ဖြင့်သာ merge လုပ်ရမယ် — branch prefix: `feat/` | `fix/` | `chore/`။
- Feature/fix တစ်ခု = branch တစ်ခု = PR တစ်ခု၊ PR ကို သေးသေးထားပါ။
- Commit message prefix: `feat:` / `fix:` / `chore:`၊ တိုတို ရှင်းလင်းစွာ ရေးပါ။

## Working Rules

- Code ရေး/ပြင်ခင်း plan ကို အရင်ပြပြီး user OK မှ စလုပ်ပါ။
- အသစ်မရေးခင်း existing code/utility ရှိ/မရှိ အရင်ရှာပါ။
- Feature/fix အသစ်တိုင်းမှာ test ပါရမယ်။ Bug fix ဖြစ်ရင် test အရင်ရေးပြီး fail ပြပြီးမှ ပြင်ပါ။
- Test fail ရင် root cause ကိုရှာဖြေရှင်းပါ — test ကိုပြင်ပြီး force pass မလုပ်ပါနဲ့။ Test file ကိုပြင်ရင် ဘာကြောင့်ပြင်လဲ ရှင်းပြပါ။
- တောင်းထားတာထက် ပိုမလုပ်ပါနဲ့ (over-engineering, unnecessary refactor, speculative feature မလုပ်ပါ)။
- ခွင့်ပြုထားတဲ့ phase မှာပဲ stack install/scaffold လုပ်ပါ။
- မသေချာတာရှိရင် မှန်းဆမလုပ်ဘဲ မေးပါ။

## Absolute Don'ts

- `.env`, `.env.local`, `.env.development`, `.env.production`, `.env.test` (secret ဖိုင်များ) ကို ဖတ်/ဖွင့်မည်မဟုတ်ပါ — `.env.example` ကိုတော့ ဖတ်/ပြင်နိုင်ပါတယ်။
- `main` ကို တိုက်ရိုက် push မလုပ်ရ။ `git push --force`, `rm -rf`, destructive git command များကို လုံးဝမလုပ်ရ။
- User မတောင်းထားသော dependency/package ကို ထည့်မည်မဟုတ်ပါ။
