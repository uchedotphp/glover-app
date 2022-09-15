<script setup>
import FeaturedEvent from "./components/FeaturedEvent.vue";
import HeaderSection from "./components/HeaderSection.vue";
import GlobalSearch from "./components/GlobalSearch.vue";
import SingleEvent from "./components/SingleEvent.vue";
import NoDataFound from "./components/NoDataFound.vue";
import LoadingState from "./components/LoadingState.vue";

import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const pageLoading = ref(false);

onBeforeMount(async () => {
  pageLoading.value = true;
  try {
    await store.dispatch("getEvents");
  } catch (error) {
    console.log(error);
  }
  pageLoading.value = false;
});

// all events
const events = computed(() => store.state.events);

// featured events
const featuredEvents = computed(
  () =>
    (events.value.length &&
      events.value.filter((e) => e.venue.city === "London")) ||
    []
);

// other events
const otherEvents = computed(
  () =>
    (events.value.length &&
      events.value.filter((e) => e.venue.city !== "London")) ||
    []
);

// generate random images
const randomImages = computed(() => {
  // const images = [];
  if (otherEvents.value.length) {
    // for (let index = 0; index < otherEvents.value.length; index++) {
    //   const a = 'https://source.unsplash.com/random'
    //   images.push(a);
    // }
  }
  // return images;
});
</script>

<template>
  <div
    v-if="!pageLoading"
    class="mx-auto max-w-5xl py-7 lg:py-20 px-4 sm:px-6 lg:px-8 min-h-screen"
  >
    <div class="stick-to-top">
      <HeaderSection class="mb-12" />
      <GlobalSearch class="global-search" />
    </div>

    <div class="mb-5">
      <h3 class="section-title mb-5">Featured Events</h3>

      <div v-if="featuredEvents.length" class="sm:grid sm:grid-cols-2 sm:gap-6">
        <FeaturedEvent
          v-for="(event, index) in featuredEvents"
          :key="event.id"
          :payload="{ event, index }"
          class="mb-6 sm:mb-0"
        />
      </div>

      <NoDataFound title="featured events" v-else />
    </div>

    <div class="mb-5">
      <h3 class="section-title mb-5">All Events</h3>

      <div v-if="otherEvents.length" class="sm:grid sm:grid-cols-4 sm:gap-6">
        <SingleEvent
          v-for="(event, index) in otherEvents"
          :key="event.id"
          :payload="{ event, index }"
          class="mb-6 sm:mb-0"
        />
      </div>

      <NoDataFound title="events" v-else />
    </div>
  </div>

  <LoadingState v-else />
</template>

<style scoped>
.stick-to-top {
  @apply sticky top-0 pb-10 z-10;
  background-color: #e5e5e5;
}
</style>