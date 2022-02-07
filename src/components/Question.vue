<script setup>
import { currentUser } from "../api/users";
import { CATEGORIES_URL } from "../api/index";
import { onMounted, reactive } from "vue";
import { computed } from "vue";
import { useStore } from 'vuex';


const store = useStore()

const questionList = store.state.listOfQuestions
const questions = store.getters.questions;

onMounted(() => {
    store.dispatch("loadQuestions")

});


</script>

<template>
    <div>
        <p>{{ questions }}</p>
        <p>hejeje</p>
        <div>
            <div class="questionDiv">
                <ul>
                    <li v-for="quest in questionList">{{ quest }}</li>
                </ul>
                <button type="button" class="btn" @click="">click me</button>
            </div>
            <p>{{ store.state.getQuestions }}help</p>
        </div>
    </div>
</template>

<style scoped>
.questionDiv {
    border-width: 3px;
    border-style: solid;
    border-color: black;
    text-align: left;
}

.btn {
    width: 100px;
    height: 80px;
    border-style: solid;
    border-color: black;
    border-radius: 3px;
    border-width: 2px;
    background-color: rgb(102, 102, 223);
}
</style>