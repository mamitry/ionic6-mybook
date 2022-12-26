<script>
export default {
  name: "VarusChapterMenuList",
};
</script>
<script setup>
import { IonGrid, IonRow, IonCol, IonImg, IonItem, IonText } from "@ionic/vue";
import VarusText from "./VarusText.vue";
const props = defineProps({ chapters: Object, content: Object });
</script>

<template>
  <ion-grid>
    <ion-row class="ion-align-items-center">
      <ion-col>
        <ion-text color="primary">
          <h1>{{ content.name }}</h1>
        </ion-text>
      </ion-col>
    </ion-row>
    <ion-row class="ion-align-items-center">
      <ion-col size="4">
        <ion-img class="image" :src="`assets/images/books/${content.key}_menu.png`" :alt="content.key"></ion-img>
      </ion-col>
      <ion-col>
        <!-- Chapters START -->
        <template v-for="chapter in chapters" :key="chapter.key">
          <ion-item :router-link="`/chapters/${chapter.key}`" lines="none">
            <ion-text color="secondary">
              <h2>
                <varus-text v-if="chapter.titleDisplay" :texttodisplay="chapter.titleDisplay['deu']" />
              </h2>
            </ion-text>
          </ion-item>
        </template>
        <!-- Chapters END -->
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<style>
exit .image {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
ion-text {
  text-align: center;
}
</style>
