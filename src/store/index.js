import { createStore } from "vuex";
import axios from "axios";
import errorHandler from "../utils/errorHandler";

const store = createStore({
  state() {
    return {
      events: [],
      searchTerm: "",
      searchKey: "title"
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
      const events =
        state.events.length &&
        state.events.filter((e) => e.venue.city.toLowerCase() !== "london");
      if (events.length) {
        return events.map((e, index) => {
          let amount = Math.floor(1000000 + Math.random() * 9000000)
          if (e.title.length) {
            return { ...e, title, location: e.venue.country.toLowerCase(), amount };
          } else {
            return {
              ...e,
              title: `event ${index + 1}`,
              location: e.venue.country.toLowerCase(),
              amount,
            };
          }
        });
      }
      return [];
    },

    eventsBySearchTerm(state, getters) {
      const searchTerm =
        state.searchTerm.charAt(0).toLowerCase() + state.searchTerm.slice(1);
        let searchCat = state.searchKey;
      if (getters.otherEvents.length && searchTerm.length) {
        return getters.otherEvents.filter((c) => c[searchCat].match(searchTerm));
      }
      return getters.otherEvents
    },
  },
});

export default store;
