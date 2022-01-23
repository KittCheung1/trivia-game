<script setup>
import { currentUser } from "../api/users"
import { CATEGORIES_URL } from "../api/index"
import { onMounted, reactive } from "vue";

const categories = reactive([]);

async function loadQuizCategories() {
  const response = await fetch("https://opentdb.com/api_category.php");
  const data = await response.json();
  data.trivia_categories.forEach(category => {
    categories.push(category);
  });;
};

onMounted(() => {
  loadQuizCategories();
});





</script>

<template>
  <main class="container mx-auto px-4">
    <h1 class="mb-3 text-2xl">Trivia Game</h1>
    <h2>Display the questions</h2>
    <h1>{{ currentUser }}</h1>
    <form v-show="true">
     
     <button type="submit" class="bg-indigo-500 text-white p-3 rounded">Register</button>
      <button v-show="true">press me</button>-->
    </form>
  </main>
</template>




<style>
select {
  border-style: solid;
  border-color: black;
  border-width: 1px;
}
</style>