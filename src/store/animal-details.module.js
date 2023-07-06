import axios from "axios";
export default {
  state: {},
  getters: {},
  mutations: {
    animalDetailsRequest(state, details) {
      state.status = { added: true };
      state.details = details;
    },
    animalDetailsSuccess(state, details) {
      state.status = { added: true };
      state.details = details;
    },
  },
  actions: {
    ADD_ANIMAL_DETAILS: ({ commit }, payload) => {
      commit("animalDetailsRequest", { payload });
      return new Promise((resolve, reject) => {
        axios
          .post(`https://api.test.org/animal/saveData`, payload)
          .then(({ data, status }) => {
            console.log(data);
            if (data.response.error.error_code === 0) {
              commit("animalDetailsSuccess", payload);
              resolve(true);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
