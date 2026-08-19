import { createError, getQuery } from 'h3'
import type { GoogleBookResponse } from '../../../shared/bookModel';

type GoogleBooksResponse  = {
  totalItems: number
  items?: GoogleBookResponse[]
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const query = getQuery(event)

  const searchQuery =
    typeof query.q === 'string' && query.q.trim()
      ? query.q.trim()
      : 'books'

  try {
    const response = await $fetch<GoogleBooksResponse>(
      'https://www.googleapis.com/books/v1/volumes',
      {
        query: {
          q: searchQuery,
          key: config.googleBooksApiKey,
        },
      },
    )

    return {
      totalItems: response.totalItems ?? 0,
      books: (response.items ?? []).map((book) => ({
        id: book.id,
        title: book.volumeInfo.title ?? 'Unknown title',
        authors: book.volumeInfo.authors ?? [],
        publishedYear: book.volumeInfo.publishedDate
          ? Number(book.volumeInfo.publishedDate.slice(0, 4))
          : null,
        cover:
          book.volumeInfo.imageLinks?.thumbnail ??
          book.volumeInfo.imageLinks?.smallThumbnail ??
          null,
      })),
    }
  } catch (error) {
    console.error('Google Books API error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to fetch books',
    })
  }
})