<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
  }>(),
  {
    message: 'Loading books...',
  }
)
</script>

<template>
  <div
    class="flex min-h-[320px] w-full flex-col items-center justify-center px-6 py-12"
    role="status"
    aria-live="polite"
  >
    <!-- Loading Icon -->
    <div class="relative flex h-16 w-16 items-center justify-center">
      <!-- Outer spinner -->
      <div
        class="absolute inset-0 rounded-full border-4 border-gray-200"
      />

      <div
        class="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600"
      />

      <!-- Book icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        class="h-7 w-7 text-indigo-600"
        aria-hidden="true"
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

    <!-- Message -->
    <p class="mt-5 text-sm font-medium text-gray-700">
      {{ message }}
    </p>

    <!-- Loading dots -->
    <div class="mt-3 flex items-center gap-1.5">
      <span
        class="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.3s]"
      />
      <span
        class="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.15s]"
      />
      <span
        class="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-600"
      />
    </div>
  </div>
</template>