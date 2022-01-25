<script setup>
import { ref } from "vue";
import { CATEGORIES_URL } from "../api/index";
import { apiUserLogin } from "../api/users";
import router from "../router";
import { onMounted, reactive } from "vue";
import { currentUser } from "../api/users"
import { useStore } from "vuex";
import { TRIVIA_BASE_URL } from "../api/index";



const selectedNumOfQuest = ref("10")
const selectedDiff = ref("")
const selectedCat = ref("")
const selectedType = ref("")
const selectedCatId = ref("")


const selectedOptions = reactive([]);

const store = useStore()
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
  // let userChoices = store.getters.choices;
  console.log(selectedNumOfQuest.value, selectedDiff.value);
  console.log(store.getters.url);

  //console.log(selectedOptions)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <fieldset class="mb-3 border-2 border-solid border-slate-500">
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
        <input v-model.number="selectedNumOfQuest" type="number" placeholder="10" />
      </div>
      <div>
        <label for="selectDiff" style="text-align: left;">Difficulty</label>
        <select v-model="selectedDiff" id="selectDifficulty">
          <option value>Any Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div>
        <label>Category</label>
        <select v-model="selectedCat" id="selectCat">
          <option value>Any Categories</option>
          <option
            v-for="category in categories"
            :value="category.id"
          >{{ category.name }} {{ category.id }}</option>
        </select>
      </div>
      <div>
        <label>Type</label>
        <select v-model="selectedType" id="selectType">
          <option value>Any Type</option>
          <option>Multiple Choice</option>
          <option>True / False</option>
        </select>
      </div>
    </fieldset>

    <div>
      <button type="submit" class="bg-yellow-500 text-white p-3 rounded">Start Trivia Game</button>
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
