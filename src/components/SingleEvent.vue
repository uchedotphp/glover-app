<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  payload: Object,
});

const eventDetails = props.payload.event;

const eventLocation = computed(
  () => `${eventDetails.venue.country} (${eventDetails.venue.name})`
);

const eventDate = computed(() => {
  const eventDate = eventDetails.starts_at;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${new Date(eventDate).getDate()} ${
    months[new Date(eventDate).getMonth()]
  }`;
});

const randomImage = ref("https://source.unsplash.com/random");

const disablePurchaseBtn = computed(() => !eventDetails.url.length);

function purchaseTicket() {
  const ticketUrl = eventDetails.url;
  window.open(ticketUrl, "_blank");
}
</script>

<template>
  <div class="card">
    <div
      class="mb-4 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100"
    >
      <img
        :src="`https://source.unsplash.com/random?${props.payload.index}`"
        alt="random unsplash images"
        class="slide-img"
      />
    </div>

    <div class="relative">
      <p class="title">{{ eventDetails.title }}</p>

      <!-- date badge -->
      <span class="badge">{{ eventDate }}</span>

      <div class="sm:flex sm:items-center sm:justify-between relative">
        <div>
          <div class="flex mt-3">
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
          </div>

          <div class="mt-3 details">
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
      </div>
    </div>

    <div class="mt-3">
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
</template>

<style lang="scss" scoped>
.card {
  .title {
    font-size: 12px;
    line-height: 15.08px;
  }

  .badge {
    @apply absolute top-0 right-0 inline-flex items-center rounded-md p-2 font-semibold;
    font-size: 10px;
    line-height: 13px;
    color: #ff6a2c;
    background: rgba(255, 106, 44, 0.08);
  }

  .details {
    font-size: 12px;
    line-height: 15.08px;
  }

  .figure {
    @apply text-glover-purple text-sm font-semibold;
  }

  .btn {
    @apply px-3.5 py-2;
    font-size: 12px;
    line-height: 15.08px;
  }
}
</style>