<script>
export default {
  name: "VarusSideMenuLink",
};
</script>
<script setup>
import { IonItem, IonLabel, IonIcon } from "@ionic/vue";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
const props = defineProps({ element: Object, sideMenuPosition: String });
</script>

<template>
  <ion-item :disabled="props.element.disabled">
    <ion-label v-if="props.element.titleDisplay">
      {{ props.element.titleDisplay["deu"] }}
    </ion-label>
    <ion-icon
      :slot="sideMenuPosition == 'left' ? 'end' : 'start'"
      :icon="sideMenuPosition == 'left' ? chevronForwardOutline : chevronBackOutline"
      class="component-icon component-icon-primary"
    ></ion-icon>
  </ion-item>
</template>
