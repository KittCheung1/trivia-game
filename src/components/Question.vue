<script setup>
import { currentUser } from "../api/users";
import { CATEGORIES_URL } from "../api/index";
import { onMounted, reactive } from "vue";
import { computed } from "vue";
import { useStore } from 'vuex';
import QuestionDisplay from "./QuestionDisplay.vue";


const store = useStore()

const questionList = store.state.listOfQuestions
const questions = store.getters.questions;
const question = reactive(questionList[0])
let questionCounter = 0; 

onMounted(() => {
    store.dispatch("loadQuestions")
});

const incrementQuestionCounter=()=>{
    questionCounter++;
    question.value = questionList[questionCounter]

}


</script>

<template>
    <div>
        <p>{{ questions }}</p>
        <p>hejeje</p>
        <div>
            <div class="questionDiv">
                <ul>
                   <QuestionDisplay v-if="questionList.length!=0" :question="question.value" @answered="incrementQuestionCounter"/>
                </ul>
               
            </div>
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