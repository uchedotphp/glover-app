<script setup>
import FeaturedEvent from "./components/FeaturedEvent.vue";
import HeaderSection from "./components/HeaderSection.vue";
import GlobalSearch from "./components/GlobalSearch.vue";
import SingleEvent from "./components/SingleEvent.vue";

import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

let pageLoading = ref(false);

onBeforeMount(async () => {
  pageLoading = true;
  try {
    await store.dispatch("getEvents");
  } catch (error) {
    console.log(error);
  }
  pageLoading = false;
});

// featured events
const featuredEvents = computed(() =>
  store.state.events.filter((e) => e.venue.city === "London")
);

// other events
const otherEvents = computed(() =>
  store.state.events.filter((e) => e.venue.city !== "London")
);
</script>

<template>
  <div
    class="mx-auto max-w-5xl py-7 lg:py-20 px-4 sm:px-6 lg:px-8 min-h-screen"
  >
    <div class="stick-to-top">
      <HeaderSection class="mb-12" />
      <GlobalSearch class="global-search" />
    </div>

    <div class="mb-5">
      <h3 class="section-title mb-5">Featured Events</h3>

      <div class="sm:grid sm:grid-cols-2 sm:gap-6">
        <FeaturedEvent
          v-for="(event, index) in featuredEvents"
          :key="event.id"
          :payload="{ event, index }"
          class="mb-6 sm:mb-0"
        />
      </div>
    </div>

    <div class="mb-5">
      <h3 class="section-title mb-5">All Events</h3>

      <div class="sm:grid sm:grid-cols-4 sm:gap-6">
        <SingleEvent
          v-for="(event, index) in otherEvents"
          :key="event.id"
          :payload="{ event, index }"
          class="mb-6 sm:mb-0"
        />
      </div>
    </div>
  </div>

  <!-- <span v-else class="flex h-3 w-3">
    <span
      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
    ></span>
    <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
  </span> -->
</template>

<style scoped>
.stick-to-top {
  @apply sticky top-0 pb-10 z-10;
  background-color: #e5e5e5;
}
</style>