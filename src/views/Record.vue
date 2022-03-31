<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';

const router = useRouter()

const store = useStore()

const currentScore = computed(() => store.getters.getScore);
const highestScore = computed(() => store.getters.getHighestScore);
const questionObjectArray = computed(() => store.getters.getQuestionsObjects)
let questionArray = computed(() => store.getters.getQuestionArray);
let answerArray = computed(() => store.getters.getAnswerArray);

const btnReplay = () => {
    store.commit('setScore', 0);
    store.commit('setIndex', 0);
    store.commit('setQuestionArray', []);
    store.commit('setAnswerArray', []);
    router.push('/trivia');
};

const btnBack = () => {
    store.commit('setUser', null);
    store.commit('setNumOfQuestion', 0);
    store.commit('setQuestionObjects', []);
    store.commit('setScore', 0);
    store.commit('setHighestScore', 0);
    store.commit('setIndex', 0);
    store.commit('setQuestionArray', []);
    store.commit('setAnswerArray', []);
    router.push('/');
};


</script>


<template>
    <div class="container">
        <h1 h1 class>Record</h1>
        <h4>You scored: {{ currentScore }}</h4>
        <h4>Your highest score: {{ highestScore }}</h4>
        <div class="answerDiv">
            <div v-for="question in questionObjectArray" :key="question">
                <div class="questionDiv">
                    <p>{{ question.question }}</p>
                    <p>Correct answer: {{ question.correct_answer }}</p>
                    <p>All answers:{{ question.incorrect_answers }} {{ question.correct_answer }}"</p>
                </div>
            </div>
        </div>

        <button class="btn" type="button" @click="btnBack">Go to start screen</button>
        <button class="btn" type="button" @click="btnReplay">Replay</button>
    </div>
</template>



<style scoped>
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
    margin-top: 10px;
    border-color: black;
    border-style: solid;
    border-width: 2px;
    width: 700px;
    display: inline-block;
    text-align: center;
}
</style>