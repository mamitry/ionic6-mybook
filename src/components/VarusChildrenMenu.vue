<script>
export default {
  name: "VarusChildrenMenu",
};
</script>
<script setup>
import { IonList } from "@ionic/vue";
import { storeToRefs } from "pinia";
import { useBookStore } from "../store/bookStore";
import { useScrollStore } from "../store/scrollStore.js";
import { ref, onBeforeMount, onBeforeUpdate, getCurrentInstance } from "vue";
import VarusSideMenuLink from "./VarusSideMenuLink.vue";
import { DebugLevel, appLog } from "../functions/Logging";
import { hooks } from "../functions/Hooks";

// get the stores
const scrollStore = useScrollStore();
const { selectedChapter, currentChildren } = storeToRefs(useBookStore());
const divs = ref([]);

function scrollTo() {
  try {
    let target = scrollStore.scrollElementMain;
    const elementToScrollTo = divs.value.find((element) => element.localName == target);
    if (elementToScrollTo != undefined && elementToScrollTo != elementToScrollTo.offsetTop) {
      scrollStore.YposMenuRight = elementToScrollTo.offsetTop;
      // need to check which works on  mobile browsers:
      // elementToScrollTo.getBoundingClientRect().top
      // elementToScrollTo.scrollTop
      // elementToScrollTo.offsetTop
      // elementToScrollTo.pageYOffset
      // scrolling:
      elementToScrollTo.scrollIntoView({ behavior: "smooth" });
    }
  } catch (e) {
    // scrolling error - can usually be ignored :-)
    appLog(DebugLevel.ERROR, compName, "Scroll Error: " + e);
  }
}

// Highlight active menu item
// https://github.com/vuejs/vue-router/issues/2040
//
// window.location.href                   = http://localhost:8100/chapters/agpeya1#psalm15
// window.location.origin                 = http://localhost:8100
// window.location.pathname (route.path)  = chapters/agpeya1
// window.location.hash                   = #psalm15
// window.location.hostname               = localhost
// window.location.protocol               = http:

// =========
// H O O K S
// =========
const compName = "[" + getCurrentInstance().type.name + "]";
hooks(compName);

onBeforeUpdate(() => {
  appLog(DebugLevel.HOOKS, compName, "Before Update");
  // we need to make sure to reset the refs before each update
  // divs.value = []
});

onBeforeMount(() => {
  appLog(DebugLevel.HOOKS, compName, "Before Mount");
  scrollStore.$subscribe(() => {
    scrollTo();
  });
});
</script>

<template>
  <ion-list lines="full">
    <template v-for="(child, index) in currentChildren" :key="child.key">
      <router-link
        :to="'/chapters/' + selectedChapter + '#' + child.key"
        :class="child.disabled ? 'linkDisabled' : 'linkEnabled'"
        replace
      >
        <component
          :is="child.key"
          :ref="
            (el) => {
              divs[index] = el;
            }
          "
        >
          <VarusSideMenuLink :element="child" sideMenuPosition="right" />
        </component>
      </router-link>
    </template>
  </ion-list>
</template>
