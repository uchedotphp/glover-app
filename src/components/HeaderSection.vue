<script setup>
import UserAvatar from "./UserAvatar.vue";
</script>

<template>
  <header class="flex justify-between items-center">
    <h2 class="page-header-title">Events</h2>

    <div class="flex items-center space-x-4">
      <UserAvatar />

      <h3 class="name">Bernice</h3>

      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-gray-300 bg-gray-300 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <svg
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.name {
  font-weight: 700;
  font-size: 15px;
  line-height: 21px;
  color: #000000;
}
</style>