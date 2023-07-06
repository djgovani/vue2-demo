import "bootstrap/dist/css/bootstrap.min.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App.vue";
import "./assets/css/style.css";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(VueGoogleMaps, {
  load: {
    key: "",
    libraries: "places",
  },

  installComponents: true,
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
