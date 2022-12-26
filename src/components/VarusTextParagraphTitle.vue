<script setup>
import { Waypoint } from "vue-waypoint";
import { storeToRefs } from "pinia";
import { useScrollStore } from "../store/scrollStore";
const props = defineProps({
  textparagraph: {
    type: Object,
    default() {
      return {};
    },
  },
});

// Pinia - scroll Store
const scrollStore = useScrollStore();
const { scrollElementMain } = storeToRefs(scrollStore);

const onChange = (waypointState) => {
  if (waypointState.going == "IN") {
    scrollElementMain.value = waypointState.el.firstElementChild.id;
  }
};
</script>

<template>
  <Waypoint :active="true" @change="onChange">
    <!-- id-required for router -->
    <div :id="textparagraph.key">
      <div>
        <span v-html="textparagraph.titleDisplay['deu']"></span>
      </div>
    </div>
  </Waypoint>
</template>
