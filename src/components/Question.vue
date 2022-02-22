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
    let answerArray = correct.concat(incorrect);
    return answerArray;
}


</script>

<template>
    <div v-if="isLoaded">
        <!-- <p>{{ questionObjects[questionIndex].question }}</p>
        <p>{{ questionObjects[questionIndex].correct_answer }}</p>-->
        <p>hejeje</p>
        <div>
            <div class="questionDiv">
                <p>{{ questionObjects[questionIndex].question }}</p>
                <div>
                    <button
                        type="button"
                        class="btn"
                        v-for="ans in createAnswerArray(questionObjects[0].correct_answer, questionObjects[0].incorrect_answers)"
                        @click="onClick"
                    >Click Me</button>
                    <!-- <QuestionDisplay v-if="questionObjects.length!=0" :question="question.value" @answered="incrementQuestionCounter"/> -->
                </div>
            </div>
            <button type="button" class="exitBtn" @click="exitBtn">Exit Game</button>
        </div>
    </div>
    <div v-else>LOADING</div>
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