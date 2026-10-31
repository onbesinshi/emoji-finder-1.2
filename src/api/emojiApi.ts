export interface EmojiItem {
  title: string
  emoji: string
  keywords: string
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

function isEmojiItem(value: unknown): value is EmojiItem {
  if (typeof value !== 'object' || value === null) return false
  return (
    'title' in value && typeof value.title === 'string' &&
    'emoji' in value && typeof value.emoji === 'string' &&
    'keywords' in value && typeof value.keywords === 'string'
  )
}

export async function fetchEmojis(
  query: string,
  signal?: AbortSignal,
): Promise<EmojiItem[]> {
  const params = new URLSearchParams()
  if (query.trim()) {
    params.set('q', query.trim())
  }

  const url = `${API_URL}/api/emojis${params.size ? `?${params.toString()}` : ''}`

  let response: Response
  try {
    response = await fetch(url, { signal })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }
    throw new Error('Не удалось подключиться к серверу. Проверьте, запущен ли API.')
  }

  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`)
  }

  const data: unknown = await response.json()
  if (!Array.isArray(data)) {
    throw new Error('Сервер вернул данные в неверном формате.')
  }

  if (!data.every(isEmojiItem)) {
    throw new Error('Сервер вернул данные в неверном формате.')
  }

  return data
}
