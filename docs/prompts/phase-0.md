# Phase 0 Prompt — စတင်ရန် ပြင်ဆင်ခြင်း

**အသုံးပြုပုံ:** `cd ~/Projects/NAMR/shinn` ပြီး `claude` ဖွင့်၊ `Shift+Tab` နဲ့ **Plan mode** ကိုဖွင့်၊ အောက်က prompt ကို paste လုပ်။ Claude ပြတဲ့ plan ကိုဖတ်ပြီး OK ပေးမှ ဆက်လုပ်စေ။

**ပြီးပြီလို့ သတ်မှတ်ချက်:**
- [ ] `claude` run လို့ရ
- [ ] README မှာ scope နဲ့ branch စည်းကမ်းပါ
- [ ] `CLAUDE.md` နဲ့ `.claude/settings.json` ပါ
- [ ] အားလုံးကို PR နဲ့ merge ပြီး (`main` ကို တိုက်ရိုက် push မလုပ်ထား)

## Prompt

```text
ဒီ repo က shinn practice project ပါ။ အခု Phase 0 (code မရေးသေးပါဘူး၊ စည်းကမ်းနဲ့ အခြေခံဖိုင်တွေပဲ) ကို လုပ်မယ်။

အရင်ဆုံး (ဘာမှမပြင်ဘဲ) လက်ရှိ repo အခြေအနေကို စစ်ပါ: ဖိုင်တွေ၊ git branch/remote၊ README ပါတာ။ ပြီးရင် အောက်ပါအတိုင်း plan ပြပါ။ ငါ OK မပေးမချင်း ဖိုင်မဆောက်ပါနဲ့။

ဆောက်ချင်တာ:
1. README.md: Project အကျဉ်း၊ MVP scope (feature ၅ ခု: group ဆောက်၊ member ထည့်/ဖျက်၊ expense ထည့်၊ balance ကြည့်၊ settle)၊ "ဒီထက်မပိုရ" လို့ ရေးထား၊ Git စည်းကမ်း (main ကို တိုက်ရိုက် push မလုပ်ရ၊ branch + PR ပဲ)၊ Phase 0 checklist။
2. CLAUDE.md: တိုတိုပဲ (လိုင်း ၆၀ အောက်)။ Project အကျဉ်း၊ scope၊ ရည်ရွယ်ထားတဲ့ stack (Next.js + TypeScript, SQLite + Prisma, Tailwind, Vitest, Playwright, ESLint + Prettier, GitHub Actions)၊ command နဲ့ naming/structure အပိုင်းကို "Phase 1 မှာ ဖြည့်မယ်" လို့ placeholder ထား၊ Git workflow၊ working rules (plan အရင်ပြ၊ ရှိပြီးသားကိုအရင်ရှာ၊ test ပါ၊ test ကိုပြင်ပြီး pass မလုပ်၊ မလိုတာ မလုပ်၊ မသေချာရင်မေး)၊ လုံးဝမလုပ်ရတာ (.env မဖတ်၊ force push မလုပ်၊ မတောင်းတဲ့ dependency မထည့်)။
3. .gitignore: Node/Next.js အတွက် အခြေခံ၊ .env* (.env.example ကလွဲ)၊ .claude/settings.local.json ပါ။
4. .claude/settings.json: .env ဖတ်တာကို deny၊ allow က git status/diff/log လို read-only command ပဲ။ (lint/test command တွေကို Phase 1 မှာ ထပ်ထည့်မယ်)

လုပ်ပုံ:
- Branch `chore/phase-0-setup` ကို main ကနေ ဆောက်ပါ။ main ပေါ်မှာ တိုက်ရိုက် commit မလုပ်ပါနဲ့။
- Plan ကို ငါ OK ပေးပြီးမှ ဖိုင်တွေဆောက်၊ commit တစ်ခုတည်းလုပ်၊ push လုပ်ပါ။
- `gh` ရှိရင် PR ဖွင့်ပါ၊ မရှိရင် push ပြီး GitHub PR link ကို ပြောပါ။
- npm install၊ Next.js scaffold၊ code ရေးတာ လုံးဝမလုပ်ပါနဲ့ (Phase 1 မှာမှ)။
- မသေချာတာရှိရင် မှန်းမလုပ်ဘဲ မေးပါ။

ပြီးရင်: ဖိုင်တစ်ခုချင်းဘာဆောက်ခဲ့လဲ ၁ ကြောင်းစီ၊ PR link၊ ငါ review လုပ်ရမယ့်အချက်တွေကို ပြောပါ။
```
