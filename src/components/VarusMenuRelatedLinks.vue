<script setup>
import { IonItem, IonLabel, IonIcon, IonList } from "@ionic/vue";
import { homeOutline } from "ionicons/icons";
import { hooks } from "../functions/Hooks";
hooks("[VarusMenuRelatedLinks]");
</script>

<template>
  <ion-list>
    <ion-item class="menuTitle">
      <ion-label>Related Links</ion-label>
    </ion-item>

    <ion-item button router-link="/home" class="linkEnabled">
      <ion-label>
        <h2>Home</h2>
      </ion-label>
      <ion-icon :icon="homeOutline" slot="start"></ion-icon>
    </ion-item>
  </ion-list>
</template>
