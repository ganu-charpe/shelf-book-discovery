<script setup lang="ts">
import type { Book } from '../../../shared/bookModel';

const route = useRoute()

const bookId = computed(() => route.params.id as string)

const {
  data: book,
  pending,
  error,
} = await useFetch<Book>(() => `/api/books/${bookId.value}`)

const {
  isShortlisted,
  toggleShortlist,
} = useShortlist()

const handleToggleShortlist = () => {
  if (book.value) {
    toggleShortlist(book.value)
  }
}

const goBack = () => {
  navigateTo('/')
}

useHead(() => ({
  title: book.value
    ? `${book.value.title} | Book Discovery`
    : 'Book Details | Book Discovery',
}))
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <AppHeader title="Book Discovery" />

    <!-- Loading -->
    <LoadingState
      v-if="pending"
      message="Loading book details..."
    />

    <!-- Error -->
    <div
      v-else-if="error"
      class="mx-auto flex min-h-[500px] max-w-3xl items-center justify-center px-6"
    >
      <div
        class="w-full rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
      >
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100"
        >
          <svg
            class="h-7 w-7 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v4m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.53 20h14.94a2 2 0 001.74-3.14l-7.5-13a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        <h2 class="mt-4 text-xl font-semibold text-gray-900">
          Book not found
        </h2>

        <p class="mt-2 text-sm text-gray-600">
          We couldn't load the details for this book.
        </p>

        <button
          type="button"
          class="mt-6 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          @click="goBack"
        >
          ← Back to books
        </button>
      </div>
    </div>

    <!-- Book Details -->
    <div
      v-else-if="book"
      class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <!-- Back -->
      <button
        type="button"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
        @click="goBack"
      >
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>

        Back to books
      </button>

      <!-- Main Card -->
      <section
        class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        <div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[300px_1fr] lg:p-10">
          <!-- Cover -->
          <div>
            <div
              class="mx-auto aspect-[2/3] w-full max-w-[300px] overflow-hidden rounded-xl bg-gray-100 shadow-md"
            >
              <img
                v-if="book.cover"
                :src="book.cover"
                :alt="book.title"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full items-center justify-center text-center text-gray-400"
              >
                <div>
                  <div class="text-6xl">📚</div>
                  <p class="mt-3 text-sm">
                    No cover available
                  </p>
                </div>
              </div>
            </div>

            <!-- Shortlist -->
            <button
              type="button"
              class="mx-auto mt-5 flex w-full max-w-[300px] items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition"
              :class="
                isShortlisted(book)
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-500 hover:text-indigo-600'
              "
              @click="handleToggleShortlist"
            >
              <svg
                class="h-5 w-5"
                :fill="isShortlisted(book) ? 'currentColor' : 'none'"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z"
                />
              </svg>

              {{
                isShortlisted(book)
                  ? 'Remove from shortlist'
                  : 'Add to shortlist'
              }}
            </button>
          </div>

          <!-- Information -->
          <div class="flex flex-col">
            <!-- Title -->
            <div>
              <h1
                class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                {{ book.title }}
              </h1>

              <!-- Authors -->
              <p
                v-if="book.authors?.length"
                class="mt-3 text-lg text-gray-600"
              >
                By
                <span class="font-medium text-gray-800">
                  {{ book.authors.join(', ') }}
                </span>
              </p>
            </div>

            <!-- Meta -->
            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-if="book.publishedYear"
                class="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
              >
                Published {{ book.publishedYear }}
              </span>

              <span
                v-if="book.publisher"
                class="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
              >
                {{ book.publisher }}
              </span>

              <span
                v-if="book.pageCount"
                class="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
              >
                {{ book.pageCount }} pages
              </span>

              <span
                v-if="book.language"
                class="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium uppercase text-gray-700"
              >
                {{ book.language }}
              </span>
            </div>

            <!-- Rating -->
            <div
              v-if="book.averageRating"
              class="mt-6 flex items-center gap-3"
            >
              <div class="flex items-center gap-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="h-5 w-5"
                  :class="
                    star <= Math.round(book.averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  "
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.96 8.72c-.783-.57-.38-1.81.588-1.81H7.01a1 1 0 00.95-.69l1.09-3.293z"
                  />
                </svg>
              </div>

              <span class="text-sm font-semibold text-gray-700">
                {{ book.averageRating }}/5
              </span>

              <span
                v-if="book.ratingsCount"
                class="text-sm text-gray-500"
              >
                ({{ book.ratingsCount }} ratings)
              </span>
            </div>

            <!-- Description -->
            <div
              v-if="book.description"
              class="mt-8"
            >
              <h2 class="text-lg font-semibold text-gray-900">
                About this book
              </h2>

              <div
                class="prose prose-sm mt-3 max-w-none leading-7 text-gray-600"
                v-html="book.description"
              />
            </div>

            <!-- Categories -->
            <div
              v-if="book.categories?.length"
              class="mt-7"
            >
              <h2 class="text-sm font-semibold text-gray-900">
                Categories
              </h2>

              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="category in book.categories"
                  :key="category"
                  class="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                >
                  {{ category }}
                </span>
              </div>
            </div>

            <!-- Preview -->
            <div
              v-if="book.previewLink"
              class="mt-auto pt-8"
            >
              <a
                :href="book.previewLink"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Preview this book

                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>