<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  payload: Object,
});

const eventDetails = props.payload.event;

const venueName = computed(() => eventDetails.venue.name); // using this inplace of event description

const artistObject = computed(() => {
  const artists = store.getters["availableArtists"];
  return (
    (artists.length &&
      artists.find((a) => a.artist_id === eventDetails.artist_id)?.artist) ||
    {}
  );
});

const artistName = computed(() =>
  Object.values(artistObject).length && "name" in artistObject.value
    ? artistObject.value.name
    : ""
);

const artistImg = computed(() =>
  Object.values(artistObject).length && "image_url" in artistObject.value
    ? artistObject.value.image_url
    : ""
);

const eventTitle = computed(() => {
  const title = eventDetails.title;
  return title.length
    ? title
    : venueName.value.length
    ? venueName.value
    : `Event ${props.payload.index + 1}`;
});

const eventLocation = computed(() => eventDetails.venue.country);

const eventDate = computed(() =>
  new Date(eventDetails.starts_at).toDateString()
);

const disablePurchaseBtn = computed(() => !props.payload.event.url.length);

function purchaseTicket() {
  const ticketUrl = props.payload.event.url;
  window.open(ticketUrl, "_blank");
}
</script>

<template>
  <div class="card">
    <div
      class="mb-4 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100"
    >
      <img
        :src="artistImg"
        :alt="artistName"
        class="slide-img"
      />
    </div>
    <p class="title">{{ artistName }} {{ eventTitle }}</p>

    <div class="md:flex md:items-center md:justify-between">
      <div class="">
        <div class="flex mt-3.5">
          <div class="mr-7 details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 flex-shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <span class="ml-2.5"> {{ eventLocation }} </span>
          </div>

          <div class="details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 flex-shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>

            <span class="ml-2.5 truncate"> {{ eventDate }} </span>
          </div>
        </div>

        <div class="mt-3.5 details">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 flex-shrink-0 -rotate-45"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
            />
          </svg>

          <p class="ml-2.5">
            Starting from <span class="figure"> ₦15,000 </span>
          </p>
        </div>
      </div>

      <div class="mt-3 md:mt-0">
        <button
          :disabled="disablePurchaseBtn"
          @click="purchaseTicket"
          type="button"
          class="btn"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  .title {
    font-size: 14px;
    line-height: 17.6px;
  }

  .details {
    font-size: 14px;
    line-height: 17.6px;
  }

  .figure {
    @apply text-glover-purple text-base font-semibold;
  }

  .btn {
    @apply p-3;
    font-size: 16px;
    line-height: 20.11px;
  }
}
</style>