<script setup>
import { onMounted, reactive } from "vue";
import { computed } from "vue";
import { useStore } from 'vuex';
import { ref } from "@vue/reactivity";
import router from "../router";


const store = useStore()
const clickedAnswerArray = []
let playerScore = computed(() => store.getters.getScore)
let score = playerScore.value
let numOfQuest = store.state.numberOfQuestions
const questionObjects = computed(() => store.state.questionObjects)
let questionIndex = computed(() => store.getters.getIndex);
let isLoaded = ref(false);
let highestScore = store.getters.getHighestScore;

onMounted(() => {
    store.dispatch("loadQuestions").then(() => isLoaded.value = true)
});

const exitGameBtn = () => {
    store.commit('setUser', null);
    store.commit('setNumOfQuestion', 0);
    store.commit('setQuestionObjects', []);
    store.commit('setScore', 0);
    store.commit('setIndex', 0);
    store.commit('setQuestionArray', []);
    store.commit('setAnswerArray', []);
    router.push('/');
}

const createAnswerArray = (correct, incorrect) => {
    const answerArray = correct.concat(incorrect);
    return answerArray;
}
const pickedAnswers = (answer) => {

    if (answer === questionObjects.value[questionIndex.value].correct_answer) {

        score += 10;
        store.commit('setScore', score)
    }
    clickedAnswerArray.push(answer)
    store.commit('setAnswerArray', clickedAnswerArray)
    store.commit('setIndex', questionIndex.value + 1);
    if (questionIndex.value === (numOfQuest)) {

        checkScore()
        router.push("/record")
    }
}

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

const checkScore = () => {
    if (score >= highestScore) {
        store.commit('setHighestScore', score);
    }
}

</script>

<template>
    <div class="mainContainer">
        <h1 class="Trivia">Trivia Game</h1>
        <div v-if="isLoaded">
            <div>
                <div class="questionDiv">
                    <p class="questionDisplay">{{ fixQuestions(questionObjects[questionIndex].question )}}</p>
                    <div class="btnDiv">
                        <button
                            v-bind:key="ans"
                            type="button"
                            class="btn"
                            v-for="ans in createAnswerArray(questionObjects[questionIndex].incorrect_answers, questionObjects[questionIndex].correct_answer)"
                            @click="pickedAnswers(ans)"
                        >{{fixQuestions(ans) }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>LOADING</div>
        <div>
            <button class="exitBtn" @click="exitGameBtn">Exit Game</button>
        </div>
    </div>
</template>

<style scoped>
.Trivia {
    font-size: 30px;
    font-weight: bold;
}
.mainContainer {
    width: 100%;
    display: inline-block;
}
.questionDiv {
    margin-right: 50px;
    margin-left: 50px;
    border-width: 3px;
    border-style: solid;
    border-color: black;
    background-color: rgb(217, 177, 34);
}

.questionDisplay {
    padding: 2%;
    text-align: center;
}

.btnDiv {
    text-align: center;
    margin: 2%;
}

.exitBtn {
    width: 100px;
    height: 50px;
    border-style: solid;
    border-color: black;
    border-radius: 3px;
    border-width: 2px;
    background-color: rgb(0, 199, 27);
    margin-top: 10px;
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