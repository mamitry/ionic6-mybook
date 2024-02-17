<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home.vue",
};
</script>
<script setup>
import { getBooks } from "../functions/AppData";
import VarusBooksList from "../components/VarusBooksList.vue";
import { hooks } from "../functions/Hooks";

const books = getBooks().children;
hooks("[Home]");
</script>

<template>
  <base-layout page-title="Home" display-back-link="false">
    <varus-books-list :books="books"></varus-books-list>
  </base-layout>
</template>

<style scoped>
.title {
  font-weight: bold;
  font-size: 120%;
  padding-left: 15px;
}
</style>
