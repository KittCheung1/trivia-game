<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';

const router = useRouter()

const store = useStore()

const currentScore = computed(() => store.getters.getScore);
const highestScore = computed(() => store.getters.getHighestScore);
const questionObjectArray = computed(() => store.getters.getQuestionsObjects)


const btnReplay = () => {
    store.commit('setScore', 0);
    store.commit('setIndex', 0);
    store.commit('clearQuestionArray', []);
    store.commit('setQuestionArray', []);
    store.commit('setQuestionObjects', []);
    store.commit('setAnswerArray', []);
    router.push('/trivia');
};

const btnBack = () => {
    store.commit('setUser', null);
    store.commit('setNumOfQuestion', 0);
    store.commit('setQuestionObjects', []);
    store.commit('setScore', 0);
    store.commit('setIndex', 0);
    store.commit('setQuestionArray', []);
    store.commit('setAnswerArray', []);
    router.push('/');
};

const fixQuestions = (input) => {
   input = input.replace(/&#039;/g, "'");
   input = input.replace(/&quot;/g, ' " ');
   input = input.replace(/&and;/g, ' & ');
   input = input.replace(/&amp;/g, ' & ');
   input = input.replace(/&shy;/g, '   ');
   input = input.replace(/&Aring;/g, ' å ');
   input = input.replace(/&ldquo;/g, ' " ');
   input = input.replace(/&rdquo;/g, ' " ');
   input = input.replace(/&hellip;/g, '. ');
   return input;
};

</script>


<template>
    <div class="container">
        <h1 class="Record">Record</h1>
        <h4>You scored: {{ currentScore }}</h4>
        <h4>Your highest score: {{ highestScore }}</h4>
        <div class="answerDiv">
            <div v-for="(question, index) in questionObjectArray" :key="question">
                <div class="questionDiv">
                    <p>{{ fixQuestions(question.question )}}</p>
                    <p class="title">Correct answer:</p>
                    <p>{{ fixQuestions(question.correct_answer )}}</p>
                    <p class="title">Incorrect answers:</p>
                    <p class="wrongAnswers" v-for="q in question.incorrect_answers">{{ fixQuestions(q )}}</p>
                    <br/>
                    <p class="title">Your answer :</p>
                    <p>{{ fixQuestions(store.getters.getAnswerArray[index] )}}</p>
                </div>
            </div>
        </div>

        <button class="btn" type="button" @click="btnBack">Go to start screen</button>
        <button class="btn" type="button" @click="btnReplay">Replay</button>
    </div>
</template>



<style scoped>
.Record {
    font-size: 30px;
    font-weight: bold;
}
.title {
    font-weight: bold;
    margin-top: 10px;
}
.wrongAnswers{
    display: inline-flex;
    padding-left: 15px;
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
.container {
    display: block;
}

.questionDiv {
    background-color: rgb(90, 195, 199);
    margin-top: 10px;
    border-color: black;
    border-style: solid;
    border-width: 2px;
    width: 700px;
    display: inline-block;
    text-align: center;
    padding: 10px;
}
</style>