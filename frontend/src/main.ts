import "@mdi/font/css/materialdesignicons.css";
import "./assets/main.css";

import { createApp } from "vue";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import App from "./App.vue";
import router from "./router";

// Vuetify
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import axios from "axios";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: "light"
  }
});

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount("#app");
