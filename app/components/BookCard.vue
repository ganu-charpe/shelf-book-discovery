<script setup lang="ts">
import type { Book } from '../../shared/bookModel';
import ShortlistButton from '../components/ShortlistButton';

defineProps<{
    book: Book,
    shortlisted: boolean
}>()

const emit = defineEmits<{
  select: [book: Book]
  toggleShortlist: [book: Book]
}>()
</script>

<template>
  <article
    class="group relative flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:ring-1 hover:ring-indigo-100"
  >
    <!-- Book Cover -->
    <button
      type="button"
      class="relative cursor-pointer aspect-[2/3] w-full overflow-hidden bg-gray-100"
      @click="emit('select', book)"
    >
      <img
        v-if="book.cover"
        :src="book.cover"
        :alt="book.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Fallback -->
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-gray-100 p-4 text-center"
      >
        <div>
          <div class="mb-2 text-4xl">📚</div>
          <p class="text-sm font-medium text-gray-500">
            No cover available
          </p>
        </div>
      </div>

      <!-- Hover overlay -->
      <div
        class="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <span class="p-4 text-sm font-medium text-white">
          View details →
        </span>
      </div>
    </button>

    <!-- Shortlist -->
    <ShortlistButton
      :book="book"
       :active="shortlisted"
      @toggle="emit('toggleShortlist', $event)"
    />

    <!-- Book information -->
    <div class="flex flex-1 flex-col p-4">
      <button
        type="button"
        class="text-left"
        @click="emit('select', book)"
      >
        <h2
          class="line-clamp-2 text-sm font-semibold leading-5 text-gray-900 transition-colors group-hover:text-indigo-600"
          :title="book.title"
        >
          {{ book.title }}
        </h2>
      </button>

      <p
        v-if="book.authors?.length"
        class="mt-2 line-clamp-1 text-xs text-gray-500"
        :title="book.authors.join(', ')"
      >
        {{ book.authors.join(', ') }}
      </p>

      <div
        v-if="book.publishedYear"
        class="mt-auto pt-3"
      >
        <span
          class="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
        >
          {{ book.publishedYear }}
        </span>
      </div>
    </div>
  </article>
</template>