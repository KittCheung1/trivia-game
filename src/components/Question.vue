<script setup>
import { currentUser } from "../api/users";
import { CATEGORIES_URL } from "../api/index";
import { onMounted, reactive } from "vue";
import { computed } from "vue";
import { useStore } from 'vuex';
import QuestionDisplay from "./QuestionDisplay.vue";
import { ref } from "@vue/reactivity";


const store = useStore()

const questionObjects = computed(() => store.state.questionObjects)
// const questions = store.getters.questions;
// const question = reactive(questionObjects.value)
let questionIndex = computed(() => store.getters.getNextIndex);
let isLoaded = ref(false);

console.log(questionObjects[questionIndex])

onMounted(() => {
    store.dispatch("loadQuestions").then(() => isLoaded.value = true)
});

// const incrementQuestionCounter=()=>{
//     questionCounter++;
//     question.value = questionObjects[questionCounter]

// }

const onClick = () => {
    store.commit('setIndex')
}

const exitBtn = () => {
    store.commit('setUser', null);
    store.commit('setIndex', 0);
    //    store.commit('setCurrentScore', 0);
    //    store.commit('setHighScore', 0);
    router.push('/');
}

const createAnswerArray = (correct, incorrect) => {
    const answerArray = correct.concat(incorrect);
    console.log(answerArray)
    return answerArray;
}


</script>

<template>
<div class="mainContainer">
    <h1 class="mb-3 text-2xl">Trivia Game</h1>
    <div v-if="isLoaded">
        <!-- <p>{{ questionObjects[questionIndex].question }}</p>
        <p>{{ questionObjects[questionIndex].correct_answer }}</p>-->
        <div>
            <div class="questionDiv">
                <p class="questionDisplay">{{ questionObjects[questionIndex].question }}</p>
                <div class="btnDiv">
                    <button
                        type="button"
                        class="btn"
                        v-for="ans in createAnswerArray(questionObjects[questionIndex].incorrect_answers, questionObjects[questionIndex].correct_answer)"
                        @click="onClick"
                    >{{ans}}</button>
                    <!-- <QuestionDisplay v-if="questionObjects.length!=0" :question="question.value" @answered="incrementQuestionCounter"/> -->
                </div>
            </div>
            <button type="button" class="exitBtn" @click="exitBtn">Exit Game</button>
        </div>
    </div>
    <div v-else>LOADING</div>
    </div>
</template>

<style scoped>

.mainContainer{
width:100%;
display: inline-block;
}
.questionDiv {
    margin-right: 50px;
    margin-left: 50px;
    border-width: 3px;
    border-style: solid;
    border-color: black;
}

.questionDisplay{
    padding: 2%;
    text-align: center;
}

.btnDiv{
    text-align: center;
    margin: 2%;
}

.exitBtn{
    width: 100px;
    height: 50px;
    border-style: solid;
    border-color: black;
    border-radius: 3px;
    border-width: 2px;
    background-color: rgb(0, 199, 27);
}

.btn {
    width: 170px;
    margin: 5px;
    padding: 10px;
    font-size: 15px;
    border-style: solid;
    border-color: black;
    border-radius: 3px;
    border-width: 2px;
    background-color: rgb(102, 102, 223);
}
</style>