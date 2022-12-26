<script setup>
const props = defineProps({
  texttodisplay: {
    type: String,
    required: true,
    default: "",
  },
});
</script>
<template>
  <div>
    <span v-html="texttodisplay" />
  </div>
</template>
