<script setup>
import VarusTextParagraph from "./VarusTextParagraph.vue";
const props = defineProps({ texts: Object });
</script>

<template>
  <template v-for="text in texts" :key="text.key">
    <VarusTextParagraph :textparagraph="text" />
  </template>
</template>
