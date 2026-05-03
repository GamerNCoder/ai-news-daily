# PRs: web + PWA + mobile extension work

## Owner account (required)

For **every repo under `arnav/`**, the GitHub **owner** and the account that should **open, review, and merge** PRs is:

| | |
|--|--|
| **Name** | Arnav Rastogi |
| **Email** | getarnavrastogi@gmail.com |
| **GitHub** | **`GamerNCoder`** |

**Not** Rachit / **`rachitkumarrastogi`** as merge owner or default identity for these repos.

Branch on every repo: **`feat/web-pwa-mobile-ready`** (pushed to `origin`).

---

## Why `gh` failed on some machines

If **GitHub CLI** (`gh`) is logged in as **`rachitkumarrastogi`**, `gh pr create` / `gh pr merge` on **`GamerNCoder/*`** will fail (**must be a collaborator**) or would merge under the wrong account. **Fix:** `gh auth login` as **`GamerNCoder`**, or use a **fine-grained PAT** owned by **`GamerNCoder`** with repo access.

**Git push** can still work via SSH **`github.com-gamencoder`** (Arnav’s key); that is separate from which account **`gh`** uses.

---

## Open a PR in one click (signed in as `GamerNCoder`)

| Repo | Create PR |
|------|-----------|
| ai-study-planner | [Create PR](https://github.com/GamerNCoder/ai-study-planner/compare/main...feat/web-pwa-mobile-ready?quick_pull=1&title=feat%3A%20responsive%20web%2C%20PWA%20manifest%2C%20shared%20planner%20lib&body=-%20Responsive%20layout%20%2B%20safe-area%0A-%20PWA%20manifest%20%2B%20icon%0A-%20%60src%2Flib%2Fplanner.ts%60%20for%20Expo%20reuse%0A-%20%60MOBILE.md%60) |
| ai-news-daily | [Create PR](https://github.com/GamerNCoder/ai-news-daily/compare/main...feat/web-pwa-mobile-ready?quick_pull=1&title=feat%3A%20web%20app%20%2B%20PWA%20%2B%20API%20client%20for%20mobile&body=-%20%60web%2F%60%20Vite%20UI%20with%20dev%20proxy%0A-%20%60web%2Fsrc%2Flib%2Fapi.ts%60%20for%20Expo%0A-%20PWA%20manifest%20%2B%20%60MOBILE.md%60) |
| ai-robotics-lab | [Create PR](https://github.com/GamerNCoder/ai-robotics-lab/compare/main...feat/web-pwa-mobile-ready?quick_pull=1&title=feat%3A%20responsive%20PWA%20%2B%20mobile%20notes&body=-%20PWA%20manifest%0A-%20Safe-area%20%2B%20touch%20targets%0A-%20%60MOBILE.md%60) |
| teens-wellness-checkin | [Create PR](https://github.com/GamerNCoder/teens-wellness-checkin/compare/main...feat/web-pwa-mobile-ready?quick_pull=1&title=feat%3A%20responsive%20PWA%20%2B%20mobile%20notes&body=-%20PWA%20manifest%0A-%20Touch-friendly%20controls%0A-%20%60MOBILE.md%60) |
| plan-my-education | [Create PR](https://github.com/GamerNCoder/plan-my-education/compare/main...feat/web-pwa-mobile-ready?quick_pull=1&title=feat%3A%20responsive%20PWA%20%2B%20mobile%20notes&body=-%20PWA%20manifest%0A-%20Wizard%20touch%20targets%0A-%20%60MOBILE.md%60) |
| school-clubs-livefeed | [Create PR](https://github.com/GamerNCoder/school-clubs-livefeed/compare/main...feat/web-pwa-mobile-ready?quick_pull=1&title=feat%3A%20responsive%20PWA%20%2B%20mobile%20notes&body=-%20PWA%20manifest%0A-%20Moderation%20buttons%20sized%20for%20mobile%0A-%20%60MOBILE.md%60) |
| ai-experiments-lab | [Create PR](https://github.com/GamerNCoder/ai-experiments-lab/compare/main...feat/web-pwa-mobile-ready?quick_pull=1&title=feat%3A%20PWA%20%2B%20%60src%2Flib%2Frag.ts%60%20for%20Expo&body=-%20RAG%20helpers%20extracted%0A-%20Responsive%20token%20grid%0A-%20%60MOBILE.md%60) |

## Merge to `main`

While logged in as **`GamerNCoder`**: **Review → Merge pull request**.  
Then locally (with Arnav’s SSH remote):

```bash
git checkout main && git pull origin main && git branch -d feat/web-pwa-mobile-ready
```

## `gh` as `GamerNCoder` (optional)

```bash
gh auth login -h github.com
# complete flow as GamerNCoder, then:
gh pr create --repo GamerNCoder/ai-study-planner --base main --head feat/web-pwa-mobile-ready --title "..." --body "..."
gh pr merge --repo GamerNCoder/ai-study-planner <PR#> --merge --delete-branch
```

## Review checklist

- [ ] `npm install && npm run dev` (and for **ai-news-daily**, API `:8010` + `cd web && npm run dev`)
- [ ] Narrow viewport — readable, tappable
- [ ] No secrets; `web/.env.example` only documents `VITE_API_BASE`
