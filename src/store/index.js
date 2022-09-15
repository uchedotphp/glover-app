import { createStore } from "vuex";
import axios from "axios";
import errorHandler from "../utils/errorHandler";

const store = createStore({
  state() {
    return {
      events: [],
      searchTerm: "",
    };
  },

  mutations: {
    setStates(state, data) {
      Object.keys(data).map((key) => {
        state[key] = data[key];
      });
    },
  },

  actions: {
    async getEvents({ commit }) {
      try {
        const { data } = await axios.get(
          "https://rest.bandsintown.com/artists/john%20legend/events?app_id=0ab49580-c84f-44d4-875f-d83760ea2cfe"
        );

        commit("setStates", {
          events: data,
        });
      } catch (error) {
        errorHandler(error);
      }
    },
  },

  getters: {
    availableArtists(state) {
      if (state.events.length) {
        return state.events.filter(
          (e) => e.artist && Object.values(e.artist).length
        );
      }
      return [];
    },

    otherEvents(state) {
      return (
        (state.events.length &&
          state.events.filter((e) => e.venue.city.toLowerCase() !== "london")) ||
        []
      );
    },

    eventsBySearchTerm(state, getters) {
        if (getters.otherEvents.length) {
          const searchTerm =
            state.searchTerm.charAt(0).toUpperCase() +
            state.searchTerm.slice(1);
          return state.events.filter((c) => c.name.match(searchTerm));
        }
    }
  },
});

export default store;
