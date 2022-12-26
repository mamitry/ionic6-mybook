<script>
export default {
  name: "BaseLayout",
};
</script>
<script setup>
import {
  IonMenuButton,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/vue";
import { DebugLevel, appLog } from "../../functions/Logging";
import { hooks } from "../../functions/Hooks";
import { chevronBackOutline } from "ionicons/icons";
import { onBeforeUnmount, onUnmounted, nextTick } from "vue";

// Pinia - ScrollStore
import { useScrollStore } from "@/store/scrollStore.js";
const scrollStore = useScrollStore();

// Logging
const compName = "[BaseLayout]";

// PROPS
const props = defineProps({
  pageTitle: String,
  displayBackLink: String,
  pageDefaultBackLink: String,
  useHistory: Boolean,
});

function logScrolling(event) {
  scrollStore.YposMenuMain = event.detail.currentY;
  appLog(DebugLevel.SCROLL, compName, "Scrolling to YposMenuMain: " + event.detail.currentY);
}

// =========
// H O O K S
// =========
hooks(compName);
onBeforeUnmount(() => {
  appLog(DebugLevel.HOOKS, compName, "Before Unmount 0 (native)");
  appLog(DebugLevel.DEBUG, compName, "####");
  nextTick(() => {
    appLog(DebugLevel.DEBUG, compName, "#### Before Unmount 1");
  });
  nextTick(() => {
    appLog(DebugLevel.DEBUG, compName, "#### Before Unmount 2");
  });
});
onUnmounted(() => {
  appLog(DebugLevel.HOOKS, compName, "Unmounted 0 (native)");
  appLog(DebugLevel.DEBUG, compName, "+++++");
  nextTick(() => {
    appLog(DebugLevel.DEBUG, compName, "++++ Unmounted 1");
  });
  nextTick(() => {
    appLog(DebugLevel.DEBUG, compName, "++++ Unmounted 2");
  });
  nextTick(() => {
    appLog(DebugLevel.DEBUG, compName, "++++ Unmounted 3");
  });
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button menu="left-menu"></ion-menu-button>
          <ion-back-button
            v-if="useHistory && displayBackLink === 'true'"
            :default-href="pageDefaultBackLink"
          ></ion-back-button>
          <ion-button v-if="!useHistory && displayBackLink === 'true'" :router-link="pageDefaultBackLink">
            <ion-icon slot="start" :icon="chevronBackOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button menu="right-menu"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll-events="true" @ionScroll="logScrolling($event)" ref="baseContent">
      <slot />
    </ion-content>
  </ion-page>
</template>
