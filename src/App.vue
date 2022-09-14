<script setup>
import FeaturedEvent from "./components/FeaturedEvent.vue";
import HeaderSection from "./components/HeaderSection.vue";
import GlobalSearch from "./components/GlobalSearch.vue";
import SingleEvent from "./components/SingleEvent.vue";
</script>

<template>
  <div
    class="mx-auto max-w-5xl py-7 lg:py-20 px-4 sm:px-6 lg:px-8 min-h-screen"
  >
    <HeaderSection class="mb-12" />
    <GlobalSearch class="mb-10 global-search" />

    <div class="mb-5">
      <h3 class="section-title mb-5">Featured Events</h3>

      <div class="sm:grid sm:grid-cols-2 sm:gap-6">
        <FeaturedEvent v-for="n in 2" :key="n" class="mb-6 sm:mb-0" />
      </div>
    </div>

    <div class="mb-5">
      <h3 class="section-title mb-5">All Events</h3>

      <div class="sm:grid sm:grid-cols-4 sm:gap-6">
        <SingleEvent v-for="n in 8" :key="n" class="mb-6 sm:mb-0" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>