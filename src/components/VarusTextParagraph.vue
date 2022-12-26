<script setup>
import { IonItem, IonList, IonAccordionGroup, IonAccordion } from "@ionic/vue";
import VarusParagraphList from "./VarusParagraphList.vue";
import VarusTextParagraphTitle from "./VarusTextParagraphTitle.vue";
const props = defineProps({ textparagraph: Object });
</script>

<template>
  <ion-accordion-group expand="compact" :value="textparagraph.key + 'accordion'">
    <ion-accordion
      :id="textparagraph.key + 'accordion'"
      toggleIconSlot="start"
      :value="textparagraph.collapsed ? 'dummy' : textparagraph.key + 'accordion'"
    >
      <ion-item slot="header" style="margin-top: 20px" v-if="textparagraph.titleDisplay">
        <VarusTextParagraphTitle :textparagraph="textparagraph" />
      </ion-item>

      <ion-list slot="content">
        <VarusParagraphList :textparagraph="textparagraph" />
      </ion-list>
    </ion-accordion>
  </ion-accordion-group>
</template>

<style scoped>
ion-img {
  object-fit: cover;
  width: 50%;
  text-align: center;
  margin: auto;
}
</style>
