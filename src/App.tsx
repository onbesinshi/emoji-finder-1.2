import { useEffect, useState } from 'react'

type EmojiItem = {
  title: string
  emoji: string
  keywords: string
}

function App() {
  const [query, setQuery] = useState('')
  const [emojis, setEmojis] = useState<EmojiItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadEmojis = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          `http://localhost:3000/api/emojis?q=${encodeURIComponent(query)}`,
        )

        if (!response.ok) {
          throw new Error('Failed to load emojis')
        }

        const data: EmojiItem[] = await response.json()
        setEmojis(data)
      } catch {
        setError('Failed to load emojis')
        setEmojis([])
      } finally {
        setLoading(false)
      }
    }

    loadEmojis()
  }, [query])

  return (
    <main className="page">
      <header className="hero">
        <h1>Emoji Finder</h1>
        <p>Find emoji by keywords</p>
      </header>

      <section className="finder" aria-label="Emoji search">
        <label className="visually-hidden" htmlFor="emoji-search">
          Search emoji by keyword
        </label>

        <input
          id="emoji-search"
          type="search"
          placeholder="Placeholder"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {loading && <p className="empty-state">Loading...</p>}
        {error && <p className="empty-state">{error}</p>}

        {!loading && !error && (
          <div className="emoji-grid" aria-live="polite">
            {emojis.map((emoji, index) => (
              <article className="emoji-card" key={`${emoji.title}-${index}`}>
                <span
                  className="emoji-symbol"
                  role="img"
                  aria-label={emoji.title}
                >
                  {emoji.emoji}
                </span>
                <h2>{emoji.title}</h2>
                <p>{emoji.keywords}</p>
              </article>
            ))}

            {emojis.length === 0 && (
              <p className="empty-state">No emoji found</p>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default App