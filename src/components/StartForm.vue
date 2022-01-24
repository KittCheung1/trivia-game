<script setup>
import { ref } from "vue";
import { CATEGORIES_URL } from "../api/index";
import { apiUserLogin, apiUserRegister } from "../api/users";
import router from "../router";
import { onMounted, reactive } from "vue";
import { currentUser } from "../api/users"
import { useStore } from "vuex";

const store = useStore()

const selectedOptions = ""

const emit = defineEmits(["onAuthSuccess"])
const onSuccess = currentUser => {
  store.commit("setUser", currentUser)
  emit("onAuthSuccess")
}

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

const onRegisterClick = async () => {
  const [error, user] = await apiUserRegister(username.value);
  if (error !== null) {
    displayError.value = error;
  } else console.log("You Passed!");
}

const onLoginClick = async () => {
  const loginSuccess = await apiUserLogin(username.value);
  if (loginSuccess) {
    console.log
    onSuccess(currentUser);
  } else { console.log("User does not exist!") }

}
</script>

<template>
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
        <label>Number of Questions:</label>
        <input type="number" placeholder="10"/>
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
      <button @click ="onRegisterClick" type="submit" class="bg-indigo-500 text-white p-3 rounded">Register</button>
      <button
        @click="onLoginClick"
        type="button"
        class="bg-yellow-500 text-white p-3 rounded"
      >Start Trivia Game</button>
    </div>
  </form>
</template>

<style >
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
