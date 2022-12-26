<script setup>
import { IonGrid, IonRow } from "@ionic/vue";
import VarusBookItem from "./VarusBookItem.vue";

const props = defineProps({ books: Object });
</script>

<template>
  <ion-grid>
    <ion-row>
      <varus-book-item v-for="book in books" :key="book.key" :book="book"></varus-book-item>
    </ion-row>
  </ion-grid>
</template>