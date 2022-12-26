<script>
export default {
  name: "BookDetails",
};
</script>
<script setup>
import { IonImg, IonLoading } from "@ionic/vue";
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";
import VarusBooksList from "../components/VarusBooksList.vue";
import VarusChapterList from "../components/VarusChapterList.vue";
import VarusChapterMenuList from "../components/VarusChapterMenuList.vue";
import { getBook } from "../functions/AppData";
import { storeToRefs } from "pinia";
import { useBookStore } from "./../store/bookStore";
import { ref, onBeforeUpdate, onUpdated, getCurrentInstance } from "vue";
import { DebugLevel, appLog } from "../functions/Logging";
import { hooks } from "../functions/Hooks";
const props = defineProps({ book: Object, timeout: { type: Number, default: 5000 } });

// Pinia - BookStore
const bookStore = useBookStore();
const { selectedType, selectedBook, selectedBookObj } = storeToRefs(bookStore);

// Logging
const compName = "[" + getCurrentInstance().type.name + "]";

// get selectedBook (from router) and assign to pinia
selectedType.value = useRoute().name;
selectedBook.value = useRoute().params.key;
appLog(DebugLevel.DEBUG, compName, "Book-key (Router): " + selectedBook.value.toString());
loadBook();

// myLoader
const myLoader = ref();
const isOpenRef = ref(false);
const showSpinner = (state) => (isOpenRef.value = state);

// =================
// F U N C T I O N S
// =================

function loadBook() {
  console.time("bookLoad");
  appLog(DebugLevel.DEBUG, compName, "[BookDetails] loading Book " + selectedBook.value.toString() + " from memory");
  selectedBookObj.value = getBook(selectedBook.value.toString());
  if (selectedBookObj.value === undefined) {
    // TODO need to find another solution for this
    selectedBookObj.value = { type: "nothing", titleDisplay: { deu: "NOTHING" } };
  }
  console.timeEnd("bookLoad");
}

// =========
// H O O K S
// =========
hooks(compName);
onBeforeRouteLeave(() => {
  appLog(DebugLevel.HOOKS, compName, "onBeforeRouteLeave");
  appLog(DebugLevel.DEBUG, compName, "LOADER Show ****");
  showSpinner(true);
});
onBeforeUpdate(() => {
  appLog(DebugLevel.HOOKS, compName, "Before Update");
  // same as beforeRouteUpdate option with no access to `this`
  onBeforeRouteUpdate(async (to, from) => {
    appLog(DebugLevel.DEBUG, compName, "Route to ", to.params.key);
    if (to.params.key != from.params.key && selectedBook.value.toString() != to.params.key) {
      selectedBook.value = to.params.key;
      loadBook();
    }
  });
});
onUpdated(() => {
  appLog(DebugLevel.HOOKS, compName, "Updated");
  appLog(DebugLevel.DEBUG, compName, "LOADER Hide ****");
  showSpinner(false);
});
</script>

<template>
  <base-layout
    :page-title="selectedBookObj && selectedBookObj.titleDisplay ? selectedBookObj.titleDisplay['deu'] : 'Loading ...'"
    display-back-link="true"
    :useHistory="true"
  >
    <ion-loading
      :is-open="isOpenRef"
      :duration="timeout"
      message="L O A D I N G ..."
      @didDismiss="showSpinner(false)"
      :ref="myLoader"
      backdropDismiss="true"
      spinner="lines"
    >
    </ion-loading>
    <template v-if="selectedBookObj.type === 'book'">
      <VarusBooksList :books="selectedBookObj.children"></VarusBooksList>
    </template>

    <template v-else-if="selectedBookObj.type === 'chapters'">
      <VarusChapterList :chapters="selectedBookObj.children"></VarusChapterList>
    </template>

    <template v-else-if="selectedBookObj.type === 'menu'">
      <VarusChapterMenuList :chapters="selectedBookObj.children" :content="selectedBookObj"></VarusChapterMenuList>
    </template>

    <template v-else>
      <IonImg src="assets/images/severus404.png" />
    </template>
  </base-layout>
</template>
