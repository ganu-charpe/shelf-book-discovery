import type { Book } from '~/../shared/bookModel';

const STORAGE_KEY = 'book-discovery-shortlist';

export const useShortlist = () => {
  const shortlist = useState<Book[]>('book-shortlist', () => [])

  const isInitialized = useState<boolean>(
    'book-shortlist-initialized',
    () => false
  )

  const initialize = () => {
    if (isInitialized.value) {
      return;
    }

    if (import.meta.client) {
      const stored = localStorage.getItem(STORAGE_KEY)

      if (stored) {
        try {
          shortlist.value = JSON.parse(stored)
        } catch {
          shortlist.value = []
        }
      }
    }

    isInitialized.value = true
  }

  const save = () => {
    if (!import.meta.client) {
      return
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(shortlist.value)
    )
  }

  const isShortlisted = (book: Book) => {
    return shortlist.value.some(
      item => item.id === book.id
    )
  }

  const toggleShortlist = (book: Book) => {
    const index = shortlist.value.findIndex(
      item => item.id === book.id
    )

    if (index === -1) {
      shortlist.value.push(book)
    } else {
      shortlist.value.splice(index, 1)
    }

    save()
  }

  const removeFromShortlist = (book: Book) => {
    shortlist.value = shortlist.value.filter(
      item => item.id !== book.id
    )

    save()
  }

  const clearShortlist = () => {
    shortlist.value = []
    save()
  }

  return {
    shortlist,
    isShortlisted,
    toggleShortlist,
    removeFromShortlist,
    clearShortlist,
    initialize,
  }
}