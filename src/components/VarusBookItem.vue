<script setup>
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonCol } from "@ionic/vue";
const props = defineProps({ book: Object });
</script>

<template>
  <ion-col>
    <!-- Grid fuer das Icon - START -->
    <router-link :to="`/${props.book.contentType}/${props.book.key}`">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ book.titleDisplay["deu"] }}</ion-card-title>
          <ion-card-subtitle> {{ book.subTitle["deu"] }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content> {{ book.infoText["deu"] }}</ion-card-content>
      </ion-card>
    </router-link>
    <!-- Grid fuer das Icon - END -->
  </ion-col>
</template>

<style scoped>
ion-card,
ion-card-header,
ion-card-title {
  /**background-color: secondary;**/
  background-color: var(--ion-color-primary);
  color: black;
}
</style>
