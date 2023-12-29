import "@mdi/font/css/materialdesignicons.css";
import "./assets/main.css";

import { Amplify } from "aws-amplify";
import { createApp } from "vue";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import App from "./App.vue";
import configuration from "./amplifyconfiguration.json";
import router from "./router";

// Vuetify
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

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

Amplify.configure(configuration);

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount("#app");
