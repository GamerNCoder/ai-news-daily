/** API client — reuse from Expo with the same `DigestResponse` shape. */

export type Article = {
  source: string
  title: string
  link: string
  summary: string
  score: number
}

export type DigestResponse = {
  interests: string[]
  articles: Article[]
}

function apiBase(): string {
  const env = import.meta.env.VITE_API_BASE
  if (env && env.length > 0) return env.replace(/\/$/, '')
  if (import.meta.env.DEV) return ''
  return ''
}

export async function fetchDigest(interests: string): Promise<DigestResponse> {
  const base = apiBase()
  const path = `/digest?interests=${encodeURIComponent(interests)}`
  const url = base ? `${base}${path}` : path
  const r = await fetch(url)
  if (!r.ok) throw new Error(await r.text())
  return r.json() as Promise<DigestResponse>
}
