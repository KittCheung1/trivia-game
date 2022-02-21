<script setup>
import { currentUser } from "../api/users";
import { CATEGORIES_URL } from "../api/index";
import { onMounted, reactive } from "vue";
import { computed } from "vue";
import { useStore } from 'vuex';
import QuestionDisplay from "./QuestionDisplay.vue";
import {ref} from "@vue/reactivity";


const store = useStore()

const questionObjects= store.state.questionObjects
// const questions = store.getters.questions;
const question = reactive([questionObjects][0])
let questionCounter = 0; 
let isLoaded = ref(false);

console.log(question)

onMounted(() => {
    store.dispatch("loadQuestions")
    isLoaded.value= true;
});

const incrementQuestionCounter=()=>{
    questionCounter++;
    question.value = questionObjects[questionCounter]

}


</script>

<template>
    <div v-if="isLoaded">
        <p>{{ questionObjects[0].question }}</p>
        <p>{{ questionObjects[0].correct_answer }}</p>
        <p>hejeje</p>
        <div>
            <div class="questionDiv">
                <ul>
                   <QuestionDisplay v-if="questionObjects.length!=0" :question="question.value" @answered="incrementQuestionCounter"/>
                </ul>
               
            </div>
        </div>
    </div>
    <div v-else>
LOADING
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