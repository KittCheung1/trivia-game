<script setup>
import { ref } from "vue";
import { CATEGORIES_URL } from "../api/index";
import { apiUserLogin } from "../api/users";
import { onMounted, reactive } from "vue";
import { currentUser } from "../api/users"
import { useStore } from "vuex";
import { TRIVIA_BASE_URL } from "../api/index";



const store = useStore()
const selectedNumOfQuest = ref("10")
const selectedDiff = ref("")
const selectedCat = ref("")
const username = ref("");
const categories = reactive([]);


const emit = defineEmits(["onAuthSuccess"])
const onSuccess = currentUser => {
  store.commit("setUser", currentUser)
  emit("onAuthSuccess")
}

async function loadQuizCategories() {
  const response = await fetch(CATEGORIES_URL);
  const data = await response.json();
  data.trivia_categories.forEach(category => {
    categories.push(category);
    return data;
  });;
};

onMounted(() => {
  loadQuizCategories();

});

const onLoginClick = async () => {
  const loginSuccess = await apiUserLogin(username.value);
  if (loginSuccess) {
    onSuccess(currentUser);
  } else { console.log("User does not exist!") }
}

const onSubmit = () => {
  onLoginClick()

  const settingsObj = {
    theUrl: TRIVIA_BASE_URL,
    number: selectedNumOfQuest.value,
    categoryId: selectedCat.value,
    difficulty: selectedDiff.value
  }
  store.commit("setUrl", settingsObj)
  store.commit("setNumOfQuestion", settingsObj)

}
</script>

<template>
  <div class="mainContainer">
    <h1 class="title">Login to get started</h1>
    <form class="formContainer" @submit.prevent="onSubmit">
      <fieldset class="fieldsetDiv">
        <legend class="legend">Game Settings</legend>
        <div class="rows">
          <label for="username" aria-label="Username">Username: </label>
          <input type="text" id="username" placeholder="Username" v-model="username" />
        </div>
        <div class="rows">
          <label>Number of Questions: </label>
          <input v-model.number="selectedNumOfQuest" type="number" placeholder="10" />
        </div>
        <div class="rows">
          <label for="selectDiff" style="text-align: left;">Difficulty: </label>
          <select v-model="selectedDiff" id="selectDifficulty">
            <option value>Any Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div class="rows">
          <label>Category: </label>
          <select v-model="selectedCat" id="selectCat">
            <option value>Any Categories</option>
            <option
              v-for="category in categories"
              :value="category.id"
            >{{ category.name }} {{ category.id }}</option>
          </select>
        </div>
      </fieldset>

      <div>
        <button type="submit" class="bg-yellow-500 text-black p-3 rounded">Start Trivia Game</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.title{
  font-size: 30px;
  font-weight: bold;
}
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
.legend{
  font-size: 25px;
}
.rows {
  padding-top: 2%;
}

.fieldsetDiv {
  padding: 5%;
  border-radius: 3px;
  border-color: black;
  border-style: solid;
  border-width: 3px;
  text-align: left;
  width: 500px;
  margin-bottom: 10px;
  background-color: aquamarine;
}
</style>
