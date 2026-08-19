<script setup lang="ts">

const { shortlist, initialize } = useShortlist();

onMounted(() => {
  initialize();
});

const goToShortlist = () => {
  navigateTo("/shortlist");
};

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
  }>(),
  {
    modelValue: "",
    placeholder: "Search books by title, author",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  search: [value: string];
}>();

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const handleSearch = () => {
  emit("search", searchQuery.value.trim());
};

const clearSearch = () => {
  searchQuery.value = "";
  emit("search", "");
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    handleSearch();
  }
};
</script>

<template>
  <div class="flex items-center gap-4">
    <!-- Label -->
    <label for="book-search" class="shrink-0 text-sm font-medium text-gray-700">
      Search books
    </label>

    <!-- Search Input -->
    <div class="relative min-w-0 flex-1">
      <!-- Search icon -->
      <div
        class="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
          />
        </svg>
      </div>

      <input
        id="book-search"
        v-model="searchQuery"
        type="search"
        :placeholder="placeholder"
        autocomplete="off"
        class="h-12 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-12 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        @keydown="handleKeydown"
      />

      <!-- Clear button -->
      <button
        v-if="searchQuery"
        type="button"
        aria-label="Clear search"
        title="Clear search"
        class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        @click="clearSearch"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Search button -->
    <div class="group relative shrink-0">
      <button
        type="button"
        aria-label="Search books"
        class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        @click="handleSearch"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
          />
        </svg>
      </button>

      <!-- Tooltip -->
      <span
        class="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg group-hover:block"
      >
        Search books
      </span>
    </div>

    <!-- Shortlist -->
    <button
      type="button"
      class="group inline-flex h-12 shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
      title="View your saved books"
      @click="goToShortlist"
    >
      <svg
        class="h-5 w-5 transition group-hover:scale-110"
        :fill="shortlist?.length ? 'currentColor' : 'none'"
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

      <span class="whitespace-nowrap"> My Shortlist </span>

      <span
        class="inline-flex min-w-5 items-center justify-center rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-semibold text-indigo-700"
      >
        {{ shortlist.length }}
      </span>
    </button>
  </div>
</template>
