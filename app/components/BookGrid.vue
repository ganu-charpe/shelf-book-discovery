<script setup lang="ts">
import type { Book } from '../../shared/bookModel';
import { useShortlist } from '../composables/useShortlist.ts';

defineProps<{
  books: Book[]
}>()

const {
  isShortlisted,
} = useShortlist();

const emit = defineEmits<{
  select: [book: Book]
  toggleShortlist: [book: Book]
}>()
</script>

<template>
  <div
    class="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
  >
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
      :shortlisted="isShortlisted(book)"
      @select="emit('select', $event)"
      @toggle-shortlist="emit('toggleShortlist', $event)"
    />
  </div>
</template>