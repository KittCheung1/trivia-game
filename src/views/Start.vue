<script setup>
import { ref } from "vue";
import { CATEGORIES_URL } from "../api/index";
import { apiUserLogin } from "../api/users";
import router from "../router";
import { onMounted, reactive } from "vue";
import { currentUser } from "../api/users"



const username = ref("");


const categories = reactive([]);

async function loadQuizCategories() {
  const response = await fetch(CATEGORIES_URL);
  const data = await response.json();
  data.trivia_categories.forEach(category => {
    categories.push(category);
  });;
};

onMounted(() => {
  loadQuizCategories();
});

const onLoginClick = async () => {
  const loginSuccess = await apiUserLogin(username.value);
  if (loginSuccess) {
    router.push("trivia");
  } else { console.log("User does not exist!") }

}
</script>


<template>
  <main class="container mx-auto px-4">
    <h1 class="mb-3 text-2xl">Login to get started</h1>

    <form>
      <fieldset class="mb-3">
        <legend>Game Settings</legend>
        <div>
          <label for="username" aria-label="Username" class="block">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            class="border border-slate-800"
            v-model="username"
          />
        </div>
        <div>
          <label for="selectDiff" style="text-align: left;">Difficulty</label>
          <select id="select">
            <option selected>Any Difficulty></option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div>
          <label>Number of Questions:</label>
          <input type="number" placeholder="10" />
        </div>
        <div>
          <label>Category</label>
          <select id="selectCat">
            <option selected>Any Categories</option>
            <option v-for="category in categories" :name="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div>
          <label>Type</label>
          <select id="selectType">
            <option selected>Any Type</option>
            <option>Multiple Choice</option>
            <option>True / False</option>
          </select>
        </div>
      </fieldset>

      <div>
        <button type="submit" class="bg-indigo-500 text-white p-3 rounded">Register</button>
        <button
          @click="onLoginClick"
          type="button"
          class="bg-yellow-500 text-white p-3 rounded"
        >Start Trivia Game</button>
      </div>
    </form>
  </main>
</template>

<style>
select {
  margin-left: 20px;
  border-style: solid;
  border-color: black;
  border-width: 1px;
}
input {
  margin-left: 20px;
  border-style: solid;
  border-color: black;
  border-width: 1px;
}

fieldset {
  text-align: left;
}
</style>