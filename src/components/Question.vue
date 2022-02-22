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

</script>

<template>
    <div v-if="isLoaded">
        <!-- <p>{{ questionObjects[questionIndex].question }}</p>
        <p>{{ questionObjects[questionIndex].correct_answer }}</p> -->
        <p>hejeje</p>
        <div>
            <div class="questionDiv">
                <ul>
                    <p>{{ questionObjects[questionIndex].question }}</p>
                    <p>{{ questionObjects[questionIndex].correct_answer }}</p>
                    <p>{{ questionObjects[questionIndex].incorrect_answer }}</p>
                    <button type="button" class="btn" @click="onClick">Click Me</button>
                    <!-- <QuestionDisplay v-if="questionObjects.length!=0" :question="question.value" @answered="incrementQuestionCounter"/> -->
                </ul>
            </div>
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