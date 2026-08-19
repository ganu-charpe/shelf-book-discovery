<script setup lang="ts">
import type { Book } from '../../shared/bookModel';

withDefaults(
  defineProps<{
    book: Book
    active?: boolean
  }>(),
  {
    active: false,
  }
)

const emit = defineEmits<{
  toggle: [book: Book]
}>()
</script>

<template>
  <button
    type="button"
    :aria-label="active ? 'Remove from shortlist' : 'Add to shortlist'"
    :title="active ? 'Remove from shortlist' : 'Add to shortlist'"
    class="cursor-pointer group/shortlist absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur transition hover:scale-110"
    :class="active ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'"
    @click.stop="emit('toggle', book)"
  >
    <svg
      class="h-5 w-5"
      :fill="active ? 'currentColor' : 'none'"
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

    <!-- Tooltip -->
    <span
      class="pointer-events-none absolute right-0 top-full mt-2 hidden whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg group-hover/shortlist:block"
    >
      {{ active ? 'Remove from shortlist' : 'Add to shortlist' }}

      <span
        class="absolute bottom-full right-3 h-0 w-0 border-x-4 border-b-4 border-x-transparent border-b-gray-900"
      />
    </span>
  </button>
</template>