<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <header class="border-b border-gray-200 bg-white">
    <div class="mx-auto flex h-16 max-w-7xl items-center px-6">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm"
          aria-label="Book Discovery logo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 5.5v16A2.5 2.5 0 0 1 6.5 19H20"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7h8M8 11h6"
            />
          </svg>
        </div>

        <!-- Title -->
        <div>
          <h1 class="text-lg font-bold tracking-tight text-gray-900">
            {{ title || 'Book Discovery' }}
          </h1>
          <p class="hidden text-xs text-gray-500 sm:block">
            Discover your next great read
          </p>
        </div>
      </div>
    </div>
  </header>
</template>