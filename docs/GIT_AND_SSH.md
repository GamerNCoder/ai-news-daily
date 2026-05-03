# Git identity & SSH — scoped to `arnav/` only

**Scope:** Use Arnav’s author **only** for Git repositories under the **`arnav/`** folder in this workspace (the seven college portfolio projects).  
**Do not** change identity for other folders (e.g. `rachitkumarrastogi`, work repos). Use **local** `git config` inside each `arnav/<project>/` repo — not `--global` — unless it is Arnav’s dedicated machine and he understands it affects every repo on that computer.

| Setting (for `arnav/*` repos only) | Value |
|--------|--------|
| **Name** | `Arnav Rastogi` |
| **Email** | `getarnavrastogi@gmail.com` |
| **GitHub user (repo owner, PR/merge actor)** | **`GamerNCoder`** |
| **Avoid for `arnav/*`** | **`rachitkumarrastogi`** as commit author, as default remote owner, or as the GitHub account that **owns / merges** these repos — portfolio repos belong to **Arnav’s account** above. |

## PRs and merges (GitHub)

Open, approve, and **merge** pull requests while signed in as **`GamerNCoder`**. Merge commits and branch protection should reflect **Arnav** as the project owner, not Rachit’s personal GitHub account.

If you use **GitHub CLI** (`gh pr create`, `gh pr merge`), run it under a **`gh` login that matches `GamerNCoder`** (or a token scoped to those repos) — not `rachitkumarrastogi`, or `gh` will fail or merge under the wrong identity.

## Local Git author in each `arnav` project (after `git init`)

Run **inside** each project folder under `arnav/` (e.g. `arnav/ai-study-planner/`):

```bash
git config user.name "Arnav Rastogi"
git config user.email "getarnavrastogi@gmail.com"
```

These are **repository-local** settings (stored in that repo’s `.git/config`). They do not affect repos outside `arnav/`.

## SSH: one host alias for Arnav’s GitHub (not seven keys)

For **remotes of repos under `arnav/` only**, use host alias **`github.com-gamencoder`** (see your `~/.ssh/config`) so Git uses Arnav’s key. One `Host` entry covers every `GamerNCoder/<repo>` remote; you do **not** need seven separate `Host` blocks.

Set the remote like this (example: study planner):

```bash
git remote add origin git@github.com-gamencoder:GamerNCoder/ai-study-planner.git
```

Same pattern for:

- `GamerNCoder/ai-news-daily`
- `GamerNCoder/ai-robotics-lab`
- `GamerNCoder/teens-wellness-checkin`
- `GamerNCoder/plan-my-education`
- `GamerNCoder/school-clubs-livefeed`
- `GamerNCoder/ai-experiments-lab`

## Why `github.com-gamencoder` instead of `github.com`

The default `Host github.com` entry uses your personal key. Using the **alias** forces Git to use **Arnav’s** key so pushes go as **`GamerNCoder`** without mixing identities.

## Verify SSH

```bash
ssh -T git@github.com-gamencoder
```

You should see a message that you authenticated as **`GamerNCoder`**.
