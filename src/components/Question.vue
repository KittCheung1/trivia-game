<script setup>
import { onMounted, reactive } from "vue";
import { computed } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from "@vue/reactivity";


const store = useStore()

const questionObjects = computed(() => store.state.questionObjects)
let questionIndex = computed(() => store.getters.getNextIndex);
let isLoaded = ref(false);

onMounted(() => {
    store.dispatch("loadQuestions").then(() => isLoaded.value = true)
});

const exitGameBtn = () => {
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

const pickedAnswers=()=>{
    
    store.commit('setIndex')
}


</script>

<template>
    <div class="mainContainer">
        <h1 class="mb-3 text-2xl">Trivia Game</h1>
        <div v-if="isLoaded">
            <div>
                <div class="questionDiv">
                    <p class="questionDisplay">{{ questionObjects[questionIndex].question }}</p>
                    <div class="btnDiv">
                        <button
                            type="button"
                            class="btn"
                            v-for="ans in createAnswerArray(questionObjects[questionIndex].incorrect_answers, questionObjects[questionIndex].correct_answer)"
                            @click="pickedAnswers"
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