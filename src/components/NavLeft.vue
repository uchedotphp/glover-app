<template>
  <button
    type="button"
    class="top-0 -left-14 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    data-carousel-prev
  >
    <span
      class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:outline-none"
    >
      <svg
        aria-hidden="true"
        class="w-4 h-4 text-glover-purple dark:text-glover-purple"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
      <span class="sr-only">Previous</span>
    </span>
  </button>
</template>

<script setup></script>

<style lang="scss" scoped></style>