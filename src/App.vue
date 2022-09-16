<script setup>
import FeaturedEvent from "./components/FeaturedEvent.vue";
import HeaderSection from "./components/HeaderSection.vue";
import GlobalSearch from "./components/GlobalSearch.vue";
import SingleEvent from "./components/SingleEvent.vue";
import NoDataFound from "./components/NoDataFound.vue";
import LoadingState from "./components/LoadingState.vue";
import NavRight from "./components/NavRight.vue";

import { ref, onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();

const pageLoading = ref(false);
const allEvents = ref(null);

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

// other events
const otherEvents = computed(() => store.getters["eventsBySearchTerm"]);

// featured events
const featuredEvents = computed(
  () =>
    (events.value.length &&
      events.value.filter((e) => e.venue.city.toLowerCase() === "london")) ||
    []
);

// watch global search and bring all events category into users view
const globalSearch = computed(() => store.state.searchTerm);
watch(globalSearch, (newValue) => {
  if (Boolean(newValue)) {
    setTimeout(() => {
      allEvents.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }
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

      <div v-if="featuredEvents.length" class="relative overflow-x-hidden">
        <div
          class="flex overflow-x-scroll sm:overflow-x-hidden sm:grid sm:grid-cols-2 sm:gap-6 relative"
        >
          <FeaturedEvent
            v-for="(event, index) in featuredEvents"
            :key="event.id"
            :payload="{ event, index }"
            class="mb-6 sm:mb-0 mr-6 md:mr-0 last:mr-0"
          />
        </div>
        <NavRight class="absolute" />
      </div>

      <NoDataFound title="featured events" v-else />
    </div>

    <div ref="allEvents" class="mb-5">
      <h3 class="section-title mb-5">All Events</h3>

      <div
        v-if="otherEvents.length"
        class="sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-6"
      >
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
  @apply sticky top-0 pb-10 z-50;
  background-color: #e5e5e5;
}
</style>