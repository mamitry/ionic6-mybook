<script setup>
import { IonGrid } from "@ionic/vue";
import VarusParagraphText from "./VarusParagraphText.vue";
const props = defineProps({
  textparagraph: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<template>
  <!-- Paragraphs START -->
  <ion-grid class="paragraph">
    <template v-for="paragraph in textparagraph.paragraphs" :key="paragraph.key">
      <VarusParagraphText :paragraph="paragraph" :cssstyleclass="paragraph.type" :type="paragraph.type" />
    </template>
  </ion-grid>
  <!-- Paragraphs END -->
</template>
