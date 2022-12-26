// Import Basics
import { createApp } from "vue";
import { IonicVue } from "@ionic/vue";

// Import Components
import App from "./App.vue";
import BaseLayout from "./components/base/BaseLayout.vue";

// Import Plugins & Tools
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

// ** CSS **
/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/core.css";
// i18n
const messages = {
  deu: JSON.parse(JSON.stringify(require(`./locales/deu.json`))),
};
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "deu",
  messages,
});
const app = createApp(App).use(i18n).use(IonicVue).use(router).use(createPinia());

app.component("base-layout", BaseLayout);
app.provide(/* key */ "message", /* value */ "Message provided by main.js and injected here");

router.isReady().then(() => {
  app.mount("#app");
});
