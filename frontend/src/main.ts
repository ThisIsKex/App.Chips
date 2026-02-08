import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import axios from "axios";

import App from "./App.vue";
import router from "./router";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi"
  }
});

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");
