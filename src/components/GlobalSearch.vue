<script>
import _ from "lodash";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      search: "",
    };
  },

  created() {
    this.debounceWait = _.debounce(this.delayedSearch, 1000);
  },

  methods: {
    ...mapMutations(['setStates']),

    delayedSearch() {
      this.setStates({
        'searchTerm': this.search
      })
    },

    searchData() {
      this.debounceWait();
    },
  },
};
</script>

<template>
  <div>
    <div class="relative rounded-md shadow-sm">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
        aria-hidden="true"
      >
        <svg
          class="mr-3 h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input
        v-model.trim="search"
        @update:model-value="searchData"
        type="text"
        name="search"
        id="search"
        class="block w-full h-full py-3 rounded-lg border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Search"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>