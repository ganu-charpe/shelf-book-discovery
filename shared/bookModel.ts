export type Book = {
  id: string
  title: string
  authors: string[]
  publishedYear: number | null | undefined
  cover: string | null
};

export type BooksResponse = {
  totalItems: number
  books: Book[]
};

export type BookDetail = {
  id: string
  title: string
  authors: string[]
  publishedYear?: number
  description: string
  cover: string
  publisher: string
  pageCount: number
  categories: string[]
  averageRating?: number
  ratingsCount?: number
  language: string
  previewLink: string
};

export type GoogleBookResponse = {
  id: string
  volumeInfo: {
    title?: string
    authors?: string[]
    publishedDate?: string
    description?: string
    imageLinks?: {
      thumbnail?: string
      smallThumbnail?: string
    }
    publisher?: string
    pageCount?: number
    categories?: string[]
    averageRating?: number
    ratingsCount?: number
    language?: string
    previewLink?: string
    infoLink?: string
  }
};