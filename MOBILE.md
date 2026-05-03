# Web → native mobile

- **API:** keep FastAPI as the single source of truth; Expo calls the same `/digest` JSON over HTTPS.
- **Client:** copy `web/src/lib/api.ts` (or publish a tiny shared package) into an Expo app; replace `fetch` with the same URLs.
- **Offline:** optional cache of last digest in AsyncStorage; refresh on pull-to-refresh.
