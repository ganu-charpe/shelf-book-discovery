<script setup lang="ts">
import type { Book, BooksResponse } from "./../../shared/bookModel.ts";
import BookGrid from "../components/BookGrid";
import AppHeader from "../components/AppHeader";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";

const {
  shortlist,
  toggleShortlist,
  initialize,
} = useShortlist();

onMounted(() => {
  initialize();
})

const searchInput = ref("");
const searchQuery = ref("");

const { data, pending, error } = await useFetch<BooksResponse>("/api/books", {
  query: {
    q: searchQuery,
  },
  watch: [searchQuery],
});

let debounceTimer: ReturnType<typeof setTimeout>;

const books = computed(() => data.value?.books ?? []);

const handleSearch = (query: string) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    searchQuery.value = query.trim();
  }, 500);
};

const handleBookSelect = (book: Book) => {
    console.log('Selected book:', book)
    navigateTo(`/books/${book.id}`)
  // Later you can open BookDetails modal/page
};

const handleToggleShortlist = (book: Book) => {
    console.log('Toggle shortlist:', book)
    toggleShortlist(book)
};
</script>

<template>
  <main>
    <AppHeader title="Book Discovery" />
     <div class="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8">
         <SearchBar v-model="searchInput" @search="handleSearch" />
     </div>

    <LoadingState v-if="pending" />

    <div v-else-if="error">Failed to load books.</div>

    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8"
        v-else-if="books.length">
        <BookGrid
        :books="books"
        @select="handleBookSelect"
        @toggle-shortlist="handleToggleShortlist"
        />
    </div>

    <div v-else="error">Failed to load books.</div>
  </main>
</template>
