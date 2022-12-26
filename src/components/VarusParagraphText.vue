<script setup>
import { IonCol, IonRow } from "@ionic/vue";
import VarusText from "./VarusText.vue";
const props = defineProps({ paragraph: Object, cssstyleclass: String, type: String });
</script>

<template>
  <div v-if="paragraph">
    <!-- Amount of columnts is taken from the german array in the JSON files -->
    <template v-for="(p, index) in paragraph.text['deu']" :key="index">
      <ion-row class="row" :style="type == 'refrain' ? 'text-align: center; color: red' : 'nothing'">
        <ion-col>
          <VarusText :texttodisplay="paragraph.text['deu'][index]" />
        </ion-col>
      </ion-row>
    </template>
  </div>
</template>

<style>
.paragraph {
  border: 0px solid red;
  /* border: 2px solid #1be700; */
  /* --ion-grid-column-padding	: 1px; */
}
.row {
  border: 0px solid rgb(0, 132, 255);
}
.col2 {
  border: 0px solid #00ffb3;
}
.col {
  border: 0px solid rgb(0, 0, 0);
}
</style>
