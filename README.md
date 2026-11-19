# Shinn

Shinn ဟာ group ထဲက အသုံးစရိတ်တွေကို မျှဝေပြီး ဘယ်သူက ဘယ်သူ့ကို ဘယ်လောက်ပေးရမလဲ (balance) ကို တွက်ပေးတဲ့ practice project ဖြစ်ပါတယ်။

## MVP Scope

ဒီ project က အောက်ပါ feature (၅) ခုပဲ ပါမယ် — **ဒီထက်မပိုရ**:

1. Group ဆောက်ခြင်း (create group)
2. Member ထည့်/ဖျက်ခြင်း (add/remove member)
3. Expense ထည့်ခြင်း (add expense)
4. Balance ကြည့်ခြင်း (view balance — ဘယ်သူက ဘယ်သူ့ကို ဘယ်လောက်ပေးရမလဲ)
5. Settle ခြင်း (mark as settled)

အခြား feature (recurring expense, multi-currency, notification, auth providers, စသည်) ကို ဒီ scope အတွင်း ထည့်မည်မဟုတ်ပါ။

## Known limitations

- Anyone with a group link can view and edit that group (no login in the MVP).

## Git Workflow

- `main` ပေါ်မှာ **တိုက်ရိုက် commit/push လုပ်ခွင့်မရှိပါ**။
- အလုပ်တိုင်းကို branch အသစ်ဆောက်ပြီး PR ဖြင့်သာ `main` ထဲ merge လုပ်ပါ (`feat/...`, `fix/...`, `chore/...`)။
- Merge မလုပ်မီ review လိုအပ်ပါတယ်။

## Docker နဲ့ run နည်း

- Dev server စတင်ရန်: `docker compose up --build`
- ရပ်ရန်: `docker compose down`
- SQLite data ဖိုင်ကို host ရဲ့ `./data` directory မှာ persist လုပ်ပါတယ် (`./data` → container `/app/data`)
- `DATABASE_URL` ကို `docker-compose.yml` ရဲ့ `environment:` ထဲမှာ တိုက်ရိုက်သတ်မှတ်ထားပါတယ် (`.env` ကို container ထဲ bind mount ကတစ်ဆင့်မြင်ရပေမယ့် `environment:` တန်ဖိုးက ဦးစားပေးပါတယ်)
- `package.json` ပြောင်းရင် `docker compose down -v && docker compose up --build` ပြန်run ပါ (node_modules volume ပြန် rebuild ဖို့)

## Database

SQLite + Prisma 7 (better-sqlite3 adapter). Schema: `prisma/schema.prisma`; migrations are committed in `prisma/migrations`. App code gets the client from `getDb()` in `src/server/db.ts`.

| Where | SQLite file | `DATABASE_URL` |
| --- | --- | --- |
| Local `npm run dev` | `./data/dev.db` | `file:./data/dev.db` (from `.env.example`) |
| `docker compose up` (dev) | `./data/docker.db` on the host | `file:/app/data/docker.db` (set in `docker-compose.yml`) |
| Production `runner` image | `/app/data/app.db` on a volume | `file:/app/data/app.db` (image default) |

Local and Docker dev use different files on purpose: two processes on one SQLite file over a Docker bind mount can hit lock errors.

Commands:

- `npm run db:generate` — generate the Prisma client into `src/generated/prisma` (gitignored; run after clone and after schema changes)
- `npm run db:migrate -- --name <change>` — create + apply a new migration from schema changes (dev only)
- `npm run db:deploy` — apply committed migrations, no prompts
- `npm run db:reset` — **DEV ONLY: deletes all data without asking**, then re-applies all migrations
  - `npm run db:reset` resets `./data/dev.db`
  - `docker compose run --rm app npm run db:reset` resets `./data/docker.db`

Local first run: `npm ci && npm run db:generate && npm run db:deploy && npm run dev`, then `curl localhost:3000/api/health` → `{"status":"ok"}` (503 if the database can't be opened).

`docker compose up --build` needs no extra steps: the container runs `db:generate`, then `db:deploy`, then `npm run dev`.

Production `runner` image — migrations run automatically at container start (`docker-entrypoint.sh`); if they fail, the container exits non-zero and the server does not start:

```sh
docker build --target runner -t shinn .
docker run -p 3000:3000 -v shinn-data:/app/data shinn
curl localhost:3000/api/health
```

The container runs as uid 1001 and SQLite needs a writable `/app/data` directory. A named volume (above) works as is. To use a host folder instead (`-v "$PWD/prod-data":/app/data`), on a Linux host make it writable first: `sudo chown 1001:1001 prod-data` (Docker Desktop on macOS maps ownership automatically).

## Troubleshooting

- Observed once (cause unconfirmed): after editing `src/app/globals.css`, `next dev` and `next build` kept serving the old stylesheet until `.next/cache/turbopack` (dev: `.next/dev/cache/turbopack`) was moved aside and the app rebuilt.

## Phase Checklist

- [x] README.md — project scope + git rules
- [x] CLAUDE.md — AI assistant working rules
- [x] .gitignore — Node/Next.js baseline
- [x] .claude/settings.json — permission guardrails (.env deny, read-only git allow)
- [x] Phase 1 — Next.js + TypeScript scaffold, Prisma + SQLite, Tailwind, Vitest, ESLint/Prettier, GitHub Actions CI
- [x] Phase 2 — design system, shared lib, DB foundation, create-group slice (PRs #9–#11)
- [x] Phase 3 — MVP features
  - [x] Create group
  - [x] Member add/remove
  - [x] Add expense
  - [x] View balance
  - [x] Settle
