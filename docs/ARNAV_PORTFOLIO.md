# Arnav — college portfolio projects

Seven **standalone** folders (each can become its own public GitHub repo). Pick 2–3 to deepen for essays; keep READMEs honest about scope and ethics.

| Folder | Stack | One-line |
|--------|--------|----------|
| [ai-study-planner](./ai-study-planner/) | Vite + React (PWA-ready) | Tasks → greedy weekly blocks; logic in `src/lib/planner.ts` |
| [ai-news-daily](./ai-news-daily/) | FastAPI + Vite `web/` | RSS digest API + responsive web UI + `MOBILE.md` |
| [ai-robotics-lab](./ai-robotics-lab/) | Vite + React (PWA-ready) | Grid + BFS + `MOBILE.md` |
| [teens-wellness-checkin](./teens-wellness-checkin/) | Vite + React (PWA-ready) | Mood journal + `MOBILE.md` |
| [plan-my-education](./plan-my-education/) | Vite + React (PWA-ready) | Wizard + `MOBILE.md` |
| [school-clubs-livefeed](./school-clubs-livefeed/) | Vite + React (PWA-ready) | Club feed + mod queue + `MOBILE.md` |
| [ai-experiments-lab](./ai-experiments-lab/) | Vite + React (PWA-ready) | `src/lib/rag.ts` + `MOBILE.md` |

Each app includes **`MOBILE.md`**: how to extend with **Expo** while reusing shared TypeScript modules.

## Git / GitHub — Arnav only (this `arnav/` tree)

**Owning identity (all repos under `arnav/`):**

| Role | Value |
|------|--------|
| **Name** | Arnav Rastogi |
| **Email** | getarnavrastogi@gmail.com |
| **GitHub user** | **GamerNCoder** |
| **Not** | Rachit / **rachitkumarrastogi** as repo owner, merge actor, or commit author for these projects |

**Scope:** That identity applies **only** to Git repos under **`arnav/<project>/`**. Other folders in `startUp` can use different accounts. Use **local** `git config` in each `arnav` repo (see [`GIT_AND_SSH.md`](./GIT_AND_SSH.md)).

**SSH:** host alias **`github.com-gamencoder`** so `git push` uses Arnav’s key and **`GamerNCoder/<repo>`** remotes (see [`GIT_AND_SSH.md`](./GIT_AND_SSH.md)).

**PRs / merges:** Create and **merge** pull requests on GitHub as **`GamerNCoder`**. Use `gh` logged in as **`GamerNCoder`** if you automate PRs from the terminal — not `rachitkumarrastogi`.

### New clone workflow (per app)

```bash
git clone git@github.com-gamencoder:GamerNCoder/<repo-name>.git
cd <repo-name>
git config user.name "Arnav Rastogi"
git config user.email "getarnavrastogi@gmail.com"
```

Optional helper after remotes exist:

```bash
chmod +x arnav/push-all-after-remote-exists.sh
./arnav/push-all-after-remote-exists.sh
```

## License

Per-project READMEs default to MIT for portfolio use; adjust as you like.
