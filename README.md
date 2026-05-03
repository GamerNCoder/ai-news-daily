# AI News Daily

RSS → **keyword interest filter** → ranked JSON. Designed for a future **daily email** with strict opt-in.

## Ethics / product

- **No email is sent** from this repo. Wire [Resend](https://resend.com) or similar only after:
  - confirmed double opt-in,
  - unsubscribe link,
  - rate limits.
- Respect each publisher’s **terms**; cache politely; this MVP fetches on demand.

## API (FastAPI)

```bash
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8010
```

- `GET /health` — liveness.
- `GET /digest?interests=ai,robotics,safety` — merged feeds, scored by token overlap + light regex boosts.
- `GET /email-preview?interests=ai` — **plain-text preview only** (no send).

## Web app (Vite + React)

Responsive UI + **PWA manifest** under `web/`. API client types live in `web/src/lib/api.ts` for reuse in **Expo** later (see `MOBILE.md` in repo root).

```bash
# Terminal 1 — API
uvicorn app.main:app --reload --port 8010

# Terminal 2 — web (proxies /digest → :8010)
cd web && npm install && npm run dev
```

Production build: set `VITE_API_BASE` to your deployed API origin (see `web/.env.example`), then `cd web && npm run build` and host `web/dist` on any static host (CORS must allow that origin on the API).

## Optional LLM layer

Add a `POST /summarize` that takes top N article URLs and runs your model — keep **citations** and **source lines** in output for trust.

## License

MIT — portfolio / Arnav Rastogi.
