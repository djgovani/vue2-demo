import Vue from "vue";
import Vuex from "vuex";
import animalDetailsModule from "./animal-details.module";
import loginModule from "./login.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login: loginModule,
    addAnimalDetails: animalDetailsModule,
  },
});
