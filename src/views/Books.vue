<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Book",
};
</script>
<script setup>
import { getBooks } from "../functions/AppData";
import VarusBooksList from "../components/VarusBooksList.vue";
import { hooks } from "../functions/Hooks";

const books = getBooks().children;

// =========
// H O O K S
// =========
hooks("[Books]");
</script>

<template>
  <base-layout page-title="Title" display-back-link="false" :useHistory="true">
    <varus-books-list :books="books"></varus-books-list>
  </base-layout>
</template>
