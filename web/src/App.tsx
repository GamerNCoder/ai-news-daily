import { useCallback, useState } from 'react'
import { fetchDigest, type Article } from './lib/api'

export default function App() {
  const [interests, setInterests] = useState('ai,robotics,safety')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [articles, setArticles] = useState<Article[]>([])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const d = await fetchDigest(interests)
      setArticles(d.articles)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }, [interests])

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.6rem)' }}>AI News Daily</h1>
      <p style={{ color: '#94a3b8', fontSize: 15 }}>
        Web UI for the FastAPI digest. Dev: run API on <code>:8010</code> and this app uses the Vite proxy. Production: set{' '}
        <code>VITE_API_BASE</code> to your API origin.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12, alignItems: 'stretch' }}>
        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Comma interests"
          style={{
            flex: '1 1 200px',
            minWidth: 0,
            padding: 12,
            borderRadius: 8,
            border: '1px solid #334155',
            background: '#1e293b',
            color: '#f8fafc',
            fontSize: 16,
          }}
        />
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          style={{
            padding: '12px 20px',
            minHeight: 44,
            borderRadius: 8,
            border: 'none',
            background: loading ? '#475569' : '#2563eb',
            color: '#fff',
            fontWeight: 600,
            cursor: loading ? 'wait' : 'pointer',
            fontSize: 16,
          }}
        >
          {loading ? 'Loading…' : 'Load digest'}
        </button>
      </div>

      {error ? (
        <p style={{ color: '#fca5a5' }} role="alert">
          {error}
        </p>
      ) : null}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {articles.map((a, i) => (
          <li
            key={`${a.link}-${i}`}
            style={{
              padding: '14px 0',
              borderBottom: '1px solid #334155',
            }}
          >
            <div style={{ fontSize: 12, color: '#94a3b8' }}>
              {a.source} · score {a.score.toFixed(1)}
            </div>
            <a href={a.link} target="_blank" rel="noreferrer" style={{ fontWeight: 600, fontSize: '1.05rem' }}>
              {a.title}
            </a>
            {a.summary ? <p style={{ margin: '6px 0 0', color: '#cbd5e1', fontSize: 14 }}>{a.summary}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
