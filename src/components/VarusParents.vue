<script>
export default {
  name: "VarusParents",
};
</script>
<script setup>
import { IonList } from "@ionic/vue";
import { storeToRefs } from "pinia";
import { useBookStore } from "../store/bookStore";
import { ref } from "vue";
import VarusSideMenuLink from "./VarusSideMenuLink.vue";
import { hooks } from "../functions/Hooks";
import { DebugLevel, appLog } from "../functions/Logging";

const { currentParents } = storeToRefs(useBookStore());
const divs = ref([]);

hooks("[VarusParents]");

function clickParentLink() {
  appLog(DebugLevel.DEBUG, "[VarusParents]", "clickParentLink");
}
</script>

<template>
  <template v-for="(parent, index) in currentParents.parents" :key="parent.key">
    <ion-list>
      <router-link
        :to="`/${parent.contentType}/${parent.key}`"
        :class="parent.disabled ? 'linkDisabled' : 'linkEnabled'"
        replace
        @click="clickParentLink"
      >
        <component
          :is="parent.key"
          :ref="
            (el) => {
              divs[index] = el;
            }
          "
        >
          <VarusSideMenuLink :element="parent" sideMenuPosition="left" />
        </component>
      </router-link>
    </ion-list>
  </template>
</template>

<style scoped>
ion-list {
  padding-top: 0px;
  padding-bottom: 1px;
}
</style>
