export default {
  state: {},
  getters: {},
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
  },
  actions: {
    LOGIN: ({ commit }, payload) => {
      console.log(payload);
      const { username, password } = payload;
      commit("loginRequest", { username });
      return new Promise((resolve, reject) => {
        if (username === "admin" && password === "admin") {
          commit("loginSuccess", username);
          resolve(true);
        } else {
          const error = "Username or password invalid";
          reject(error);
        }
      });
    },
  },
};
