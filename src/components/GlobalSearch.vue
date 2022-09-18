<script>
import _ from "lodash";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      search: "",
      searchKeyOptions: ["title", "location"],
    };
  },

  created() {
    this.debounceWait = _.debounce(this.delayedSearch, 1000);
  },

computed: {
    ...mapState(["searchKey"]),
    searchCatKey: {
      get() {
        return this.searchKey;
      },

      set(val) {
        this.setStates({
          searchKey: val,
        });
      },
    },
  },

  methods: {
    ...mapMutations(["setStates"]),

    delayedSearch() {
      this.setStates({
        searchTerm: this.search,
      });
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
        name="search"
        id="search"
        class="block w-full h-full py-3 rounded-lg border-gray-300 pl-10 pr-44 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Search"
      />

      <div class="absolute inset-y-2 right-0 flex items-center pr-2">
        <label for="search" class="pr-2 text-sm">Search by: </label>
        <select
          id="search"
          name="search"
          v-model="searchCatKey"
          class="h-full bg-green-200 rounded-md border-transparent bg-transparent py-0 text-gray-700 sm:text-sm focus:outline-none"
        >
          <option v-for="(n, index) in searchKeyOptions" :key="index">
            {{ n }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>