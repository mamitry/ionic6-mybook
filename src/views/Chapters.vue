<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Chapters",
};
</script>
<script setup>
import { IonImg } from "@ionic/vue";
import { useRoute } from "vue-router";
import VarusChapterList from "../components/VarusChapterList.vue";
import { useBookStore } from "./../store/bookStore";
import { onBeforeMount, onBeforeUpdate, onUpdated, getCurrentInstance } from "vue";
import { getBook } from "../functions/AppData";
import { DebugLevel, appLog } from "../functions/Logging";
import { hooks } from "../functions/Hooks";
import { storeToRefs } from "pinia";

const props = defineProps({ book: Object });

// Logging
const compName = "[" + getCurrentInstance().type.name + "]";

// Pinia - BookStore
const bookStore = useBookStore();
const { selectedType, selectedChapter, selectedChapterObj } = storeToRefs(bookStore);

// get selectedBook (from router) and assign to pinia
selectedType.value = useRoute().name;
selectedChapter.value = useRoute().params.key;
appLog(DebugLevel.INFO, compName, "Chapter-key (Router): " + selectedChapter.value.toString());
// read data from json-file
let data = getBook(selectedChapter.value.toString());
selectedChapterObj.value = data;
// get children/parents
if (typeof selectedChapterObj !== "undefined" && selectedChapterObj) {
  bookStore.currentChildren = getTextFromChapters(selectedChapterObj.value);
  bookStore.currentParents = getParents(selectedChapterObj.value);
}

// =================
// F U N C T I O N S
// =================
/**
 *
 */
function getTextFromChapters(chapters) {
  let texts;
  try {
    texts = chapters.children[0].textparagraphs;
  } catch (error) {
    appLog(DebugLevel.ERROR, compName, `Error reading texts Chapters ${chapters}: ` + error.message);
  }
  return texts;
}

/**
 *
 */
function getParents(chapters) {
  let parents = { parents: [], type: "" };
  try {
    let tempParent = getBook(chapters.parent);
    parents.parents = tempParent.children;
    parents.type = tempParent.type;
  } catch (error) {
    appLog(DebugLevel.ERROR, compName, "Error reading Parents from Chapters from following object: " + error.message);
    appLog(DebugLevel.ERROR, compName, chapters);
  }
  return parents;
}

function reloadChapters() {
  if (selectedChapterObj && useRoute().name == "chapters") {
    // reload chapters
    appLog(DebugLevel.DEBUG, compName, "(Re)Loading Chapters and set children to Pinia bookStore");
    appLog(DebugLevel.DEBUG, compName, selectedChapterObj.value);
    let childs = selectedChapterObj.value.children[0].textparagraphs;
    bookStore.currentChildren = childs;
  } else {
    bookStore.currentChildren = "";
    bookStore.currentParents = "";
  }
}

// =========
// H O O K S
// =========
hooks(compName);
onBeforeMount(() => {
  appLog(DebugLevel.HOOKS, compName, "Before Mount (native)");
  console.time("chapterLoad");
});
onBeforeUpdate(() => {
  appLog(DebugLevel.HOOKS, compName, "Before Update (native)");
  reloadChapters();
});
onUpdated(() => {
  appLog(DebugLevel.HOOKS, compName, "Updated (native)");
  try {
    console.timeEnd("chapterLoad");
  } catch (e) {
    appLog(DebugLevel.ERROR, compName, "Timer chapterLoad could not be measured");
  }
});
</script>

<template>
  <base-layout
    :page-title="selectedChapterObj ? selectedChapterObj.titleDisplay['deu'] : 'Loading ...'"
    display-back-link="true"
    :page-default-back-link="
      selectedChapterObj && selectedChapterObj.parent ? '/book/' + selectedChapterObj.parent : '/home/'
    "
    :useHistory="true"
  >
    <template v-if="selectedChapterObj !== undefined">
      <VarusChapterList :chapters="selectedChapterObj.children" />
    </template>

    <template v-else>
      <IonImg src="assets/images/severus404.png" />
    </template>
  </base-layout>
</template>
