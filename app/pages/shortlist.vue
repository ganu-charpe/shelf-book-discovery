<script setup lang="ts">
const {
  shortlist,
  initialize,
} = useShortlist();

onMounted(() => {
  initialize();
});

const goToDiscover = () => {
  navigateTo('/')
};

const clearAll = () => {
  if (!shortlist.value.length) {
    return;
  }

  if (confirm('Are you sure you want to remove all shortlisted books?')) {
    const { clearShortlist } = useShortlist()
    clearShortlist()
  }
};

useHead({
  title: 'My Shortlist | Book Discovery',
});
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <AppHeader title="Book Discovery" />

    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div
        class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"
            >
              <svg
                class="h-6 w-6"
                :fill="shortlist.length ? 'currentColor' : 'none'"
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
            </div>

            <div>
              <h1
                class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              >
                My Shortlist
              </h1>

              <p class="mt-1 text-sm text-gray-500">
                {{ shortlist.length }}
                {{ shortlist.length === 1 ? 'book' : 'books' }} saved
              </p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600"
            @click="goToDiscover"
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

            Discover Books
          </button>

          <button
            v-if="shortlist.length"
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
            @click="clearAll"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-8 0h10"
              />
            </svg>

            Clear all
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!shortlist.length"
        class="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center"
      >
        <div
          class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50"
        >
          <svg
            class="h-10 w-10 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z"
            />
          </svg>
        </div>

        <h2 class="mt-6 text-xl font-semibold text-gray-900">
          Your shortlist is empty
        </h2>

        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          Discover books you love and add them to your shortlist.
          Your saved books will appear here.
        </p>

        <button
          type="button"
          class="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          @click="goToDiscover"
        >
          Discover Books

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
              d="M5 12h14m-6-6 6 6-6 6"
            />
          </svg>
        </button>
      </div>

      <!-- Shortlisted Books -->
      <section v-else>
        <div
          class="mb-5 flex items-center justify-between"
        >
          <h2 class="text-lg font-semibold text-gray-900">
            Saved Books
          </h2>

          <span
            class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
          >
            {{ shortlist.length }} saved
          </span>
        </div>

        <BookGrid
          :books="shortlist"
        />
      </section>
    </div>
  </main>
</template>