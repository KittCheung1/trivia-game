<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';

const router = useRouter()

const store = useStore()

const currentScore = computed(() => store.getters.getScore);
const highestScore = computed(() => store.getters.getHighestScore);

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
    <h1 h1 class="mb-3 text-2xl">Record</h1>
    <h4>You scored: {{currentScore}}</h4>
    <h4>Your highest score: {{highestScore}}</h4>

   <button class="btn" type="button" @click="btnBack">Go to start screen</button>
   <button class="btn" type="button" @click="btnReplay">Replay</button>
</template>



<style scoped>
.btn{
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