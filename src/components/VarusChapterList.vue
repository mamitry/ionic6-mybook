<script setup>
import VarusChapter from "./VarusChapter.vue";
import { hooks } from "../functions/Hooks";
// Props
const props = defineProps({
  chapters: {
    type: Object,
    default() {
      return {};
    },
  },
});
hooks("[VarusChapterList");
</script>

<template>
  <!-- Chapters START -->
  <div v-for="chapter in chapters" :key="chapter.key">
    <VarusChapter :texts="chapter.textparagraphs" />
  </div>
  <!-- Chapters END -->
</template>

<style scoped>
.textparagraph {
  border: 0px solid #e70000;
  background-color: beige;
  letter-spacing: -0.5px;
  text-align: center;
  padding: 0px;
}

.chapters {
  text-align: center;
  padding: 0px;
}
</style>
