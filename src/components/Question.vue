<script setup>
import { onMounted, reactive } from "vue";
import { computed } from "vue";
import { useStore } from 'vuex';
import { ref } from "@vue/reactivity";
import router from "../router";


const store = useStore()
let clickedAnswerArray = []
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
    store.commit('setIndex', 0);
    store.commit('setScore', 0);
    store.commit('setHighestScore', 0);
    router.push("/");
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

const checkScore = () => {
   if (score >= highestScore) {
       store.commit('setHighestScore', score);
   }
}

</script>

<template>
    <div class="mainContainer">
        <h1 class="mb-3 text-2xl">Trivia Game</h1>
        <div v-if="isLoaded">
            <div >
                <div class="questionDiv">
                    <p class="questionDisplay">{{ questionObjects[questionIndex].question }}</p>
                    <div class="btnDiv">
                        <button v-bind:key="ans"
                            type="button"
                            class="btn"
                            v-for="ans in createAnswerArray(questionObjects[questionIndex].incorrect_answers, questionObjects[questionIndex].correct_answer)"
                            @click="pickedAnswers(ans)"
                        >{{ ans }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>LOADING</div>
        <button class="exitBtn" @click="exitGameBtn">Exit Game</button>
    </div>
</template>

<style scoped>
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