<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "App.vue",
};
</script>
<script setup>
import { IonApp, IonContent, IonMenu, IonRouterOutlet, IonSplitPane, IonMenuToggle } from "@ionic/vue";
import { ref, onBeforeMount, getCurrentInstance } from "vue";
import { DebugLevel, appLog } from "./functions/Logging";
import { hooks } from "./functions/Hooks";

// Varus Components
import VarusMenuRelatedLinks from "./components/VarusMenuRelatedLinks.vue";
import VarusParents from "./components/VarusParents.vue";
import VarusChildrenMenu from "./components/VarusChildrenMenu.vue";

// Pinia Stores
import { storeToRefs } from "pinia";
import { useScrollStore } from "./store/scrollStore";
import { useBookStore } from "@/store/bookStore";
const scrollStore = useScrollStore();
const bookStore = useBookStore();
const { bookHasChildren } = storeToRefs(bookStore);

// i18n
import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });

// Logging
const compName = "[" + getCurrentInstance().type.name + "]";

// ionRouter
const ionRouter = ref(null);

// Hooks
hooks(compName);

/**
 * called, when the component has finished setting up its reactive state,
 * but no DOM nodes have been created yet.
 * It is about to execute its DOM render effect for the first time.
 */
onBeforeMount(() => {
  appLog(DebugLevel.HOOKS, compName, "Before Mount");

  // set locale
  locale.value = "deu";
  appLog(DebugLevel.INFO, compName, "Setting locale to: " + locale.value);

  //**
  scrollStore.$subscribe((mutation) => {
    if (mutation.events.key == "YposMenuMain") {
      appLog(DebugLevel.SCROLL, compName, "Scrolling to: " + scrollStore.YposMenuRight);
      // scrolling is here disabled and done by VarusChildrenMenu
      // ionContentScroll.value.$el.scrollToPoint(0, scrollStore.YposMenuRight);
    }
  });
});
</script>

<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
      <ion-menu menuId="left-menu" side="start" content-id="main-content" type="push">
        <ion-content>
          <ion-menu-toggle menu="right-menu" autoHide="false">
            <VarusMenuRelatedLinks />
            <VarusParents />
          </ion-menu-toggle>
        </ion-content>
      </ion-menu>
      <ion-menu menuId="right-menu" side="end" contentId="main-content" type="overlay" :disabled="!bookHasChildren">
        <ion-content>
          <!-- ion-menu-toggle open and closes the menu - alternative to @click="menuController.close("right-menu");"-->
          <ion-menu-toggle menu="right-menu" autoHide="false">
            <varus-children-menu />
          </ion-menu-toggle>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content" ref="ionRouter"></ion-router-outlet>
    </IonSplitPane>
  </IonApp>
</template>

<style scoped>
.chips {
  color: black;
}

ion-item {
  --min-height: 10px;
}

.menuTitle {
  --background: var(--ion-color-primary);
}

ion-list-header {
  font-weight: bold;
  min-height: 10px;
  padding-top: 28px;
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
